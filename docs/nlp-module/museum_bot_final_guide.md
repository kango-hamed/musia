# 🤖 Museum Guide Bot - Guide Complet d'Installation

## 📋 Vue d'Ensemble

Ce guide vous permettra d'avoir un prototype fonctionnel en **3 heures** maximum.

**Stack Technique:**
- Backend: FastAPI + Python 3.10+
- STT: Faster-Whisper (gratuit, local)
- TTS: Edge-TTS (gratuit, Microsoft)
- NLP: Sentence Transformers + règles
- Base de données: SQLite

---

## 🚀 Installation Étape par Étape

### Étape 1: Prérequis Système (10 min)

#### Installer Python 3.10+
```bash
# Vérifier la version
python --version  # Doit être >= 3.10

# Si pas installé:
# Ubuntu/Debian
sudo apt update
sudo apt install python3.10 python3.10-venv python3-pip

# macOS (via Homebrew)
brew install python@3.10
```

#### Installer FFmpeg
```bash
# Ubuntu/Debian
sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Windows
# Télécharger depuis: https://ffmpeg.org/download.html
# Ajouter au PATH
```

#### Vérifier l'installation
```bash
python --version   # 3.10 ou supérieur
ffmpeg -version    # Doit afficher des infos
```

---

### Étape 2: Créer le Projet (5 min)

```bash
# Créer le dossier principal
mkdir museum-guide-bot
cd museum-guide-bot

# Créer l'environnement virtuel
python -m venv venv

# Activer l'environnement
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Vérifier activation (le prompt doit montrer (venv))
which python  # Doit pointer vers venv/bin/python
```

---

### Étape 3: Structure des Fichiers (5 min)

```bash
# Créer l'arborescence
mkdir -p backend/app/{api,services,utils}
mkdir -p data/{uploads,tts_cache}
mkdir -p frontend

# Créer les fichiers __init__.py
touch backend/app/__init__.py
touch backend/app/api/__init__.py
touch backend/app/services/__init__.py
touch backend/app/utils/__init__.py

# Créer les fichiers de configuration
touch .env
touch .gitignore
```

**Structure finale:**
```
museum-guide-bot/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── config.py
│   │   ├── api/
│   │   │   └── __init__.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── stt.py
│   │   │   ├── tts.py
│   │   │   ├── nlp.py
│   │   │   └── knowledge.py
│   │   └── utils/
│   │       └── __init__.py
│   └── run.py
├── data/
│   ├── artworks.json
│   ├── uploads/
│   └── tts_cache/
├── frontend/
│   └── index.html
├── init_db.py
├── download_models.py
├── check_installation.py
├── test_api.py
├── requirements.txt
├── .env
└── README.md
```

---

### Étape 4: Fichier requirements.txt (5 min)

Créer `requirements.txt`:
```txt
# Backend Framework
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6
websockets==12.0

# Audio Processing
faster-whisper==0.10.0
edge-tts==6.1.9
pydub==0.25.1
numpy==1.26.3

# NLP
scikit-learn==1.4.0
sentence-transformers==2.3.1
nltk==3.8.1

# Database
sqlalchemy==2.0.25
aiosqlite==0.19.0

# Utilities
python-dotenv==1.0.0
pydantic==2.5.3
pydantic-settings==2.1.0
aiofiles==23.2.1

# Dev/Test
pytest==7.4.4
pytest-asyncio==0.23.3
httpx==0.26.0
aiohttp==3.9.1
```

**Installer les dépendances:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

⏱️ **Durée:** 5-10 minutes (selon connexion Internet)

---

### Étape 5: Fichier .env (2 min)

Créer `.env`:
```bash
# Application
APP_NAME="Museum Guide Bot"
APP_VERSION="1.0.0"
DEBUG=True

# API
API_HOST=0.0.0.0
API_PORT=8000

# Database
DATABASE_URL=sqlite:///./data/museum.db

# Audio
MAX_AUDIO_LENGTH=30
AUDIO_SAMPLE_RATE=16000

# STT
WHISPER_MODEL=base
WHISPER_DEVICE=cpu
WHISPER_COMPUTE_TYPE=int8

# TTS
TTS_VOICE=fr-FR-DeniseNeural
TTS_RATE=+0%
TTS_VOLUME=+0%

# NLP
INTENT_CONFIDENCE_THRESHOLD=0.6
MAX_RESPONSE_LENGTH=300
CONVERSATION_TIMEOUT=30

# Cache
ENABLE_CACHE=True
CACHE_TTL=3600
```

---

### Étape 6: Copier le Code (20 min)

Copiez les fichiers depuis les artifacts fournis précédemment:

1. **backend/app/main.py** - Application FastAPI
2. **backend/app/models.py** - Modèles Pydantic
3. **backend/app/config.py** - Configuration
4. **backend/app/services/stt.py** - Speech-to-Text
5. **backend/app/services/tts.py** - Text-to-Speech
6. **backend/app/services/nlp.py** - NLP
7. **backend/app/services/knowledge.py** - Base de connaissances
8. **backend/app/services/__init__.py** - Exports
9. **backend/run.py** - Script de démarrage
10. **data/artworks.json** - Données des œuvres
11. **init_db.py** - Initialisation DB
12. **download_models.py** - Téléchargement modèles
13. **check_installation.py** - Vérification
14. **test_api.py** - Tests
15. **frontend/index.html** - Interface web

---

### Étape 7: Vérifier l'Installation (5 min)

```bash
# Vérifier tout
python check_installation.py
```

**Sortie attendue:**
```
🔍 Checking Museum Guide Bot Installation
============================================================
✅ Python 3.10.x
✅ FFmpeg version x.x
✅ FastAPI
✅ Faster-Whisper
✅ Edge-TTS
✅ Sentence-Transformers
... etc ...
✅ Installation complete! Ready to run.
```

---

### Étape 8: Télécharger les Modèles (10 min)

```bash
# Télécharger Whisper, Sentence-Transformers, NLTK data
python download_models.py
```

**Taille totale:** ~2.5 GB

⏱️ **Durée:** 5-15 minutes (selon connexion)

---

### Étape 9: Initialiser la Base de Données (2 min)

```bash
# Créer la DB et insérer les œuvres
python init_db.py
```

**Sortie attendue:**
```
🗄️  Initializing database...
✅ Loaded 3 artworks from JSON
✅ Table 'artworks' created
✅ Table 'conversations' created
  ✓ La Joconde by Léonard de Vinci
  ✓ La Nuit Étoilée by Vincent van Gogh
  ✓ Guernica by Pablo Picasso

✨ Database initialized successfully!
```

---

### Étape 10: Lancer le Serveur (1 min)

```bash
cd backend
python run.py
```

**Sortie attendue:**
```
🚀 Starting Museum Guide Bot API...
📍 API: http://localhost:8000
📚 Docs: http://localhost:8000/docs
🌐 Frontend: http://localhost:8000/index.html

INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

---

### Étape 11: Tester l'API (5 min)

#### Dans un autre terminal:

```bash
# Activer l'environnement
source venv/bin/activate  # ou venv\Scripts\activate

# Tester
python test_api.py
```

**Sortie attendue:**
```
🧪 Starting API Tests...
============================================================
✅ PASS - Health Check
✅ PASS - Artworks List
✅ PASS - Conversation Flow
✅ PASS - Text-to-Speech
============================================================
Result: 4/4 tests passed
🎉 All tests passed!
```

---

### Étape 12: Interface Web (2 min)

1. Ouvrir un navigateur
2. Aller à: `http://localhost:8000/docs` (Swagger UI)
3. Copier `frontend/index.html` dans `backend/app/static/`
4. Ou ouvrir directement le fichier HTML dans le navigateur

**Interface fonctionnelle:**
- Liste des œuvres à gauche
- Chat au centre
- Possibilité de poser des questions
- Audio généré automatiquement

---

## 🧪 Tests Rapides

### Test 1: Health Check
```bash
curl http://localhost:8000/health
```

### Test 2: Lister les œuvres
```bash
curl http://localhost:8000/artworks | jq
```

### Test 3: Conversation complète
```bash
# Démarrer
SESSION=$(curl -s -X POST "http://localhost:8000/conversation/start?artwork_id=mona-lisa" | jq -r '.session_id')

# Poser une question
curl -X POST http://localhost:8000/conversation/text \
  -H "Content-Type: application/json" \
  -d "{\"session_id\":\"$SESSION\",\"message\":\"Pourquoi sourit-elle?\"}" | jq
```

---

## 🎯 Démo pour le Hackathon

### Scénario de Démonstration

1. **Montrer l'interface web** (30 sec)
2. **Sélectionner une œuvre** - La Joconde (10 sec)
3. **Démarrer la visite** - Écouter la présentation (30 sec)
4. **Poser 2-3 questions:**
   - "Pourquoi sourit-elle ?"
   - "Qui est cette femme ?"
   - "Quelle technique a été utilisée ?"
5. **Montrer les réponses audio** (1 min)
6. **Changer d'œuvre** - La Nuit Étoilée (30 sec)
7. **Expliquer l'architecture** (1 min)

**Durée totale:** 4 minutes

---

## 🐛 Résolution des Problèmes Courants

### Problème: Port 8000 déjà utilisé
```bash
# Changer le port dans backend/run.py
port=8001  # Au lieu de 8000
```

### Problème: Modèles trop lents
```bash
# Utiliser un modèle plus petit dans .env
WHISPER_MODEL=tiny  # Au lieu de base
```

### Problème: FFmpeg introuvable
```bash
# Vérifier le PATH
which ffmpeg

# Réinstaller si nécessaire
sudo apt install --reinstall ffmpeg
```

### Problème: Import Error
```bash
# Réinstaller les dépendances
pip install -r requirements.txt --force-reinstall
```

### Problème: Latence trop élevée
**Solution:** Pré-générer les audios des narrations
```python
# Ajouter dans init_db.py
async def pregenerate_audio():
    from backend.app.services import TTSService
    tts = TTSService()
    for artwork in artworks:
        narrative = artwork['narratives']['short']
        await tts.synthesize(narrative)
```

---

## 📊 Performance Attendue

| Composant | Latence | Qualité |
|-----------|---------|---------|
| STT (5s audio) | ~1s | Excellente |
| NLP (classification) | ~100ms | Bonne |
| FAQ Matching | ~200ms | Très bonne |
| TTS (cache hit) | ~50ms | Excellente |
| TTS (cache miss) | ~800ms | Excellente |
| **Total (cached)** | **~1.5s** | - |
| **Total (uncached)** | **~2.5s** | - |

---

## 🚀 Améliorations Possibles (après le hackathon)

1. **Streaming Audio** - Réduire latence perçue
2. **Multi-langues** - Détecter automatiquement la langue
3. **Base vectorielle** - Meilleur matching sémantique
4. **Vision** - Détecter quelle œuvre le visiteur regarde
5. **Personnalisation** - Adapter le niveau de détail
6. **Analytics** - Dashboard admin avec stats

---

## 📚 Ressources

- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Faster-Whisper:** https://github.com/guillaumekln/faster-whisper
- **Edge-TTS:** https://github.com/rany2/edge-tts
- **Sentence-Transformers:** https://www.sbert.net

---

## 🎉 Checklist Finale

- [ ] Python 3.10+ installé
- [ ] FFmpeg installé
- [ ] Environnement virtuel créé
- [ ] Dépendances installées
- [ ] Structure fichiers créée
- [ ] Code copié
- [ ] Modèles téléchargés
- [ ] Base de données initialisée
- [ ] Serveur lancé
- [ ] Tests passent
- [ ] Interface web fonctionne
- [ ] Audio généré correctement

**Si tout est coché → Vous êtes prêt pour le hackathon ! 🚀**

---

## 💡 Conseils pour le Pitch

1. **Commencer par le problème**: Visites de musée peu engageantes
2. **Démonstration live**: Montrer l'interaction naturelle
3. **Technique simple mais efficace**: Pas de GPU, pas de coûts
4. **Scalabilité**: Facile d'ajouter des œuvres
5. **Open source**: Tout est gratuit et accessible

**Bonne chance ! 🍀**
