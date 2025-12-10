# 🔧 Architecture API Backend - Interface Admin

**Version**: 1.1 (**Audio Chatbot Focus**)
**Date**: 2024-12-10
**Objectif**: Spécification complète de l'API REST pour l'interface d'administration, orientée vers une solution **Audio Chatbot**.

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture générale](#architecture-générale)
3. [Endpoints par module](#endpoints-par-module)
4. [Services backend](#services-backend)
5. [DTOs et validations](#dtos-et-validations)
6. [Middlewares](#middlewares)
7. [WebSocket events](#websocket-events)
8. [Sécurité](#sécurité)

---

## 1. Vue d'ensemble

> **Note**: Suite à l'indisponibilité du robot physique, cette spécification est priorisée pour le développement d'un **Chatbot Audio**. Les services critiques sont ceux liés à la voix (narratifs), à la connaissance (œuvres) et au feedback (analytics).

### Stack technique

- **Framework**: Express.js (Node.js)
- **ORM**: Prisma
- **Validation**: Zod
- **Auth**: JWT (access + refresh tokens)
- **Temps réel**: Socket.IO
- **Upload**: Multer
- **Exports**: ExcelJS, PDFKit

### Principes de conception

- ✅ RESTful API
- ✅ Validation stricte des entrées
- ✅ Gestion d'erreurs centralisée
- ✅ Pagination sur toutes les listes
- ✅ Filtres et recherche
- ✅ RBAC (Role-Based Access Control)

---

## 2. Architecture générale

### Structure des réponses

**Succès** :

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-12-09T19:00:00Z",
    "requestId": "req_abc123"
  }
}
```

**Erreur** :

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-12-09T19:00:00Z",
    "requestId": "req_abc123"
  }
}
```

### Pagination standard

**Query params** :

```
?page=1&limit=20&sort=createdAt&order=desc
```

**Réponse** :

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 248,
    "totalPages": 13,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 3. Endpoints par module

### 3.1 Authentification (`/api/auth`)

#### POST `/api/auth/login`

**Description**: Connexion utilisateur  
**Body**:

```json
{
  "email": "admin@musee.fr",
  "password": "SecurePass123!"
}
```

**Réponse**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clgh...",
      "email": "admin@musee.fr",
      "name": "Marie Dupont",
      "role": "admin"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Service**: `AuthService.login()`

---

#### POST `/api/auth/refresh`

**Description**: Rafraîchir access token  
**Body**:

```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Service**: `AuthService.refreshToken()`

---

#### POST `/api/auth/logout`

**Description**: Déconnexion  
**Headers**: `Authorization: Bearer {token}`  
**Service**: `AuthService.logout()`

---

#### POST `/api/auth/forgot-password`

**Description**: Demande réinitialisation mot de passe  
**Body**:

```json
{
  "email": "admin@musee.fr"
}
```

**Service**: `AuthService.sendResetEmail()`

---

#### POST `/api/auth/reset-password`

**Description**: Réinitialiser mot de passe  
**Body**:

```json
{
  "token": "reset_token_abc",
  "newPassword": "NewSecurePass123!"
}
```

**Service**: `AuthService.resetPassword()`

---

### 3.2 Contenus Narratifs (`/api/artworks/:artworkId/narratives`)

> **Priorité Haute**: C'est le cœur de l'expérience audio.

#### GET `/api/artworks/:artworkId/narratives`

**Description**: Liste des contenus narratifs d'une œuvre  
**Service**: `NarrativeService.findByArtwork(artworkId)`

---

#### POST `/api/artworks/:artworkId/narratives`

**Description**: Ajouter un contenu narratif  
**Body**:

```json
{
  "version": "detailed",
  "language": "fr",
  "textContent": "Présentation détaillée...",
  "duration": 300
}
```

**Service**: `NarrativeService.create(artworkId, data)`

---

#### PUT `/api/narratives/:id`

**Description**: Modifier un contenu narratif  
**Service**: `NarrativeService.update(id, data)`

---

#### POST `/api/narratives/:id/audio`

**Description**: Upload fichier audio  
**Content-Type**: `multipart/form-data`  
**Service**: `NarrativeService.uploadAudio(id, file)`

---

### 3.3 Œuvres (`/api/artworks`)

> **Priorité Haute**: Base de connaissance du chatbot.

#### GET `/api/artworks`

**Description**: Liste des œuvres avec pagination et filtres  
**Query params**:

```
?page=1
&limit=20
&search=joconde
&collection=permanent
&period=renaissance
&room=salle-6
&sort=title
&order=asc
```

**Réponse**:

```json
{
  "success": true,
  "data": [
    {
      "id": "clgh...",
      "code": "ART-2024-001",
      "title": "La Joconde",
      "artist": "Léonard de Vinci",
      "year": "1503-1519",
      "period": "Renaissance",
      "collection": "Permanent",
      "room": "Salle 6",
      "imageUrl": "https://...",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

**Service**: `ArtworkService.findAll(filters, pagination)`

---

#### GET `/api/artworks/:id`

**Description**: Détails d'une œuvre  
**Réponse**:

```json
{
  "success": true,
  "data": {
    "id": "clgh...",
    "code": "ART-2024-001",
    "title": "La Joconde",
    "artist": "Léonard de Vinci",
    "year": "1503-1519",
    "description": "Portrait de Lisa Gherardini...",
    "period": "Renaissance",
    "style": "Haute Renaissance",
    "technique": "Huile sur bois",
    "dimensions": "77 × 53 cm",
    "collection": "Permanent",
    "positionX": 125.5,
    "positionY": 78.2,
    "floor": 1,
    "room": "Salle 6",
    "orientation": 90,
    "imageUrl": "https://...",
    "narrativeContents": [
      {
        "id": "clgh...",
        "version": "standard",
        "language": "fr",
        "textContent": "Nous voici devant...",
        "audioUrl": "https://...",
        "duration": 120
      }
    ],
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

**Service**: `ArtworkService.findById(id)`

---

#### POST `/api/artworks`

**Description**: Créer une œuvre  
**Auth**: Admin, Manager  
**Body**:

```json
{
  "code": "ART-2024-002",
  "title": "Le Radeau de la Méduse",
  "artist": "Théodore Géricault",
  "year": "1818-1819",
  "description": "...",
  "period": "Romantisme",
  "style": "Romantisme français",
  "technique": "Huile sur toile",
  "dimensions": "491 × 716 cm",
  "collection": "Permanent",
  "positionX": 150.0,
  "positionY": 200.0,
  "floor": 1,
  "room": "Salle 77"
}
```

**Service**: `ArtworkService.create(data)`

---

#### PUT `/api/artworks/:id`

**Description**: Modifier une œuvre  
**Auth**: Admin, Manager  
**Service**: `ArtworkService.update(id, data)`

---

#### DELETE `/api/artworks/:id`

**Description**: Supprimer une œuvre  
**Auth**: Admin  
**Service**: `ArtworkService.delete(id)`

---

#### POST `/api/artworks/:id/image`

**Description**: Upload image d'une œuvre  
**Auth**: Admin, Manager  
**Content-Type**: `multipart/form-data`  
**Body**: `file` (image)  
**Service**: `ArtworkService.uploadImage(id, file)`

---

### 3.4 Analytics & Rapports (`/api/analytics`)

> **Priorité Moyenne/Haute**: Essentiel pour monitorer les interactions du chatbot.

#### GET `/api/analytics/dashboard`

**Description**: Données dashboard temps réel  
**Réponse**:

```json
{
  "success": true,
  "data": {
    "robotStatus": {
      "status": "active", // formerly "in_visit"
      "battery": 82, // May be virtual
      "position": { "x": 125.5, "y": 78.2 },
      "currentSession": {
        "id": "clgh...",
        "trajectory": "Renaissance Italienne",
        "visitorsCount": 8, // Listeners count
        "timeRemaining": 28
      }
    },
    "todayStats": {
      "visits": 12,
      "visitors": 87,
      "interactions": 124,
      "activeTime": 384
    },
    "weeklyVisits": [
      { "date": "2024-12-02", "count": 10 },
      { "date": "2024-12-03", "count": 15 }
    ],
    "recentInteractions": [
      {
        "timestamp": "2024-12-09T14:32:00Z",
        "questionText": "Qui a peint cette œuvre ?",
        "responseSource": "faq"
      }
    ]
  }
}
```

**Service**: `AnalyticsService.getDashboard()`

---

#### GET `/api/analytics/reports`

**Description**: Rapport personnalisé  
**Query params**: `?startDate=2024-12-01&endDate=2024-12-31&type=monthly`  
**Service**: `AnalyticsService.generateReport(params)`

---

#### GET `/api/analytics/export`

**Description**: Export rapport  
**Query params**: `?format=pdf&startDate=2024-12-01&endDate=2024-12-31`  
**Réponse**: Fichier PDF/Excel/CSV  
**Service**: `AnalyticsService.exportReport(params)`

---

#### GET `/api/analytics/top-artworks`

**Description**: Œuvres les plus vues / demandées  
**Query params**: `?period=month&limit=10`  
**Service**: `AnalyticsService.getTopArtworks(params)`

---

#### GET `/api/analytics/top-trajectories`

**Description**: Parcours les plus suivis  
**Service**: `AnalyticsService.getTopTrajectories(params)`

---

#### GET `/api/analytics/frequent-questions`

**Description**: Questions fréquentes posées au chatbot  
**Service**: `AnalyticsService.getFrequentQuestions(params)`

---

### 3.5 Trajets (`/api/trajectories`)

> **Priorité Moyenne**: Peut servir de "Playlists" ou "Parcours Virtuels".

#### GET `/api/trajectories`

**Description**: Liste des trajets  
**Query params**: `?active=true&theme=renaissance`  
**Réponse**:

```json
{
  "success": true,
  "data": [
    {
      "id": "clgh...",
      "name": "Renaissance Italienne",
      "description": "Découverte des maîtres...",
      "theme": "Renaissance",
      "estimatedDuration": 45,
      "difficultyLevel": "all",
      "maxVisitors": 15,
      "isActive": true,
      "isDefault": false,
      "stepsCount": 8,
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ]
}
```

**Service**: `TrajectoryService.findAll(filters)`

---

#### GET `/api/trajectories/:id`

**Description**: Détails d'un trajet avec étapes  
**Réponse**:

```json
{
  "success": true,
  "data": {
    "id": "clgh...",
    "name": "Renaissance Italienne",
    "description": "...",
    "theme": "Renaissance",
    "estimatedDuration": 45,
    "difficultyLevel": "all",
    "maxVisitors": 15,
    "isActive": true,
    "isDefault": false,
    "steps": [
      {
        "id": "clgh...",
        "stepOrder": 1,
        "stopDuration": 5,
        "positionX": 125.5, // Moins pertinent pour l'audio pur
        "positionY": 78.2,
        "artwork": {
          "id": "clgh...",
          "title": "La Joconde",
          "imageUrl": "..."
        },
        "narrativeContent": {
          "id": "clgh...",
          "version": "detailed"
        }
      }
    ],
    "totalDistance": 285,
    "totalDuration": 57
  }
}
```

**Service**: `TrajectoryService.findById(id)`

---

#### POST `/api/trajectories`

**Description**: Créer un trajet  
**Body**:

```json
{
  "name": "Art Moderne",
  "description": "...",
  "theme": "Modernisme",
  "estimatedDuration": 60,
  "difficultyLevel": "all",
  "maxVisitors": 10,
  "steps": [
    {
      "artworkId": "clgh...",
      "narrativeContentId": "clgh...",
      "stepOrder": 1,
      "stopDuration": 5,
      "positionX": 100.0,
      "positionY": 150.0
    }
  ]
}
```

**Service**: `TrajectoryService.create(data)`

---

#### PUT `/api/trajectories/:id`

**Description**: Modifier un trajet  
**Service**: `TrajectoryService.update(id, data)`

---

#### DELETE `/api/trajectories/:id`

**Description**: Supprimer un trajet  
**Service**: `TrajectoryService.delete(id)`

---

#### POST `/api/trajectories/:id/validate`

**Description**: Valider faisabilité d'un trajet  
**Service**: `TrajectoryService.validate(id)`

---

#### POST `/api/trajectories/:id/duplicate`

**Description**: Dupliquer un trajet  
**Service**: `TrajectoryService.duplicate(id)`

---

### 3.6 Cartographie (`/api/maps`)

> **Priorité Basse**: Utile pour le contexte, mais pas pour la navigation active.

#### GET `/api/maps`

**Description**: Liste des cartes  
**Service**: `MapService.findAll()`

---

#### GET `/api/maps/active`

**Description**: Carte active actuelle  
**Service**: `MapService.getActive()`

---

#### POST `/api/maps`

**Description**: Créer une nouvelle carte  
**Body**:

```json
{
  "version": "v2.0",
  "mapData": {
    "width": 1000,
    "height": 800,
    "resolution": 0.05,
    "occupancyGrid": [...]
  },
  "scale": 1.0
}
```

**Service**: `MapService.create(data)`

---

#### PUT `/api/maps/:id/activate`

**Description**: Activer une carte  
**Service**: `MapService.activate(id)`

---

#### POST `/api/maps/upload`

**Description**: Upload plan musée (image)  
**Content-Type**: `multipart/form-data`  
**Service**: `MapService.uploadPlan(file)`

---

### 3.7 Zones (`/api/maps/:mapId/zones`)

> **Priorité Basse**: Gestion des zones physiques.

#### GET `/api/maps/:mapId/zones`

**Description**: Liste des zones d'une carte  
**Service**: `ZoneService.findByMap(mapId)`

---

#### POST `/api/maps/:mapId/zones`

**Description**: Créer une zone  
**Body**:

```json
{
  "name": "Réserve sud",
  "type": "forbidden",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[100, 100], [200, 100], ...]]
  },
  "accessRules": {
    "allowedHours": ["09:00-18:00"]
  }
}
```

**Service**: `ZoneService.create(mapId, data)`

---

#### PUT `/api/zones/:id`

**Description**: Modifier une zone  
**Service**: `ZoneService.update(id, data)`

---

#### DELETE `/api/zones/:id`

**Description**: Supprimer une zone  
**Service**: `ZoneService.delete(id)`

---

### 3.8 Programmation (`/api/schedule`)

> **Priorité Très Basse**: L'aspect "rendez-vous" physique est moins critique.

#### GET `/api/schedule`

**Description**: Visites programmées  
**Query params**: `?date=2024-12-09&status=scheduled`  
**Réponse**:

```json
{
  "success": true,
  "data": [
    {
      "id": "clgh...",
      "trajectory": {
        "id": "clgh...",
        "name": "Renaissance Italienne"
      },
      "scheduledDate": "2024-12-09",
      "startTime": "14:00:00",
      "status": "scheduled",
      "recurrenceRule": "FREQ=DAILY;UNTIL=20241231"
    }
  ]
}
```

**Service**: `ScheduleService.findAll(filters)`

---

#### POST `/api/schedule`

**Description**: Programmer une visite  
**Body**:

```json
{
  "trajectoryId": "clgh...",
  "scheduledDate": "2024-12-09",
  "startTime": "14:00",
  "recurrenceRule": "FREQ=DAILY;UNTIL=20241231"
}
```

**Service**: `ScheduleService.create(data)`

---

#### PUT `/api/schedule/:id`

**Description**: Modifier une visite programmée  
**Service**: `ScheduleService.update(id, data)`

---

#### DELETE `/api/schedule/:id`

**Description**: Annuler une visite  
**Service**: `ScheduleService.cancel(id)`

---

#### POST `/api/schedule/validate`

**Description**: Valider programmation (conflits, batterie)  
**Body**:

```json
{
  "trajectoryId": "clgh...",
  "scheduledDate": "2024-12-09",
  "startTime": "14:00"
}
```

**Réponse**:

```json
{
  "success": true,
  "data": {
    "isValid": true,
    "conflicts": [],
    "warnings": [],
    "batteryCheck": {
      "sufficient": true,
      "required": 35,
      "available": 82
    }
  }
}
```

**Service**: `ScheduleService.validate(data)`

---

### 3.9 Contrôle Robot (`/api/robot`)

> **Note**: Utilisé pour simuler l'état du chatbot ou d'un "guide virtuel".

#### GET `/api/robot/status`

**Description**: État actuel du robot (ou guide virtuel)  
**Réponse**:

```json
{
  "success": true,
  "data": {
    "status": "in_visit",
    "battery": 82,
    "position": { "x": 125.5, "y": 78.2, "floor": 1 },
    "currentVisit": {
      "id": "clgh...",
      "trajectory": "Renaissance Italienne",
      "currentStep": 3,
      "totalSteps": 8
    },
    "connection": "excellent",
    "lastUpdate": "2024-12-09T14:35:00Z"
  }
}
```

**Service**: `RobotService.getStatus()`

---

#### POST `/api/robot/command`

**Description**: Envoyer commande  
**Body**:

```json
{
  "command": "pause" // "pause", "resume", "skip", "stop_speaking"
}
```

**Service**: `RobotService.sendCommand(command)`

---

#### GET `/api/robot/logs`

**Description**: Logs activité robot  
**Query params**: `?limit=50&type=all`  
**Service**: `RobotService.getLogs(params)`

---

### 3.10 Paramètres (`/api/settings`)

#### GET `/api/settings/users`

**Description**: Liste des utilisateurs  
**Auth**: Admin  
**Service**: `UserService.findAll()`

---

#### POST `/api/settings/users`

**Description**: Créer utilisateur  
**Auth**: Admin  
**Body**:

```json
{
  "email": "nouveau@musee.fr",
  "name": "Jean Martin",
  "role": "operator",
  "password": "TempPass123!"
}
```

**Service**: `UserService.create(data)`

---

#### PUT `/api/settings/users/:id`

**Description**: Modifier utilisateur  
**Auth**: Admin  
**Service**: `UserService.update(id, data)`

---

#### DELETE `/api/settings/users/:id`

**Description**: Supprimer utilisateur  
**Auth**: Admin  
**Service**: `UserService.delete(id)`

---

#### GET `/api/settings/robot-config`

**Description**: Configuration robot / chatbot  
**Réponse**:

```json
{
  "success": true,
  "data": {
    "speed": 0.8,
    "volume": 80,
    "timeoutInactivity": 30,
    "safetyDistance": 0.5
  }
}
```

**Service**: `RobotConfigService.get()`

---

#### PUT `/api/settings/robot-config`

**Description**: Mettre à jour config  
**Service**: `RobotConfigService.update(data)`

---

#### GET `/api/settings/notifications`

**Description**: Préférences notifications  
**Service**: `NotificationService.getPreferences()`

---

#### PUT `/api/settings/notifications`

**Description**: Mettre à jour préférences  
**Service**: `NotificationService.updatePreferences(data)`

---

## 4. Services backend

### Structure des services (ordre de priorité)

```typescript
// narrative.service.ts (PRIORITÉ HAUTE)
export class NarrativeService {
  async findByArtwork(artworkId) {}
  async create(artworkId, data) {}
  async update(id, data) {}
  async delete(id) {}
  async uploadAudio(id, file) {}
}

// artwork.service.ts
export class ArtworkService {
  async findAll(filters, pagination) {}
  async findById(id) {}
  async create(data) {}
  async update(id, data) {}
  async delete(id) {}
  async uploadImage(id, file) {}
  async search(query) {}
}

// analytics.service.ts
export class AnalyticsService {
  async getDashboard() {}
  async generateReport(params) {}
  async exportReport(params) {}
  async getTopArtworks(params) {}
  async getTopTrajectories(params) {}
  async getFrequentQuestions(params) {}
  async aggregateDailyMetrics(date) {}
}

// trajectory.service.ts
export class TrajectoryService {
  async findAll(filters) {}
  async findById(id) {}
  async create(data) {}
  async update(id, data) {}
  async delete(id) {}
  async validate(id) {}
  async duplicate(id) {}
  async calculateMetrics(id) {}
}

// map.service.ts
export class MapService {
  async findAll() {}
  async create(data) {}
  async activate(id) {}
  async uploadPlan(file) {}
}

// zone.service.ts
export class ZoneService {
  async findByMap(mapId) {}
  async create(mapId, data) {}
  async update(id, data) {}
  async delete(id) {}
}

// schedule.service.ts
export class ScheduleService {
  async findAll(filters) {}
  async create(data) {}
  async update(id, data) {}
  async cancel(id) {}
  async validate(data) {}
  async checkConflicts(date, time, duration) {}
  async checkBattery(trajectoryId) {}
}

// robot.service.ts
export class RobotService {
  async getStatus() {}
  async sendCommand(command) {}
  async getLogs(params) {}
  async updatePosition(position) {}
  async logActivity(event) {}
}

// user.service.ts
export class UserService {
  async findAll() {}
  async create(data) {}
  async update(id, data) {}
  async delete(id) {}
}
```

---

## 5. DTOs et validations

### Exemples de DTOs avec Zod

```typescript
// create-artwork.dto.ts
export const createArtworkSchema = z.object({
  code: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  artist: z.string().optional(),
  year: z.string().optional(),
  description: z.string().optional(),
  period: z.string().optional(),
  style: z.string().optional(),
  technique: z.string().optional(),
  dimensions: z.string().optional(),
  collection: z.string().optional(),
  positionX: z.number().optional(),
  positionY: z.number().optional(),
  floor: z.number().int().default(0),
  room: z.string().optional(),
  orientation: z.number().min(0).max(360).default(0),
});

// create-narrative.dto.ts
export const createNarrativeSchema = z.object({
  version: z.enum(["standard", "detailed", "kids", "expert"]),
  language: z.enum(["fr", "en", "es", "de"]),
  textContent: z.string().min(10),
  duration: z.number().int().min(1), // seconds
});

// create-trajectory.dto.ts
export const createTrajectorySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  theme: z.string().optional(),
  estimatedDuration: z.number().int().min(1),
  difficultyLevel: z.enum(["kids", "all", "expert"]).default("all"),
  maxVisitors: z.number().int().min(1).max(50).default(10),
  steps: z.array(
    z.object({
      artworkId: z.string().cuid(),
      narrativeContentId: z.string().cuid().optional(),
      stepOrder: z.number().int().min(1),
      stopDuration: z.number().int().min(1),
      positionX: z.number().optional(),
      positionY: z.number().optional(),
      notes: z.string().optional(),
    })
  ),
});

// schedule-visit.dto.ts
export const scheduleVisitSchema = z.object({
  trajectoryId: z.string().cuid(),
  scheduledDate: z.string().date(),
  startTime: z.string().time(),
  recurrenceRule: z.string().optional(),
});
```

---

## 6. Middlewares

### Auth middleware

```typescript
export const authenticate = async (req, res, next) => {
  // Vérifier JWT token
  // Attacher user à req
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    // Vérifier role utilisateur
  };
};
```

### Validation middleware

```typescript
export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          details: result.error.errors,
        },
      });
    }
    req.validatedData = result.data;
    next();
  };
};
```

### Error handler

```typescript
export const errorHandler = (err, req, res, next) => {
  logger.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: err.message,
    },
  });
};
```

---

## 7. WebSocket events

### Events émis par le serveur

```typescript
// Connexion client
socket.on("connection", (client) => {
  client.join("dashboard");
});

// État robot/chatbot (10 Hz)
io.to("dashboard").emit("robot:position", {
  x: 125.5,
  y: 78.2,
  floor: 1,
  timestamp: Date.now(),
});

io.to("dashboard").emit("robot:status", {
  status: "active",
  battery: 82,
});

// Nouvelle interaction
io.to("dashboard").emit("interaction:new", {
  questionText: "...",
  timestamp: Date.now(),
});

// Alertes
io.to("dashboard").emit("alert:battery_low", {
  level: 18,
  message: "Batterie faible",
});
```

### Events reçus du client

```typescript
socket.on("robot:command", (data) => {
  // Traiter commande
});

socket.on("subscribe:dashboard", () => {
  socket.join("dashboard");
});
```

---

## 8. Sécurité

### Authentification JWT

- Access token: 15 minutes
- Refresh token: 7 jours
- Stockage refresh token: httpOnly cookie

### RBAC (Rôles)

| Rôle         | Permissions                                   |
| ------------ | --------------------------------------------- |
| **Admin**    | Tout                                          |
| **Manager**  | CRUD œuvres, trajets, programmation, rapports |
| **Operator** | Lecture + contrôle robot / chatbot            |
| **Viewer**   | Lecture seule dashboard                       |

### Rate limiting

- 100 req/min par IP
- 1000 req/heure par utilisateur authentifié

### Validation

- Toutes les entrées validées avec Zod
- Sanitisation XSS
- Protection CSRF

---

## 📊 Résumé (Priorité Audio Chatbot)

### Endpoints totaux: **~60 endpoints**

| Module       | Endpoints | Importance |
| ------------ | --------- | ---------- |
| Auth         | 5         | Critique   |
| Narratives   | 4         | **Haute**  |
| Artworks     | 6         | **Haute**  |
| Analytics    | 6         | Moyenne    |
| Trajectories | 7         | Moyenne    |
| Maps         | 5         | Basse      |
| Zones        | 4         | Basse      |
| Schedule     | 5         | Basse      |
| Robot        | 3         | Basse      |
| Settings     | 8         | N/A        |

### Services totaux: **~12 services**

- AuthService
- NarrativeService
- ArtworkService
- AnalyticsService
- TrajectoryService
- MapService
- ZoneService
- ScheduleService
- RobotService
- UserService
- RobotConfigService
- NotificationService

---

**Prochaine étape**: Implémenter les modules prioritaires (Narratives, Artworks) dans l'API.
