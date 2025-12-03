# Documentation des Tables de Base de Données

## Vue d'ensemble

Cette base de données PostgreSQL supporte le système complet du robot guide de musée, organisée en 5 phases progressives de MVP.

---

## PHASE 1: Fondations - Œuvres et Contenus

### Table: `artworks`

**Description**: Stocke toutes les œuvres d'art du musée avec leurs métadonnées et localisation.

#### Attributs principaux

| Champ         | Type            | Description                                            |
| ------------- | --------------- | ------------------------------------------------------ |
| `id`          | String (CUID)   | Identifiant unique de l'œuvre                          |
| `code`        | String (unique) | Code interne du musée pour l'œuvre (ex: "MON2024-001") |
| `title`       | String          | Titre de l'œuvre                                       |
| `artist`      | String?         | Nom de l'artiste (optionnel pour œuvres anonymes)      |
| `description` | Text?           | Description détaillée de l'œuvre                       |

#### Attributs de classification

| Champ        | Type    | Description        | Exemple                      |
| ------------ | ------- | ------------------ | ---------------------------- |
| `period`     | String? | Période historique | "Renaissance", "Art Moderne" |
| `style`      | String? | Style artistique   | "Impressionnisme", "Cubisme" |
| `collection` | String? | Type de collection | "Permanent", "Temporaire"    |

#### Attributs de localisation

| Champ         | Type    | Description                                          |
| ------------- | ------- | ---------------------------------------------------- |
| `positionX`   | Float?  | Coordonnée X sur la carte du musée (en mètres)       |
| `positionY`   | Float?  | Coordonnée Y sur la carte du musée (en mètres)       |
| `floor`       | Int     | Étage (0 = rez-de-chaussée, 1 = premier étage, etc.) |
| `room`        | String? | Nom ou numéro de la salle                            |
| `orientation` | Float?  | Orientation de l'œuvre en degrés (0-360°)            |

#### Attributs médias

| Champ      | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| `imageUrl` | String? | URL vers l'image haute résolution de l'œuvre |

#### Relations

- **1→N avec `NarrativeContent`** : Une œuvre peut avoir plusieurs contenus narratifs (versions courtes/longues, langues)
- **1→N avec `TrajectoryStep`** : Une œuvre peut faire partie de plusieurs trajets
- **1→N avec `FAQCache`** : Une œuvre peut avoir des FAQ cachées

#### Indexes

- `(positionX, positionY)` : Optimise les requêtes de recherche spatiale

**Cas d'usage** :

- Ajouter une nouvelle œuvre au catalogue du musée
- Rechercher des œuvres par artiste, période ou style
- Localiser une œuvre sur la carte
- Afficher les détails d'une œuvre sur l'interface admin ou l'écran du robot

---

### Table: `narrative_contents`

**Description**: Stocke les différentes versions des récits narratifs pour présenter une œuvre.

#### Attributs

| Champ         | Type          | Description                                                   |
| ------------- | ------------- | ------------------------------------------------------------- |
| `id`          | String (CUID) | Identifiant unique du contenu                                 |
| `artworkId`   | String (FK)   | Référence vers l'œuvre concernée                              |
| `version`     | String        | Type de présentation: "standard", "short", "detailed", "kids" |
| `language`    | String        | Code langue ISO ("fr", "en", etc.) - défaut: "fr"             |
| `textContent` | Text          | Texte complet de la présentation                              |
| `audioUrl`    | String?       | URL vers le fichier audio pré-généré (TTS)                    |
| `duration`    | Int?          | Durée en secondes de la présentation audio                    |

#### Relations

- **N→1 avec `Artwork`** : Lié à une œuvre spécifique
- **1→N avec `TrajectoryStep`** : Peut être utilisé dans plusieurs étapes de trajets

#### Indexes

- `(artworkId)` : Recherche rapide de tous les contenus d'une œuvre
- `(artworkId, language)` : Recherche par œuvre ET langue

**Cas d'usage** :

- Stocker différentes versions de présentation (courte pour visite rapide, détaillée pour experts, simplifiée pour enfants)
- Support multilingue (français Phase 1, autres langues futures)
- Pré-générer l'audio pour éviter latence TTS en temps réel

---

## PHASE 2: Trajets et Visites

### Table: `trajectories`

**Description**: Définit les parcours de visite guidée à travers le musée.

#### Attributs principaux

| Champ         | Type          | Description                                           |
| ------------- | ------------- | ----------------------------------------------------- |
| `id`          | String (CUID) | Identifiant unique du trajet                          |
| `name`        | String        | Nom du trajet (ex: "Chefs-d'œuvre de la Renaissance") |
| `description` | Text?         | Description détaillée du trajet                       |
| `theme`       | String?       | Thématique (ex: "Renaissance", "Art Moderne")         |

#### Configuration

| Champ               | Type   | Description                                     |
| ------------------- | ------ | ----------------------------------------------- |
| `estimatedDuration` | Int    | Durée estimée en minutes                        |
| `difficultyLevel`   | String | Niveau: "kids", "all", "expert" (défaut: "all") |
| `maxVisitors`       | Int    | Nombre maximum de visiteurs (défaut: 10)        |

#### État

| Champ       | Type    | Description                                         |
| ----------- | ------- | --------------------------------------------------- |
| `isActive`  | Boolean | Trajet disponible pour programmation (défaut: true) |
| `isDefault` | Boolean | Trajet utilisé par défaut (défaut: false)           |

#### Relations

- **1→N avec `TrajectoryStep`** : Étapes du trajet (œuvres à visiter)
- **1→N avec `ScheduledVisit`** : Visites programmées utilisant ce trajet

**Cas d'usage** :

- Créer différents types de visites (découverte, approfondie, thématique)
- Adapter les visites selon l'audience (familles, experts, scolaires)
- Activer/désactiver des trajets selon les expositions temporaires

---

### Table: `trajectory_steps`

**Description**: Étapes individuelles d'un trajet (quelle œuvre, dans quel ordre, combien de temps).

#### Attributs

| Champ                    | Type          | Description                                        |
| ------------------------ | ------------- | -------------------------------------------------- |
| `id`                     | String (CUID) | Identifiant unique de l'étape                      |
| `trajectoryId`           | String (FK)   | Référence vers le trajet parent                    |
| `artworkId`              | String (FK)   | Œuvre à présenter                                  |
| `narrativeContentId`     | String? (FK)  | Contenu narratif spécifique à utiliser (optionnel) |
| `stepOrder`              | Int           | Ordre de l'étape dans le trajet (1, 2, 3...)       |
| `stopDuration`           | Int           | Durée d'arrêt devant l'œuvre en minutes            |
| `positionX`, `positionY` | Float?        | Position exacte où le robot doit se placer         |
| `notes`                  | Text?         | Notes pour le personnel (instructions spéciales)   |

#### Contraintes

- **Unique** : `(trajectoryId, stepOrder)` - Pas de doublons d'ordre dans un trajet

#### Indexes

- `(trajectoryId)` : Récupération rapide de toutes les étapes d'un trajet

**Cas d'usage** :

- Définir l'ordre de visite des œuvres
- Spécifier le positionnement optimal du robot
- Calculer automatiquement la durée totale du trajet

---

### Table: `scheduled_visits`

**Description**: Visites programmées dans le calendrier du musée.

#### Attributs

| Champ            | Type          | Description                                                |
| ---------------- | ------------- | ---------------------------------------------------------- |
| `id`             | String (CUID) | Identifiant unique de la visite                            |
| `trajectoryId`   | String (FK)   | Trajet à suivre pour cette visite                          |
| `scheduledDate`  | Date          | Date de la visite                                          |
| `startTime`      | Time          | Heure de départ de la visite                               |
| `recurrenceRule` | String?       | Règle de récurrence iCal (ex: visites quotidiennes)        |
| `status`         | String        | État: "scheduled", "in_progress", "completed", "cancelled" |

#### Relations

- **N→1 avec `Trajectory`** : Utilise un trajet spécifique
- **1→N avec `RobotActivityLog`** : Logs générés pendant la visite
- **1→N avec `VisitorInteraction`** : Interactions avec les visiteurs

#### Indexes

- `(scheduledDate, startTime)` : Recherche efficace des visites par date/heure

**Cas d'usage** :

- Programmer les visites guidées à l'avance
- Gérer les récurrences (ex: visite découverte tous les jours à 14h)
- Suivre l'état d'avancement des visites en temps réel

---

## PHASE 3: Cartographie

### Table: `museum_maps`

**Description**: Cartes du musée avec obstacles, zones navigables, etc.

#### Attributs

| Champ      | Type            | Description                                              |
| ---------- | --------------- | -------------------------------------------------------- |
| `id`       | String (CUID)   | Identifiant unique de la carte                           |
| `version`  | String (unique) | Version de la carte (ex: "v1.0", "2024-01-exposition")   |
| `mapData`  | JSON            | Données de la carte (occupancy grid, obstacles, etc.)    |
| `scale`    | Float           | Échelle de la carte en mètres/pixel (défaut: 1.0)        |
| `isActive` | Boolean         | Carte actuellement utilisée par le robot (défaut: false) |

#### Relations

- **1→N avec `Zone`** : Zones définies sur cette carte

**Format `mapData` (exemple)** :

```json
{
  "width": 1000,
  "height": 800,
  "resolution": 0.05,
  "origin": [0, 0],
  "occupancyGrid": [...], // Array de valeurs 0-100
  "obstacles": [...]
}
```

**Cas d'usage** :

- Stocker différentes versions de carte (utile lors de réorganisations)
- Fournir la carte au système de navigation ROS2
- Permettre l'édition visuelle dans l'interface admin

---

### Table: `zones`

**Description**: Zones spécifiques sur la carte (publiques, interdites, de recharge, etc.).

#### Attributs

| Champ         | Type          | Description                                                |
| ------------- | ------------- | ---------------------------------------------------------- |
| `id`          | String (CUID) | Identifiant unique de la zone                              |
| `mapId`       | String (FK)   | Carte parente                                              |
| `name`        | String        | Nom de la zone (ex: "Salle Renaissance", "Zone de charge") |
| `type`        | String        | Type: "public", "restricted", "forbidden", "charging"      |
| `geometry`    | JSON          | Polygone définissant la zone (coordonnées)                 |
| `accessRules` | JSON?         | Règles d'accès (horaires, conditions)                      |

#### Indexes

- `(mapId)` : Récupération de toutes les zones d'une carte
- `(type)` : Filtrage par type de zone

**Format `geometry` (exemple)** :

```json
{
  "type": "Polygon",
  "coordinates": [
    [
      [100, 100],
      [200, 100],
      [200, 200],
      [100, 200],
      [100, 100]
    ]
  ]
}
```

**Format `accessRules` (exemple)** :

```json
{
  "allowedHours": ["09:00-18:00"],
  "maxSpeed": 0.5,
  "priority": "high"
}
```

**Cas d'usage** :

- Définir les zones où le robot peut/ne peut pas aller
- Localiser la station de recharge
- Appliquer des restrictions horaires (ex: zone fermée pour nettoyage)

---

## PHASE 4: Logs et Analytics

### Table: `robot_activity_logs`

**Description**: Journalise toutes les activités du robot pour suivi et débogage.

#### Attributs

| Champ       | Type          | Description                                        |
| ----------- | ------------- | -------------------------------------------------- |
| `id`        | String (CUID) | Identifiant unique du log                          |
| `visitId`   | String? (FK)  | Visite associée (null pour événements hors visite) |
| `eventType` | String        | Type d'événement (voir liste ci-dessous)           |
| `eventData` | JSON?         | Données spécifiques à l'événement                  |
| `timestamp` | DateTime      | Date/heure de l'événement (auto: now())            |

#### Types d'événements (`eventType`)

- `visit_start` : Démarrage d'une visite
- `visit_end` : Fin de visite
- `artwork_presented` : Présentation d'une œuvre
- `navigation_start` : Début de déplacement
- `navigation_end` : Arrivée à destination
- `battery_low` : Batterie faible
- `error_occurred` : Erreur système
- `charging_start` / `charging_end` : Charge de batterie

#### Indexes

- `(visitId)` : Tous les logs d'une visite
- `(timestamp)` : Recherche par période

**Cas d'usage** :

- Debugging : identifier la cause d'un problème
- Analytics : analyser le comportement du robot
- Audit : tracer toutes les activités

---

### Table: `visitor_interactions`

**Description**: Enregistre toutes les interactions vocals entre le robot et les visiteurs.

#### Question

| Champ              | Type    | Description                        |
| ------------------ | ------- | ---------------------------------- |
| `interactionType`  | String  | "question", "feedback", "command"  |
| `questionText`     | Text?   | Transcription de la question (STT) |
| `detectedIntent`   | String? | Intention détectée par le NLP      |
| `intentConfidence` | Float?  | Niveau de confiance (0.0-1.0)      |

#### Réponse

| Champ            | Type    | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| `responseText`   | Text?   | Texte de la réponse générée                |
| `responseSource` | String? | Source: "faq", "llm_generated", "fallback" |
| `language`       | String  | Langue de l'interaction (défaut: "fr")     |

#### Métriques de performance

| Champ            | Type | Description                             |
| ---------------- | ---- | --------------------------------------- |
| `sttLatencyMs`   | Int? | Latence Speech-to-Text en millisecondes |
| `nlpLatencyMs`   | Int? | Latence traitement NLP en millisecondes |
| `ttsLatencyMs`   | Int? | Latence Text-to-Speech en millisecondes |
| `totalLatencyMs` | Int? | Latence totale (objectif: < 3000ms)     |

#### Résultat

| Champ           | Type    | Description                        |
| --------------- | ------- | ---------------------------------- |
| `wasSuccessful` | Boolean | Interaction réussie (défaut: true) |
| `errorOccurred` | Boolean | Erreur rencontrée (défaut: false)  |

**Cas d'usage** :

- Améliorer le NLP : analyser les questions mal comprises
- Optimiser les performances : identifier les goulots d'étranglement
- Enrichir la FAQ : identifier les questions fréquentes non cachées
- Analytics : comprendre les centres d'intérêt des visiteurs

---

### Table: `daily_metrics`

**Description**: Métriques agrégées par jour pour rapports et dashboards.

#### Métriques de visite

| Champ              | Type          | Description                          |
| ------------------ | ------------- | ------------------------------------ |
| `date`             | Date (unique) | Date des métriques                   |
| `totalVisits`      | Int           | Nombre total de visites ce jour      |
| `totalVisitors`    | Int           | Nombre estimé de visiteurs           |
| `avgVisitDuration` | Float?        | Durée moyenne des visites en minutes |

#### Métriques d'interaction

| Champ               | Type   | Description                                 |
| ------------------- | ------ | ------------------------------------------- |
| `totalInteractions` | Int    | Nombre total d'interactions NLP             |
| `avgSttLatencyMs`   | Float? | Latence STT moyenne                         |
| `avgNlpLatencyMs`   | Float? | Latence NLP moyenne                         |
| `successRate`       | Float? | Taux de réussite des interactions (0.0-1.0) |

#### Analytics

| Champ                | Type  | Description                     |
| -------------------- | ----- | ------------------------------- |
| `mostViewedArtworks` | JSON? | Top 10 des œuvres les plus vues |

**Format `mostViewedArtworks` (exemple)** :

```json
[
  { "artworkId": "...", "title": "La Joconde", "views": 42 },
  { "artworkId": "...", "title": "Le Penseur", "views": 38 }
]
```

**Cas d'usage** :

- Dashboard temps réel : afficher les KPIs du jour
- Rapports mensuels : identifier les tendances
- Optimisation : détecter les heures de pointe, planifier mieux les visites

---

## PHASE 5: Optimisations

### Table: `faq_cache`

**Description**: Cache des réponses fréquentes pour éviter les appels LLM répétitifs.

#### Attributs

| Champ              | Type          | Description                                     |
| ------------------ | ------------- | ----------------------------------------------- |
| `id`               | String (CUID) | Identifiant unique du cache                     |
| `artworkId`        | String? (FK)  | Œuvre concernée (null pour questions générales) |
| `questionVariants` | String[]      | Liste de formulations de la question            |
| `answerText`       | Text          | Réponse textuelle                               |
| `answerAudioUrl`   | String?       | Audio pré-généré (TTS) de la réponse            |
| `usageCount`       | Int           | Nombre de fois utilisé (défaut: 0)              |
| `lastUsed`         | DateTime?     | Dernière utilisation                            |

#### Indexes

- `(artworkId)` : Recherche des FAQ d'une œuvre
- `(usageCount, lastUsed)` : Identifier les FAQ populaires et périmées

**Exemple de données** :

```
questionVariants: [
  "Pourquoi sourit-elle ?",
  "Pourquoi la Joconde sourit ?",
  "Quel est le secret de son sourire ?",
  "Pourquoi ce sourire mystérieux ?"
]
answerText: "Le sourire de la Joconde est obtenu par la technique du sfumato..."
```

**Cas d'usage** :

- Réduire la latence : réponse instantanée (< 100ms vs 1-2s LLM)
- Réduire les coûts : moins d'appels API Claude/GPT
- Améliorer la cohérence : même question = même réponse toujours
- Analytics : identifier les questions les plus posées

---

## Optimisation et Performance

### Stratégies d'indexation

Tous les indexes ont été placés pour optimiser les requêtes courantes :

- Recherche spatiale : `(positionX, positionY)`
- Recherche temporelle : `(timestamp)`, `(scheduledDate, startTime)`, `(date)`
- Relations : Tous les Foreign Keys indexés automatiquement
- Popularité : `(usageCount, lastUsed)` pour le cache

### Politiques de sauvegarde

| Table                                     | Rétention                                              | Archivage                    |
| ----------------------------------------- | ------------------------------------------------------ | ---------------------------- |
| `artworks`, `trajectories`, `museum_maps` | Permanent                                              | Versions obsolètes archivées |
| `scheduled_visits`                        | 2 ans                                                  | Oui                          |
| `robot_activity_logs`                     | 12 mois                                                | Oui                          |
| `visitor_interactions`                    | 30 jours PII, 12 mois anonymisé                        | Oui                          |
| `daily_metrics`                           | Permanent                                              | Non                          |
| `faq_cache`                               | Permanent (nettoyage si `usageCount` = 0 après 6 mois) | Non                          |

---

## Relations et Contraintes

```
Artwork 1→N NarrativeContent
Artwork 1→N TrajectoryStep
Artwork 1→N FAQCache

Trajectory 1→N TrajectoryStep
Trajectory 1→N ScheduledVisit

TrajectoryStep N→1 Artwork
TrajectoryStep N→1 Trajectory
TrajectoryStep N→1 NarrativeContent (optional)

ScheduledVisit N→1 Trajectory
ScheduledVisit 1→N RobotActivityLog
ScheduledVisit 1→N VisitorInteraction

MuseumMap 1→N Zone
```

### Cascades de suppression

- Suppression d'une `Artwork` → Supprime ses `NarrativeContent` (CASCADE)
- Suppression d'un `Trajectory` → Supprime ses `TrajectoryStep` (CASCADE)
- Suppression d'une `MuseumMap` → Supprime ses `Zone` (CASCADE)
- Suppression d'un `ScheduledVisit` → Conserve les logs (SET NULL sur visitId)

---

## Notes d'implémentation

### IDs en CUID

Tous les identifiants utilisent le format CUID (Collision-resistant Unique IDentifier) :

- Format : `c` + 24 caractères alphanumériques
- Exemple : `clgh7z8xk0000qwerty123456`
- Avantages : sécurisé, non séquentiel, URL-safe, chronologiquement triable

### Types JSON

Les champs JSON sont utilisés pour :

- `mapData` : Structure complexe, évolutive selon version carte
- `geometry` : Format GeoJSON standard
- `accessRules`, `eventData` : Flexibilité pour cas variés
- `mostViewedArtworks` : Aggregats calculés

### Timestamps automatiques

Tous les modèles ont :

- `createdAt` : Auto-rempli à la création (immutable)
- `updatedAt` : Auto-mis à jour à chaque modification (sauf logs qui utilisent `timestamp`)

---

## Prochaines étapes

1. **Migration Prisma** : `npx prisma migrate dev --name init_museum_schema`
2. **Seed data** : Créer script de données de test
3. **Services** : Implémenter les services CRUD pour chaque modèle
4. **Tests** : Tests d'intégration sur les requêtes critiques
