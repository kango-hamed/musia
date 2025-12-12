# Documentation Technique - Musée Virtuel avec Guide IA Conversationnel

## Table des Matières
1. [Stack Technologique](#stack-technologique)
2. [Architecture du Système](#architecture-du-système)
3. [Fonctionnalités Détaillées](#fonctionnalités-détaillées)
4. [Processus de Conception](#processus-de-conception)
5. [Configuration du Projet](#configuration-du-projet)
6. [Structure des Répertoires](#structure-des-répertoires)
7. [Guide de Développement](#guide-de-développement)

---

## 1. Stack Technologique

### Frontend (JavaScript)
- **React 18** - Framework UI avec hooks
- **Three.js** - Moteur de rendu 3D WebGL
- **React Three Fiber** - Intégration React + Three.js
- **@react-three/drei** - Helpers et composants 3D
- **@react-three/postprocessing** - Effets visuels
- **Zustand** - Gestion d'état légère
- **Socket.io-client** - Communication temps réel
- **Axios** - Requêtes HTTP
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations UI
- **Howler.js** - Audio spatial
- **Web Speech API** - Reconnaissance vocale native

### Backend (Python)
- **FastAPI** - Framework web moderne et performant
- **Uvicorn** - Serveur ASGI
- **SQLAlchemy** - ORM pour la base de données
- **Alembic** - Migrations de base de données
- **Pydantic** - Validation des données
- **Python-socketio** - WebSocket pour temps réel
- **OpenAI / Anthropic SDK** - Intégration API LLM
- **LangChain** - Orchestration IA et RAG
- **ChromaDB / Pinecone** - Base vectorielle pour embeddings
- **Celery** - Tâches asynchrones
- **Redis** - Cache et broker de messages
- **Passlib + JWT** - Authentification
- **Python-multipart** - Upload de fichiers
- **Pillow** - Traitement d'images
- **pyttsx3 / gTTS** - Text-to-Speech

### Base de Données
- **PostgreSQL** - Base principale (œuvres, utilisateurs, visites)
- **Redis** - Cache et sessions
- **ChromaDB** - Embeddings vectoriels pour RAG

### Infrastructure & DevOps
- **Docker + Docker Compose** - Conteneurisation
- **Nginx** - Reverse proxy et serveur statique
- **AWS S3 / MinIO** - Stockage des assets 3D
- **GitHub Actions** - CI/CD
- **Prometheus + Grafana** - Monitoring
- **Sentry** - Error tracking

### Outils de Développement
- **Node.js 18+** & **npm/yarn**
- **Python 3.11+**
- **Poetry** - Gestion dépendances Python
- **ESLint + Prettier** - Linting JavaScript
- **Black + Flake8** - Linting Python
- **Jest** - Tests unitaires frontend
- **Pytest** - Tests backend

---

## 2. Architecture du Système

### Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + Three.js)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Scène 3D     │  │ Chat UI      │  │ Audio Player │     │
│  │ Navigation   │  │ Avatar Guide │  │ Voice Input  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────┬────────────────────────────────────┬──────────┘
             │                                    │
             │ HTTP/REST                WebSocket │
             │                                    │
┌────────────┴────────────────────────────────────┴──────────┐
│                    BACKEND (FastAPI + Python)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ API REST     │  │ WebSocket    │  │ IA Service   │    │
│  │ Auth JWT     │  │ Real-time    │  │ LangChain    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Itinéraires  │  │ Analytics    │  │ Admin API    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└────────────┬───────────────────┬──────────────┬───────────┘
             │                   │              │
    ┌────────┴────────┐  ┌───────┴──────┐  ┌───┴────────┐
    │  PostgreSQL     │  │    Redis     │  │  ChromaDB  │
    │  (Données)      │  │    (Cache)   │  │ (Vectors)  │
    └─────────────────┘  └──────────────┘  └────────────┘
             │
    ┌────────┴────────┐
    │   S3 / MinIO    │
    │  (Assets 3D)    │
    └─────────────────┘
```

### Flux de Données

**1. Chargement Initial**
```
Utilisateur → Frontend → API /museum/init → PostgreSQL
                      ↓
              Chargement scène 3D + métadonnées œuvres
                      ↓
              Connexion WebSocket pour chat temps réel
```

**2. Navigation Guidée**
```
Frontend → WebSocket → Backend Guide Service
                     ↓
              LangChain + ChromaDB (RAG)
                     ↓
              API LLM (GPT-4/Claude)
                     ↓
              WebSocket → Frontend (réponse + commandes navigation)
```

**3. Question Visiteur**
```
Visiteur tape/parle → Frontend (Speech-to-Text si vocal)
                    ↓
              WebSocket → Backend
                    ↓
              Context Manager (historique + position + œuvre)
                    ↓
              RAG System (recherche info pertinente)
                    ↓
              LLM avec prompt enrichi
                    ↓
              Réponse + TTS → Frontend
```

---

## 3. Fonctionnalités Détaillées

### 3.1 Exploration du Musée Virtuel

#### Navigation 3D
- **Modes de navigation**
  - Vue première personne (WASD + souris)
  - Vue orbitale (rotation caméra)
  - Mode téléportation (clic sur le sol)
  - Navigation automatique guidée
- **Interactions**
  - Clic sur œuvre pour info détaillée
  - Zoom sur détails
  - Mini-carte du musée
  - Système de waypoints
- **Optimisations**
  - LOD (Level of Detail) automatique
  - Occlusion culling
  - Chargement progressif des assets
  - Lazy loading des salles distantes

#### Environnement 3D
- Architecture réaliste du musée
- Éclairage dynamique (jour/nuit)
- Reflets et ombres
- Ambiance sonore spatiale
- Présence d'autres visiteurs (avatars)

### 3.2 Guide IA Conversationnel

#### Capacités du Guide
- **Présentation d'œuvres**
  - Description détaillée contextuelle
  - Anecdotes historiques
  - Analyse technique (composition, couleurs, techniques)
  - Comparaisons avec d'autres œuvres
  
- **Réponses aux questions**
  - Questions sur l'œuvre actuelle
  - Questions historiques et biographiques
  - Questions techniques sur l'art
  - Recommandations personnalisées
  
- **Navigation intelligente**
  - Suit un itinéraire configurable
  - S'adapte au rythme du visiteur
  - Propose des détours selon les intérêts
  - Gère les priorités temporelles

#### Types d'Itinéraires
- **Visite Classique** (60-90 min)
  - Chefs-d'œuvre incontournables
  - Chronologique ou thématique
  
- **Visite Thématique**
  - Par mouvement artistique (Impressionnisme, Renaissance, etc.)
  - Par thème (Portraits, Paysages, Nature morte)
  - Par technique (Peinture à l'huile, Sculpture, etc.)
  
- **Visite Familiale** (30-45 min)
  - Œuvres accessibles aux enfants
  - Langage simplifié
  - Éléments ludiques et quiz
  
- **Visite Express** (20-30 min)
  - Top 10 des œuvres
  - Présentation condensée
  
- **Visite Libre**
  - Le guide répond aux questions uniquement
  - Pas de parcours imposé

#### Personnalité du Guide
- **Modes configurables**
  - Professeur académique (formel, détaillé)
  - Ami passionné (décontracté, enthousiaste)
  - Expert conservateur (technique, pointu)
  - Conteur (narratif, émotionnel)
  
- **Adaptation dynamique**
  - Détecte le niveau de connaissance
  - Ajuste la complexité du vocabulaire
  - Répond aux signaux d'intérêt/ennui

### 3.3 Système de Communication

#### Chat Textuel
- Interface de chat élégante et discrète
- Historique de conversation
- Suggestions de questions
- Réponses avec citations de sources
- Markdown et formatage riche

#### Communication Vocale
- **Input vocal**
  - Reconnaissance vocale multilingue
  - Bouton push-to-talk
  - Activation par mot-clé optionnelle
  
- **Output audio**
  - Synthèse vocale naturelle
  - Voix personnalisables (homme/femme, accent)
  - Audio spatialisé (voix vient de l'avatar)
  - Sous-titres automatiques

#### Avatar du Guide
- Personnage 3D animé dans la scène
- Animations synchronisées avec la parole
- Gestures contextuels (pointer, décrire)
- Expressions faciales
- Suit le visiteur à distance configurable

### 3.4 Système Multi-Utilisateurs

#### Visites de Groupe
- **Organisation**
  - Création de sessions privées
  - Invitation par lien
  - Jusqu'à 20 participants simultanés
  
- **Fonctionnalités sociales**
  - Voir les avatars des autres visiteurs
  - Chat de groupe
  - Guide commun qui s'adresse au groupe
  - Votes pour choisir l'œuvre suivante
  
- **Rôles**
  - Organisateur (contrôle l'itinéraire)
  - Participants (suivent ou explorent)

#### Interactions Sociales
- Émojis réactifs au-dessus des avatars
- Pointeur laser pour montrer des détails
- Screenshots partagés
- Commentaires collaboratifs sur œuvres

### 3.5 Gestion des Contenus (Admin)

#### Dashboard Administrateur
- **Gestion des œuvres**
  - CRUD complet (Create, Read, Update, Delete)
  - Upload de modèles 3D (GLTF/GLB)
  - Upload d'images haute résolution
  - Métadonnées enrichies (titre, artiste, date, description, etc.)
  - Catégorisation et tags
  
- **Configuration du musée**
  - Layout des salles
  - Positionnement des œuvres
  - Éclairage et ambiance
  - Points de téléportation
  
- **Gestion des itinéraires**
  - Créateur d'itinéraire visuel (drag & drop)
  - Durée par étape
  - Points d'intérêt spéciaux
  - Scripts de présentation personnalisés
  
- **Configuration du Guide IA**
  - Prompts système personnalisés
  - Base de connaissances (FAQ, anecdotes)
  - Personnalité et ton
  - Langues supportées

#### Analytics et Rapports
- **Statistiques de visite**
  - Nombre de visiteurs (total, uniques, récurrents)
  - Durée moyenne des visites
  - Œuvres les plus visitées
  - Taux de complétion des itinéraires
  - Heatmaps de navigation
  
- **Analyse des interactions**
  - Questions fréquentes au guide
  - Taux d'engagement (questions/visite)
  - Satisfaction (si système de rating)
  - Moments d'abandon
  
- **Rapports d'utilisation**
  - Export CSV/PDF
  - Graphiques temporels
  - Comparaisons entre itinéraires
  - ROI et KPIs personnalisés

### 3.6 Fonctionnalités Complémentaires

#### Accessibilité
- Mode contraste élevé
- Lecteur d'écran compatible
- Navigation clavier complète
- Descriptions audio détaillées
- Taille de texte ajustable
- Mode dyslexie (police adaptée)

#### Gamification
- Badges de visite (collectionneur, explorateur, etc.)
- Quiz sur les œuvres
- Chasse au trésor thématique
- Leaderboard des connaisseurs
- Partage de réalisations

#### Fonctionnalités Éducatives
- Mode classe virtuelle
- Espace enseignant avec ressources
- Fiches pédagogiques téléchargeables
- Parcours scolaires adaptés par niveau
- Enregistrement des visites pour replay

#### Personnalisation Utilisateur
- Compte utilisateur avec profil
- Favoris et collections personnelles
- Historique des visites
- Notes personnelles sur les œuvres
- Préférences d'interface

---

## 4. Processus de Conception

### Phase 1 : Analyse et Spécifications (Semaines 1-2)

#### Étape 1.1 : Recueil des Besoins
- Rencontre avec les parties prenantes (conservateurs, éducateurs)
- Définition des objectifs (éducatif, marketing, accessible)
- Identification du public cible
- Analyse de musées virtuels existants

#### Étape 1.2 : Spécifications Fonctionnelles
- Liste exhaustive des fonctionnalités
- Priorisation (Must-have, Should-have, Nice-to-have)
- User stories détaillées
- Critères d'acceptation

#### Étape 1.3 : Spécifications Techniques
- Choix de la stack technologique
- Définition de l'architecture système
- Schéma de base de données
- API endpoints specification (OpenAPI)
- Diagrammes de séquence

#### Livrables Phase 1
- Document de spécifications fonctionnelles
- Document de spécifications techniques
- Schéma d'architecture
- Roadmap projet avec jalons

### Phase 2 : Design et Prototypage (Semaines 3-4)

#### Étape 2.1 : Design UX/UI
- Wireframes des écrans principaux
- Flux utilisateur (user flows)
- Prototypes interactifs (Figma)
- Charte graphique et identité visuelle
- Design system (composants réutilisables)

#### Étape 2.2 : Design 3D
- Concept art du musée
- Plans architecturaux 3D
- Style visuel (réaliste, stylisé, minimaliste)
- Palette de couleurs et matériaux
- Design de l'avatar guide

#### Étape 2.3 : Tests Utilisateurs Préliminaires
- Tests de prototypes avec échantillon d'utilisateurs
- Ajustements basés sur les retours
- Validation de l'ergonomie

#### Livrables Phase 2
- Maquettes haute fidélité
- Prototype interactif cliquable
- Concept 3D du musée
- Rapport de tests utilisateurs

### Phase 3 : Configuration Environnement (Semaine 5)

#### Étape 3.1 : Configuration Locale
```bash
# Création des dépôts
mkdir virtual-museum
cd virtual-museum
git init

# Structure de base
mkdir -p frontend backend infrastructure docs

# Configuration Docker
touch docker-compose.yml
touch frontend/Dockerfile
touch backend/Dockerfile
```

#### Étape 3.2 : Frontend Setup
```bash
cd frontend
npx create-react-app . --template typescript
npm install three @react-three/fiber @react-three/drei
npm install zustand axios socket.io-client
npm install react-router-dom tailwindcss
npm install framer-motion howler
```

#### Étape 3.3 : Backend Setup
```bash
cd backend
poetry init
poetry add fastapi uvicorn sqlalchemy alembic
poetry add python-socketio redis
poetry add openai langchain chromadb
poetry add python-jose passlib bcrypt
poetry add pytest pytest-asyncio httpx
```

#### Étape 3.4 : Base de Données
```bash
# Docker Compose pour les services
docker-compose up -d postgres redis minio

# Initialisation des bases
cd backend
alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

#### Étape 3.5 : Configuration CI/CD
```yaml
# .github/workflows/ci.yml
name: CI Pipeline
on: [push, pull_request]
jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: cd frontend && npm test
  
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: cd backend && poetry run pytest
```

#### Livrables Phase 3
- Environnement de développement opérationnel
- Docker Compose configuré
- Pipeline CI/CD fonctionnel
- Documentation de setup

### Phase 4 : Développement Backend (Semaines 6-9)

#### Étape 4.1 : API Core
- Configuration FastAPI avec structure modulaire
- Système d'authentification JWT
- Modèles SQLAlchemy (Users, Artworks, Tours, etc.)
- Endpoints CRUD pour toutes les entités
- Validation Pydantic
- Tests unitaires avec Pytest

#### Étape 4.2 : Service IA
- Intégration LangChain
- Configuration ChromaDB pour embeddings
- Système RAG (Retrieval Augmented Generation)
- Gestion du contexte conversationnel
- Prompts engineering pour le guide
- Cache des réponses fréquentes

#### Étape 4.3 : WebSocket Real-time
- Configuration Socket.io
- Gestion des sessions de visite
- Broadcasting pour groupes
- Synchronisation des positions
- Chat temps réel

#### Étape 4.4 : Service de Gestion Assets
- Upload de modèles 3D vers S3/MinIO
- Validation et optimisation automatique
- Génération de thumbnails
- Gestion des versions

#### Livrables Phase 4
- API REST complète documentée (Swagger)
- Service IA conversationnel fonctionnel
- WebSocket serveur opérationnel
- Suite de tests avec >80% coverage

### Phase 5 : Développement Frontend (Semaines 10-13)

#### Étape 5.1 : Scène 3D de Base
- Configuration Three.js avec React Three Fiber
- Chargement de modèles GLTF
- Système de caméra et contrôles
- Éclairage et matériaux
- Performance monitoring

#### Étape 5.2 : Navigation et Interactions
- Système de navigation (first-person, orbital)
- Détection de collision
- Raycasting pour interactions
- Système de téléportation
- Mini-carte

#### Étape 5.3 : Interface Utilisateur
- Composants React réutilisables
- Layout responsive
- Chat interface
- Panneau d'information œuvres
- Menu de navigation
- Système de modales

#### Étape 5.4 : Intégration IA
- Connexion WebSocket au backend
- Interface de chat avec l'agent
- Affichage de l'avatar guide
- Synchronisation audio
- Gestion de l'historique

#### Étape 5.5 : Gestion d'État
- Configuration Zustand
- Store pour utilisateur
- Store pour musée et œuvres
- Store pour chat et guide
- Persistance locale (localStorage)

#### Livrables Phase 5
- Application frontend complète
- Scène 3D navigable
- Interface utilisateur responsive
- Intégration IA fonctionnelle

### Phase 6 : Fonctionnalités Avancées (Semaines 14-16)

#### Étape 6.1 : Multi-utilisateurs
- Gestion des sessions de groupe
- Synchronisation des avatars
- Chat de groupe
- Système de vote

#### Étape 6.2 : Dashboard Admin
- Interface CRUD pour œuvres
- Éditeur d'itinéraires visuel
- Configuration du guide IA
- Tableau de bord analytics

#### Étape 6.3 : Audio et Voix
- Intégration Text-to-Speech
- Reconnaissance vocale
- Audio spatialisé
- Ambiance sonore

#### Étape 6.4 : Gamification
- Système de badges
- Quiz interactifs
- Leaderboard
- Partage social

#### Livrables Phase 6
- Fonctionnalités multi-utilisateurs
- Dashboard administrateur complet
- Système audio intégré
- Éléments de gamification

### Phase 7 : Optimisation et Tests (Semaines 17-18)

#### Étape 7.1 : Optimisation Performance
- Profiling frontend (Chrome DevTools)
- Optimisation des assets 3D
- Code splitting et lazy loading
- Mise en cache agressive
- Compression des assets
- CDN pour assets statiques

#### Étape 7.2 : Tests Complets
- Tests unitaires (Jest, Pytest)
- Tests d'intégration
- Tests E2E (Playwright)
- Tests de charge (Locust)
- Tests d'accessibilité (aXe)
- Tests cross-browser

#### Étape 7.3 : Sécurité
- Audit de sécurité
- Sanitization des inputs
- Rate limiting
- CORS configuration
- HTTPS obligatoire
- Protection CSRF

#### Étape 7.4 : Accessibilité
- Audit WCAG 2.1
- Support lecteurs d'écran
- Navigation clavier
- Contrastes suffisants
- Textes alternatifs

#### Livrables Phase 7
- Application optimisée (<3s load time)
- Rapport de tests complet
- Rapport d'audit sécurité
- Certification accessibilité

### Phase 8 : Déploiement et Lancement (Semaines 19-20)

#### Étape 8.1 : Préparation Production
- Configuration des environnements (staging, prod)
- Variables d'environnement
- Secrets management
- Backup automatique
- Monitoring (Prometheus, Grafana)
- Logging centralisé (ELK Stack)

#### Étape 8.2 : Infrastructure Cloud
```bash
# Exemple avec AWS
- ECS/EKS pour containers
- RDS pour PostgreSQL
- ElastiCache pour Redis
- S3 pour assets
- CloudFront pour CDN
- Route 53 pour DNS
```

#### Étape 8.3 : Déploiement
- Déploiement staging
- Tests de validation
- Déploiement production progressif (canary)
- Rollback plan

#### Étape 8.4 : Documentation
- Documentation technique complète
- Guide d'utilisation utilisateur
- Guide administrateur
- API documentation (Swagger/OpenAPI)
- Runbook opérationnel

#### Livrables Phase 8
- Application en production
- Infrastructure scalable
- Documentation complète
- Plan de maintenance

### Phase 9 : Post-Lancement (Semaines 21+)

#### Étape 9.1 : Monitoring et Support
- Surveillance continue
- Correction de bugs
- Support utilisateurs
- Collecte de feedback

#### Étape 9.2 : Itérations
- Analyse des métriques
- Priorisation des améliorations
- Sprints d'amélioration continue
- Ajout de nouveaux contenus

#### Étape 9.3 : Marketing et Communication
- Campagne de lancement
- Démonstrations publiques
- Partenariats éducatifs
- Communauté d'utilisateurs

---

## 5. Configuration du Projet

### 5.1 Structure Complète du Projet

```
virtual-museum/
│
├── frontend/                      # Application React + Three.js
│   ├── public/
│   │   ├── index.html
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── sounds/
│   │   │   └── fonts/
│   │   └── models/               # Modèles 3D statiques
│   │
│   ├── src/
│   │   ├── components/           # Composants React
│   │   │   ├── common/          # Composants réutilisables
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Loader.jsx
│   │   │   ├── layout/          # Layout général
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navigation.jsx
│   │   │   ├── museum/          # Composants spécifiques musée
│   │   │   │   ├── MuseumScene.jsx
│   │   │   │   ├── Artwork.jsx
│   │   │   │   ├── ArtworkInfo.jsx
│   │   │   │   ├── MiniMap.jsx
│   │   │   │   └── Teleporter.jsx
│   │   │   ├── guide/           # Composants guide IA
│   │   │   │   ├── GuideAvatar.jsx
│   │   │   │   ├── ChatInterface.jsx
│   │   │   │   ├── VoiceInput.jsx
│   │   │   │   └── TourSelector.jsx
│   │   │   ├── multiplayer/     # Multi-utilisateurs
│   │   │   │   ├── PlayerAvatar.jsx
│   │   │   │   ├── GroupChat.jsx
│   │   │   │   └── SessionManager.jsx
│   │   │   └── admin/           # Dashboard admin
│   │   │       ├── ArtworkManager.jsx
│   │   │       ├── TourEditor.jsx
│   │   │       ├── Analytics.jsx
│   │   │       └── GuideConfig.jsx
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useMuseum.js
│   │   │   ├── useGuide.js
│   │   │   ├── useWebSocket.js
│   │   │   ├── useAudio.js
│   │   │   └── useNavigation.js
│   │   │
│   │   ├── store/               # Zustand stores
│   │   │   ├── authStore.js
│   │   │   ├── museumStore.js
│   │   │   ├── guideStore.js
│   │   │   └── uiStore.js
│   │   │
│   │   ├── services/            # Services API
│   │   │   ├── api.js           # Configuration Axios
│   │   │   ├── authService.js
│   │   │   ├── museumService.js
│   │   │   ├── guideService.js
│   │   │   └── socketService.js
│   │   │
│   │   ├── utils/               # Utilitaires
│   │   │   ├── three-helpers.js
│   │   │   ├── audio-manager.js
│   │   │   ├── storage.js
│   │   │   └── validators.js
│   │   │
│   │   ├── styles/              # Styles CSS
│   │   │   ├── index.css
│   │   │   ├── tailwind.css
│   │   │   └── animations.css
│   │   │
│   │   ├── pages/               # Pages principales
│   │   │   ├── Home.jsx
│   │   │   ├── Museum.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.jsx
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js           # ou webpack.config.js
│   └── Dockerfile
│
├── backend/                      # API Python FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   │
│   │   ├── main.py              # Point d'entrée FastAPI
│   │   ├── config.py            # Configuration (env vars)
│   │   │
│   │   ├── models/              # Modèles SQLAlchemy
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── artwork.py
│   │   │   ├── artist.py
│   │   │   ├── tour.py
│   │   │   ├── visit.py
│   │   │   └── conversation.py
│   │   │
│   │   ├── schemas/             # Schémas Pydantic
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── artwork.py
│   │   │   ├── tour.py
│   │   │   └── chat.py
│   │   │
│   │   ├── api/                 # Endpoints API
│   │   │   ├── __init__.py
│   │   │   ├── deps.py          # Dépendances (auth, db)
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py
│   │   │   │   ├── users.py
│   │   │   │   ├── artworks.py
│   │   │   │   ├── tours.py
│   │   │   │   ├── guide.py
│   │   │   │   └── admin.py
│   │   │
│   │   ├── core/                # Fonctionnalités core
│   │   │   ├── __init__.py
│   │   │   ├── security.py      # JWT, hashing
│   │   │   ├── database.py      # Connexion DB
│   │   │   └── cache.py         # Redis cache
│   │   │
│   │   ├── services/            # Logique métier
│   │   │   ├── __init__.py
│   │   │   ├── ai_guide.py      # Service guide IA
│   │   │   ├── langchain_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── tts_service.py
│   │   │   ├── storage_service.py
│   │   │   └── analytics_service.py
│   │   │
│   │   ├── websocket/           # WebSocket handlers
│   │   │   ├── __init__.py
│   │   │   ├── manager.py
│   │   │   ├── chat_handler.py
│   │   │   └── multiplayer_handler.py
│   │   │
│   │   ├── utils/               # Utilitaires
│   │   │   ├── __init__.py
│   │   │   ├── validators.py
│   │   │   ├── helpers.py
│   │   │   └── logger.py
│   │   │
│   │   └── tests/               # Tests
│   │       ├── __init__.py
│   │       ├── conftest.py
│   │       ├── test_auth.py
│   │       ├── test_artworks.py
│   │       ├── test_guide.py
│   │       └── test_websocket.py
│   │
│   ├── migrations/              # Alembic migrations
│   │   ├── env.py
│   │   └── versions/
│   │
│   ├── scripts/                 # Scripts utilitaires
│   │   ├── init_db.py
│   │   ├── seed_data.py
│   │   └── generate_embeddings.py
│   │
│   ├── requirements.txt
│   ├── pyproject.toml          # Poetry config
│   ├── Dockerfile
│   └── .env.example
│
├── infrastructure/              # Configuration infrastructure
│   ├── docker/
│   │   ├── nginx/
│   │   │   ├── nginx.conf
│   │   │   └── Dockerfile
│   │   └── postgres/
│   │       └── init.sql
│   │
│   ├── kubernetes/             # K8s manifests (optionnel)
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
│   │
│   └── terraform/              # IaC (optionnel)
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
│
├── docs/                       # Documentation
│   ├── architecture.md
│   ├── api-spec.yaml          # OpenAPI spec
│   ├── user-guide.md
│   ├── admin-guide.md
│   └── deployment.md
│
├── scripts/                    # Scripts globaux
│   ├── setup.sh
│   ├── dev.sh
│   ├── test.sh
│   └── deploy.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── tests.yml
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .gitignore
├── README.md
└── LICENSE
```

### 5.2 Configuration Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Base de données PostgreSQL
  postgres:
    image: postgres:15-alpine
    container_name: museum_postgres
    environment:
      POSTGRES_DB: virtual_museum
      POSTGRES_USER: museum_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./infrastructure/docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - museum_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U museum_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Cache Redis
  redis:
    image: redis:7-alpine
    container_name: museum_redis
    command: redis-server --requirepass ${REDIS_PASSWORD}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - museum_network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Base vectorielle ChromaDB
  chromadb:
    image: chromadb/chroma:latest
    container_name: museum_chromadb
    ports:
      - "8000:8000"
    volumes:
      - chroma_data:/chroma/chroma
    environment:
      - IS_PERSISTENT=TRUE
    networks:
      - museum_network

  # Stockage S3-compatible (MinIO)
  minio:
    image: minio/minio:latest
    container_name: museum_minio
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_PASSWORD}
    volumes:
      - minio_data:/data
    networks:
      - museum_network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  # Backend FastAPI
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: museum_backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://museum_user:${DB_PASSWORD}@postgres:5432/virtual_museum
      - REDIS_URL=redis://:${REDIS_PASSWORD}@redis:6379/0
      - CHROMA_HOST=chromadb
      - CHROMA_PORT=8000
      - MINIO_ENDPOINT=minio:9000
      - MINIO_ACCESS_KEY=${MINIO_USER}
      - MINIO_SECRET_KEY=${MINIO_PASSWORD}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
      - ENVIRONMENT=development
    volumes:
      - ./backend:/app
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      chromadb:
        condition: service_started
      minio:
        condition: service_healthy
    networks:
      - museum_network

  # Frontend React
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: museum_frontend
    command: npm run dev
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
      - REACT_APP_WS_URL=ws://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - museum_network

  # Nginx (Reverse Proxy)
  nginx:
    build:
      context: ./infrastructure/docker/nginx
      dockerfile: Dockerfile
    container_name: museum_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infrastructure/docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./frontend/build:/usr/share/nginx/html:ro
    depends_on:
      - backend
      - frontend
    networks:
      - museum_network

volumes:
  postgres_data:
  redis_data:
  chroma_data:
  minio_data:

networks:
  museum_network:
    driver: bridge
```

### 5.3 Variables d'Environnement

```bash
# .env.example
# Copier vers .env et remplir les valeurs

# Database
DB_PASSWORD=your_secure_db_password
DATABASE_URL=postgresql://museum_user:${DB_PASSWORD}@localhost:5432/virtual_museum

# Redis
REDIS_PASSWORD=your_secure_redis_password
REDIS_URL=redis://:${REDIS_PASSWORD}@localhost:6379/0

# MinIO / S3
MINIO_USER=museum_admin
MINIO_PASSWORD=your_secure_minio_password
MINIO_ENDPOINT=localhost:9000
MINIO_BUCKET=museum-assets

# JWT Authentication
JWT_SECRET=your_very_long_random_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI API (ou autre LLM)
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# ChromaDB
CHROMA_HOST=localhost
CHROMA_PORT=8000
CHROMA_COLLECTION=museum_knowledge

# Application
ENVIRONMENT=development
DEBUG=True
CORS_ORIGINS=http://localhost:3000,http://localhost:80

# Frontend
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000
REACT_APP_MINIO_URL=http://localhost:9000

# Monitoring (optionnel)
SENTRY_DSN=your_sentry_dsn
```

### 5.4 Scripts de Configuration

#### setup.sh - Installation initiale
```bash
#!/bin/bash

echo "🚀 Configuration du projet Virtual Museum..."

# Vérification des prérequis
command -v docker >/dev/null 2>&1 || { echo "Docker requis mais non installé. Abandon." >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js requis mais non installé. Abandon." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "Python 3 requis mais non installé. Abandon." >&2; exit 1; }

# Copie du fichier .env
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
    echo "⚠️  Veuillez remplir les valeurs dans le fichier .env"
fi

# Installation des dépendances Frontend
echo "📦 Installation des dépendances Frontend..."
cd frontend
npm install
cd ..

# Installation des dépendances Backend
echo "📦 Installation des dépendances Backend..."
cd backend
poetry install
cd ..

# Démarrage des services Docker
echo "🐳 Démarrage des services Docker..."
docker-compose up -d postgres redis chromadb minio

# Attente du démarrage des services
echo "⏳ Attente du démarrage des services..."
sleep 10

# Initialisation de la base de données
echo "🗄️ Initialisation de la base de données..."
cd backend
poetry run alembic upgrade head
poetry run python scripts/seed_data.py
cd ..

echo "✅ Configuration terminée !"
echo "👉 Lancez 'npm run dev' pour démarrer l'application"
```

#### dev.sh - Lancement en développement
```bash
#!/bin/bash

echo "🚀 Démarrage de l'environnement de développement..."

# Démarrage des services
docker-compose up -d postgres redis chromadb minio

# Terminal 1: Backend
gnome-terminal --tab --title="Backend" -- bash -c "cd backend && poetry run uvicorn app.main:app --reload; exec bash"

# Terminal 2: Frontend
gnome-terminal --tab --title="Frontend" -- bash -c "cd frontend && npm run dev; exec bash"

echo "✅ Environnement démarré !"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
```

---

## 6. Guide de Développement

### 6.1 Standards de Code

#### Frontend (JavaScript/React)
```javascript
// Exemple de composant React bien structuré
import React, { useState, useEffect } from 'react';
import { useMuseumStore } from '@/store/museumStore';
import { fetchArtwork } from '@/services/museumService';

/**
 * Composant d'affichage d'une œuvre d'art
 * @param {Object} props - Props du composant
 * @param {string} props.artworkId - ID de l'œuvre
 */
const ArtworkDisplay = ({ artworkId }) => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { selectedArtwork, setSelectedArtwork } = useMuseumStore();

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        const data = await fetchArtwork(artworkId);
        setArtwork(data);
      } catch (error) {
        console.error('Erreur chargement œuvre:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, [artworkId]);

  if (loading) return <Loader />;
  if (!artwork) return <ErrorMessage />;

  return (
    <div className="artwork-container">
      <h2>{artwork.title}</h2>
      <p className="artist">{artwork.artist}</p>
      <img 
        src={artwork.imageUrl} 
        alt={artwork.title}
        loading="lazy"
      />
    </div>
  );
};

export default ArtworkDisplay;
```

**Conventions Frontend:**
- Components en PascalCase: `ArtworkDisplay.jsx`
- Hooks personnalisés préfixés par `use`: `useMuseum.js`
- Services suffixés par `Service`: `museumService.js`
- JSDoc pour documentation
- Prop-types ou TypeScript pour validation
- Tests unitaires avec Jest

#### Backend (Python/FastAPI)
```python
# Exemple d'endpoint API bien structuré
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.artwork import Artwork
from app.schemas.artwork import ArtworkCreate, ArtworkResponse
from app.services.storage_service import upload_to_s3

router = APIRouter()

@router.post("/artworks", response_model=ArtworkResponse, status_code=status.HTTP_201_CREATED)
async def create_artwork(
    artwork_data: ArtworkCreate,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_admin_user)
):
    """
    Créer une nouvelle œuvre d'art.
    
    Nécessite les permissions administrateur.
    
    Args:
        artwork_data: Données de l'œuvre
        db: Session de base de données
        current_user: Utilisateur actuel (admin)
    
    Returns:
        L'œuvre créée
    
    Raises:
        HTTPException: Si l'artiste n'existe pas
    """
    # Vérification de l'artiste
    artist = db.query(Artist).filter(Artist.id == artwork_data.artist_id).first()
    if not artist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Artiste non trouvé"
        )
    
    # Création de l'œuvre
    artwork = Artwork(**artwork_data.dict())
    db.add(artwork)
    db.commit()
    db.refresh(artwork)
    
    return artwork

@router.get("/artworks", response_model=List[ArtworkResponse])
async def list_artworks(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    db: Session = Depends(deps.get_db)
):
    """Liste les œuvres avec pagination et filtres."""
    query = db.query(Artwork)
    
    if category:
        query = query.filter(Artwork.category == category)
    
    artworks = query.offset(skip).limit(limit).all()
    return artworks
```

**Conventions Backend:**
- Modules en snake_case: `artwork_service.py`
- Classes en PascalCase: `ArtworkService`
- Fonctions en snake_case: `create_artwork()`
- Docstrings Google style
- Type hints obligatoires
- Tests avec pytest

### 6.2 Git Workflow

**Branches:**
- `main` - Production stable
- `develop` - Développement intégré
- `feature/nom-feature` - Nouvelles fonctionnalités
- `bugfix/nom-bug` - Corrections de bugs
- `hotfix/nom-hotfix` - Corrections urgentes

**Commits:**
```bash
# Format de message de commit
<type>(<scope>): <subject>

# Types:
# feat: Nouvelle fonctionnalité
# fix: Correction de bug
# docs: Documentation
# style: Formatage
# refactor: Refactorisation
# test: Tests
# chore: Maintenance

# Exemples:
git commit -m "feat(guide): ajout de la navigation guidée"
git commit -m "fix(3d): correction du chargement des modèles"
git commit -m "docs(api): mise à jour de la documentation OpenAPI"
```

### 6.3 Tests

#### Tests Frontend (Jest)
```javascript
// frontend/src/components/__tests__/ArtworkDisplay.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import ArtworkDisplay from '../ArtworkDisplay';
import * as museumService from '@/services/museumService';

jest.mock('@/services/museumService');

describe('ArtworkDisplay', () => {
  const mockArtwork = {
    id: '1',
    title: 'La Joconde',
    artist: 'Léonard de Vinci',
    imageUrl: '/images/joconde.jpg'
  };

  it('affiche un loader pendant le chargement', () => {
    museumService.fetchArtwork.mockResolvedValue(mockArtwork);
    render(<ArtworkDisplay artworkId="1" />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('affiche les données de l\'œuvre après chargement', async () => {
    museumService.fetchArtwork.mockResolvedValue(mockArtwork);
    render(<ArtworkDisplay artworkId="1" />);
    
    await waitFor(() => {
      expect(screen.getByText('La Joconde')).toBeInTheDocument();
      expect(screen.getByText('Léonard de Vinci')).toBeInTheDocument();
    });
  });

  it('gère les erreurs de chargement', async () => {
    museumService.fetchArtwork.mockRejectedValue(new Error('Erreur réseau'));
    render(<ArtworkDisplay artworkId="1" />);
    
    await waitFor(() => {
      expect(screen.getByText(/erreur/i)).toBeInTheDocument();
    });
  });
});
```

#### Tests Backend (Pytest)
```python
# backend/app/tests/test_artworks.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.models.artwork import Artwork
from app.tests.utils import create_test_user, get_admin_token

client = TestClient(app)

def test_create_artwork_success(db: Session):
    """Test de création d'œuvre réussie"""
    admin_token = get_admin_token(db)
    artwork_data = {
        "title": "Test Artwork",
        "artist_id": 1,
        "year": 2024,
        "category": "painting"
    }
    
    response = client.post(
        "/api/v1/artworks",
        json=artwork_data,
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Artwork"
    assert "id" in data

def test_create_artwork_unauthorized(db: Session):
    """Test de création sans authentification"""
    artwork_data = {"title": "Test", "artist_id": 1}
    
    response = client.post("/api/v1/artworks", json=artwork_data)
    
    assert response.status_code == 401

def test_list_artworks_with_filter(db: Session):
    """Test de listing avec filtres"""
    response = client.get("/api/v1/artworks?category=painting&limit=10")
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert all(artwork["category"] == "painting" for artwork in data)

@pytest.mark.asyncio
async def test_artwork_embedding_generation(db: Session):
    """Test de génération d'embeddings"""
    from app.services.embedding_service import generate_artwork_embedding
    
    artwork = Artwork(
        title="La Joconde",
        description="Portrait célèbre de la Renaissance"
    )
    
    embedding = await generate_artwork_embedding(artwork)
    
    assert embedding is not None
    assert len(embedding) == 1536  # Dimension OpenAI embeddings
```

### 6.4 Documentation API

La documentation API est automatiquement générée par FastAPI et accessible à `/docs` (Swagger UI) et `/redoc` (ReDoc).

**Exemple de documentation d'endpoint:**
```python
@router.post(
    "/guide/ask",
    response_model=GuideResponse,
    summary="Poser une question au guide",
    description="""
    Permet à un visiteur de poser une question au guide IA.
    
    Le guide utilise le contexte de la visite actuelle (position, œuvre,
    historique) pour fournir une réponse pertinente.
    
    **Paramètres:**
    - question: La question du visiteur
    - context: Contexte optionnel supplémentaire
    
    **Retour:**
    - Réponse du guide avec sources et suggestions
    
    **Exemple:**
    ```json
    {
      "question": "Qui a peint La Joconde ?",
      "context": {"artwork_id": "123"}
    }
    ```
    """,
    tags=["Guide IA"],
    responses={
        200: {"description": "Réponse du guide"},
        401: {"description": "Non authentifié"},
        429: {"description": "Trop de requêtes"}
    }
)
async def ask_guide(question: GuideQuestion, ...):
    ...
```

---

## 7. Déploiement en Production

### 7.1 Checklist Pré-Déploiement

- [ ] Tous les tests passent (frontend + backend)
- [ ] Coverage de tests > 80%
- [ ] Audit de sécurité effectué
- [ ] Variables d'environnement de production configurées
- [ ] Certificats SSL configurés
- [ ] Backup automatique configuré
- [ ] Monitoring et alertes configurés
- [ ] Documentation à jour
- [ ] Plan de rollback préparé
- [ ] Load testing effectué

### 7.2 Infrastructure AWS (Exemple)

```hcl
# infrastructure/terraform/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
resource "aws_vpc" "museum_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "museum-vpc"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "museum_cluster" {
  name = "museum-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "museum_db" {
  identifier        = "museum-postgres"
  engine            = "postgres"
  engine_version    = "15.3"
  instance_class    = "db.t3.medium"
  allocated_storage = 100

  db_name  = "virtual_museum"
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.museum_db_subnet.name

  backup_retention_period = 7
  skip_final_snapshot     = false
  final_snapshot_identifier = "museum-db-final-snapshot"

  tags = {
    Name = "museum-database"
  }
}

# S3 Bucket pour assets
resource "aws_s3_bucket" "museum_assets" {
  bucket = "museum-assets-${var.environment}"

  tags = {
    Name = "museum-assets"
  }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "museum_cdn" {
  origin {
    domain_name = aws_s3_bucket.museum_assets.bucket_regional_domain_name
    origin_id   = "S3-museum-assets"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-museum-assets"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```

### 7.3 CI/CD avec GitHub Actions

```yaml
# .github/workflows/cd.yml
name: CD - Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push Backend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: museum-backend
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd backend
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Build and push Frontend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: museum-frontend
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd frontend
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster museum-cluster \
            --service museum-backend \
            --force-new-deployment
          
          aws ecs update-service \
            --cluster museum-cluster \
            --service museum-frontend \
            --force-new-deployment
      
      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Déploiement en production terminé !'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

---

## 8. Maintenance et Évolution

### 8.1 Monitoring

**Métriques à surveiller:**
- Temps de réponse API (< 200ms)
- Taux d'erreur (< 1%)
- Utilisation CPU/RAM
- Taux de disponibilité (> 99.9%)
- Nombre de visiteurs simultanés
- Temps de chargement 3D (< 5s)

**Outils:**
- Prometheus + Grafana pour métriques
- Sentry pour erreurs
- ELK Stack pour logs
- Uptime Robot pour monitoring externe

### 8.2 Plan de Backup

```bash
# Script de backup quotidien
#!/bin/bash

# Backup PostgreSQL
pg_dump -h $DB_HOST -U $DB_USER -d virtual_museum \
  | gzip > backup_$(date +%Y%m%d).sql.gz

# Upload vers S3
aws s3 cp backup_$(date +%Y%m%d).sql.gz \
  s3://museum-backups/database/

# Backup des assets 3D (sync incrémental)
aws s3 sync /data/museum-assets \
  s3://museum-backups/assets/ \
  --storage-class GLACIER

# Nettoyage des backups > 30 jours
find /backups -name "backup_*.sql.gz" -mtime +30 -delete
```

### 8.3 Roadmap Future

**Version 2.0 (Q2 2025)**
- Support VR/AR natif (WebXR)
- Mode collaboratif avancé (whiteboard, annotations)
- Recommandations IA personnalisées
- Expositions temporaires dynamiques

**Version 3.0 (Q4 2025)**
- Support multi-musées (plateforme)
- Marketplace de contenus 3D
- API publique pour développeurs
- Mobile apps natives (iOS/Android)

---

## Conclusion

Ce document fournit une base complète pour concevoir et développer un musée virtuel avec guide IA conversationnel. 

**Points clés:**
- Stack moderne et scalable (React + Python)
- Architecture microservices avec Docker
- IA conversationnelle avancée avec RAG
- Processus de développement structuré
- Infrastructure production-ready

**Prochaines étapes:**
1. Valider les spécifications avec les parties prenantes
2. Constituer l'équipe de développement
3. Lancer la phase de conception détaillée
4. Démarrer le développement par MVP (Minimum Viable Product)

Pour toute question ou précision, n'hésitez pas !