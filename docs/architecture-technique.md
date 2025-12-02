# Architecture Technique Globale

## Vue d'ensemble du système

Le système est composé de 4 couches principales :

### A. Interface d'Administration (Web Application)

- Application web responsive
- Rôle: configuration, supervision et gestion du robot
- Utilisateurs: personnel du musée, administrateurs système

### B. Logiciel d'Interaction & NLP (Robot Core)

- Application embarquée sur le robot
- Rôle: intelligence conversationnelle et guidage des visiteurs
- Interaction: temps réel avec les visiteurs

### C. Couche de données partagée

- Base de données centralisée PostgreSQL
- Contenu: cartographie, œuvres, trajets, logs d'activité
- Cache: Redis pour données temps réel

### D. Système robotique (Hardware)

- Plateforme mobile avec capteurs
- Microphones, haut-parleurs, écran tactile
- Système de navigation (LIDAR, caméras, odométrie)

## Schéma d'architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│ INTERFACE ADMIN (Web) │
│ - Dashboard - Trajets - Cartographie │
└──────────────────────┬──────────────────────────────────┘
│ REST API / WebSocket
┌──────────────────────┴──────────────────────────────────┐
│ BASE DE DONNÉES CENTRALE (PostgreSQL) │
│ - Musée (carte, œuvres, zones) │
│ - Trajets programmés │
│ - Contenus narratifs │
│ - Logs d'activité │
└──────────────────────┬──────────────────────────────────┘
│ REST API / WebSocket
┌──────────────────────┴──────────────────────────────────┐
│ LOGICIEL D'INTERACTION & NLP (Robot Core) │
│ - Moteur NLP - Guidage narratif │
│ - STT/TTS - Gestion conversation │
└──────────────────────┬──────────────────────────────────┘
│ ROS2 Topics
┌──────────────────────┴──────────────────────────────────┐
│ PLATEFORME ROBOTIQUE │
│ - Navigation - Capteurs - Actionneurs │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Stack technologique

### Interface d'Administration

- **Frontend**: React.js + TailwindCSS
- **Backend**: Node.js + Express
- **Cartographie**: Leaflet.js
- **Visualisation**: Chart.js ou Recharts
- **Temps réel**: Socket.IO

### Logiciel d'Interaction & NLP

- **Framework robot**: ROS2
- **NLP/LLM**: Claude 3.5 Sonnet (Anthropic API)
- **STT**: OpenAI Whisper
- **TTS**: Google TTS ou ElevenLabs
- **Langage**: Python (IA) + C++ (ROS)

### Base de données

- **Principale**: PostgreSQL
- **Cache**: Redis
- **Fichiers**: S3-compatible ou local

### Communication

- **API**: REST (JSON)
- **Temps réel**: WebSocket
- **Robot**: ROS2 DDS / MQTT

## Infrastructure

### Option retenue: Cloud hybride

- Admin et base de données: cloud (AWS/GCP/Azure)
- Robot core: embarqué avec cache local
- Synchronisation périodique + fonctionnement offline possible

### Réseau

- WiFi musée robuste
- 4G/5G backup pour le robot
- VPN sécurisé pour accès admin distant

## Contraintes techniques

### Performance

- Latence NLP: < 2 secondes
- Latence STT: < 1 seconde
- Chargement admin: < 3 secondes
- Position robot: 10 Hz minimum

### Fiabilité

- Disponibilité: 99% pendant heures ouverture
- Mode dégradé avec cache local
- Reprise automatique sur erreur

### Sécurité

- HTTPS/TLS pour toutes communications
- Authentification multi-facteurs
- Anonymisation données visiteurs (RGPD)
- Déploiement sécurisé OTA

### Scalabilité

- Support 1-5 robots
- 10k+ œuvres, 100k+ interactions/mois
- 3-5 langues (Phase 1: français uniquement)

## Voir aussi

- [Interface d'Administration](./admin-interface/)
- [Module NLP](./nlp-module/)
- [Base de données](./database-schema.md)
