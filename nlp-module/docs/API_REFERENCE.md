# Musia NLP Module — Référence API

> **Swagger UI interactif disponible sur [`/docs`](http://localhost:8000/docs)**
> Documentation ReDoc alternative sur [`/redoc`](http://localhost:8000/redoc)

## Base URL

```
http://localhost:8000
```

---

## Sommaire

| Groupe | Endpoint | Méthode | Description |
|---|---|---|---|
| Health | `/health` | GET | Statut des services |
| Artworks | `/artworks` | GET | Liste des œuvres |
| Artworks | `/artworks/{id}` | GET | Détail d'une œuvre |
| Artworks | `/artworks/{id}/narrative` | GET | Narration TTS |
| Trajectories | `/trajectories` | GET | Liste des parcours |
| Trajectories | `/trajectories/{id}` | GET | Détail d'un parcours |
| Trajectories | `/trajectories/{id}/preload` | GET | Préchargement audio |
| Trajectories | `/trajectories/{id}/start` | POST | Démarrer une visite |
| Conversation | `/conversation/start` | POST | Créer une session |
| Conversation | `/conversation/ask` | POST | Question audio |
| Conversation | `/conversation/text` | POST | Question texte |
| Conversation | `/conversation/{id}/history` | GET | Historique |
| Audio | `/audio/{filename}` | GET | Fichier MP3 |
| Voices | `/voices` | GET | Voix TTS dispo |
| Testing | `/test/tts` | POST | Test TTS |
| Testing | `/test/stt` | POST | Test STT |

---

## Health

### `GET /health`

Retourne l'état détaillé de tous les services et dépendances.

**Réponse 200 :**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-26T12:00:00",
  "services": {
    "stt": { "status": "ready", "model": "small" },
    "tts": { "status": "ready", "engine": "edge-tts" },
    "nlp": { "status": "ready", "model": "sentence-transformers" },
    "llm": { "status": "ready", "provider": "groq" },
    "knowledge_base": { "status": "ready", "artworks_cached": 42 }
  },
  "dependencies": {
    "redis": { "status": "connected", "mode": "persistent" },
    "rate_limiter": { "status": "active" }
  }
}
```

**Valeurs de statut :**
- `healthy` — tous les services sont opérationnels  
- `degraded` — Redis indisponible (fallback mémoire actif)  
- `error` — service critique en échec  

---

## Artworks

### `GET /artworks`

Retourne la liste complète des œuvres d'art.

**Réponse 200 :**
```json
[
  {
    "id": "clx123abc",
    "title": "La Joconde",
    "artist": "Léonard de Vinci",
    "year": "1503-1519",
    "description": "Portrait à l'huile sur panneau de bois de peuplier."
  }
]
```

---

### `GET /artworks/{artwork_id}`

Retourne les informations d'une œuvre spécifique.

**Paramètres :**
| Nom | Type | Description |
|---|---|---|
| `artwork_id` | string (path) | Identifiant unique de l'œuvre |

**Réponses :**
- `200` — œuvre trouvée
- `404` — œuvre introuvable

---

### `GET /artworks/{artwork_id}/narrative`

Génère la narration textuelle et audio d'une œuvre.

**Paramètres :**
| Nom | Type | Valeurs | Défaut |
|---|---|---|---|
| `artwork_id` | string (path) | — | — |
| `type` | string (query) | `short`, `standard`, `detailed`, `kids` | `short` |

**Réponse 200 :**
```json
{
  "text": "La Joconde, peinte par Léonard de Vinci entre 1503 et 1519...",
  "audio_url": "/audio/f3a8b2c1d4e5.mp3"
}
```

---

## Trajectories

### `GET /trajectories`

Liste tous les parcours guidés disponibles.

---

### `GET /trajectories/{trajectory_id}`

Retourne les détails d'un parcours (étapes, œuvres, narrations).

---

### `GET /trajectories/{trajectory_id}/preload`

Précharge toutes les données d'un parcours. Génère en avance les audios TTS.  
À appeler avant de démarrer une visite pour optimiser les performances.

---

### `POST /trajectories/{trajectory_id}/start`

Démarre une visite guidée. Crée une session et retourne la première étape avec audio.

**Réponse 200 :**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "trajectory": { "id": "clx456", "name": "Maîtres de la Renaissance" },
  "current_step": 1,
  "total_steps": 8,
  "artwork": { "id": "clx123", "title": "La Joconde" },
  "narrative_text": "Bienvenue devant La Joconde...",
  "audio_url": "/audio/f3a8b2c1.mp3"
}
```

---

## Conversation

### Flux typique

```
POST /conversation/start  →  session_id
        ↓
POST /conversation/text (ou /ask)  →  réponse + audio_url
        ↓
GET  /conversation/{session_id}/history
```

---

### `POST /conversation/start`

Crée une nouvelle session de conversation.

**Corps de la requête :**
```json
{
  "artworkId": "clx123abc",
  "trajectoryId": null
}
```
> Les deux champs sont optionnels. Sans `artworkId`, le bot envoie un message d'accueil générique.

**Réponse 200 :**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Bonjour ! Je suis votre guide personnel...",
  "audio_url": "/audio/welcome_abc123.mp3"
}
```

---

### `POST /conversation/ask`

Pose une question audio. Pipeline : STT → NLP → LLM → TTS.

**Format :** `multipart/form-data`

| Champ | Type | Description |
|---|---|---|
| `session_id` | string (form) | UUID de session (requis) |
| `audio_file` | file (form) | Fichier audio MP3/WAV/M4A/OGG (max 10 Mo) |

**Réponse 200 :**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_input": "Qui a peint cette œuvre ?",
  "intent": "factual",
  "response": "Cette œuvre a été peinte par Léonard de Vinci vers 1503.",
  "audio_url": "/audio/response_abc123.mp3",
  "confidence": 0.94
}
```

**Intentions possibles :** `factual`, `temporal`, `technical`, `contextual`, `comparative`, `personal`, `navigation`, `general`

---

### `POST /conversation/text`

Version texte du chatbot (pour tests sans audio).

**Corps de la requête :**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Quelle technique a été utilisée ?"
}
```

**Réponse 200 :**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_input": "Quelle technique a été utilisée ?",
  "intent": "technical",
  "response": "La sfumatura est la technique emblématique de Léonard de Vinci.",
  "audio_url": "/audio/response_def456.mp3"
}
```

---

### `GET /conversation/{session_id}/history`

Retourne l'historique complet d'une session.

**Réponse 200 :**
```json
[
  { "user": "Qui a peint ?", "bot": "Léonard de Vinci", "intent": "factual" },
  { "user": "En quelle année ?", "bot": "Vers 1503", "intent": "temporal" }
]
```

---

## Audio

### `GET /audio/{filename}`

Sert un fichier audio MP3 généré par le TTS.

**Sécurité :** protection path traversal, validation extension `.mp3`, restriction au répertoire `data/tts_cache/`.

**Réponses :**
- `200` — `audio/mpeg` (fichier MP3)
- `400` — extension ou nom invalide
- `403` — accès refusé (path traversal)
- `404` — fichier introuvable

---

## Voices

### `GET /voices`

Liste les voix Edge TTS françaises disponibles.

**Réponse 200 :**
```json
[
  { "name": "fr-FR-DeniseNeural", "locale": "fr-FR", "gender": "Female" },
  { "name": "fr-FR-HenriNeural",  "locale": "fr-FR", "gender": "Male" },
  { "name": "fr-CA-SylvieNeural", "locale": "fr-CA", "gender": "Female" },
  { "name": "fr-CA-JeanNeural",   "locale": "fr-CA", "gender": "Male" }
]
```

---

## Testing

### `POST /test/tts`

Synthétise un texte en audio sans session.

**Paramètre query :** `text` (string) — texte à synthétiser

**Réponse 200 :**
```json
{ "text": "Bonjour !", "audio_url": "/audio/test_abc.mp3" }
```

---

### `POST /test/stt`

Transcrit un fichier audio en texte sans session.

**Format :** `multipart/form-data`, champ `audio` (fichier MP3/WAV/M4A/OGG)

**Réponse 200 :**
```json
{ "text": "Qui a peint cette œuvre ?", "confidence": 0.92, "language": "fr" }
```

---

## Socket.IO

L'API expose également un serveur Socket.IO pour les interactions temps réel du robot.

| Événement | Direction | Description |
|---|---|---|
| `connect` | client → serveur | Connexion établie |
| `disconnect` | client → serveur | Déconnexion |
| `chat_message` | client → serveur | Message texte du visiteur |
| `chat_response` | serveur → client | Réponse du chatbot |
| `waypoint_reached` | client → serveur | Robot arrive à un waypoint |
| `robot_speech` | serveur → client | Audio + texte de présentation d'œuvre |
| `error` | serveur → client | Erreur de traitement |

### Exemple `waypoint_reached`

```json
{
  "waypoint_index": 1,
  "artwork_id": "clx123",
  "artwork_name": "La Joconde",
  "artist": "Léonard de Vinci"
}
```

### Réponse `robot_speech`

```json
{
  "type": "robot_speech",
  "text": "Nous voici devant La Joconde, une œuvre magnifique de Léonard de Vinci.",
  "audio_base64": "<base64-encoded-mp3>",
  "waypoint_index": 1,
  "session_id": "abc123"
}
```

---

## Codes d'erreur

| Code | Signification |
|---|---|
| `400` | Requête invalide (paramètre manquant, format incorrect) |
| `403` | Accès refusé (path traversal détecté) |
| `404` | Ressource introuvable (session, œuvre, fichier audio) |
| `429` | Trop de requêtes (rate limit : 10 req/min) |
| `500` | Erreur serveur interne |
