# Cahier des Charges - Robot Guide-Assistant Musée

## Vue d'ensemble

Ce document présente la conception complète du système logiciel pour un robot guide-assistant dans les musées, divisé en deux modules principaux :

1. **Interface d'Administration** - Gestion et supervision du robot
2. **Logiciel d'Interaction & NLP** - Intelligence conversationnelle et guidage

## Documentation

- [Architecture Technique](./architecture-technique.md)
- [Interface d'Administration](./admin-interface/)
- [Module NLP et Interaction](./nlp-module/)
- [Intégration des Modules](./integration.md)
- [Planning de Développement](./planning.md)

## Décisions techniques clés

### Infrastructure

- ✅ Hébergement cloud
- ✅ NLP via APIs externes (Claude, Whisper, TTS)
- ✅ 1 robot pour cette phase
- ✅ Français comme langue initiale

### Stack technologique

**Frontend (Interface Admin)**

- React.js + TailwindCSS
- Leaflet.js pour cartographie
- Socket.IO pour temps réel

**Backend**

- Node.js + Express
- PostgreSQL + Redis
- WebSocket pour communication temps réel

**NLP & IA**

- STT: OpenAI Whisper
- LLM: Claude 3.5 Sonnet (Anthropic)
- TTS: Google TTS ou ElevenLabs

**Robot**

- ROS2 pour navigation
- Python pour intégration IA

## Liens rapides

- [Guide de développement](./admin-interface/development-setup.md)
- [Structure base de données](./database-schema.md)
- [API Documentation](./api-documentation.md)
