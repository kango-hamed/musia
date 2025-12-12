º# Configuration Projet - Robot Guide Musée

## Structure du Projet

```
museum-guide-bot/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app
│   │   ├── config.py            # Configuration
│   │   ├── models.py            # Modèles de données
│   │   ├── database.py          # SQLite setup
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── audio.py         # Routes STT/TTS
│   │   │   ├── conversation.py  # Routes conversation
│   │   │   └── artworks.py      # Routes œuvres
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── stt.py           # Speech-to-Text
│   │   │   ├── tts.py           # Text-to-Speech
│   │   │   ├── nlp.py           # Intent matching
│   │   │   └── knowledge.py     # Base connaissances
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── helpers.py
│   ├── data/
│   │   ├── artworks.json        # Base connaissances
│   │   └── museum.db            # SQLite database
│   ├── models/                  # Modèles ML (whisper)
│   ├── tests/
│   ├── requirements.txt
│   └── .env
├── frontend/                    # Interface web (optionnel)
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── docker-compose.yml           # (optionnel)
├── Dockerfile
├── README.md
└── .gitignore
```

## Installation - Étape par Étape

### 1. Prérequis Système

**Python 3.10+** (recommandé 3.11)
```bash
python --version  # Vérifier version
```

**Git**
```bash
git --version
```

**FFmpeg** (nécessaire pour audio)
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Windows
# Télécharger depuis: https://ffmpeg.org/download.html
```

### 2. Créer le Projet

```bash
# Cloner ou créer le dossier
mkdir museum-guide-bot
cd museum-guide-bot

# Créer environnement virtuel
python -m venv venv

# Activer l'environnement
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Vérifier activation
which python  # Doit pointer vers venv/bin/python
```

### 3. Installer les Dépendances

**Créer `requirements.txt`:**

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

# NLP Léger
scikit-learn==1.4.0
sentence-transformers==2.3.1
nltk==3.8.1

# Base de données
sqlalchemy==2.0.25
aiosqlite==0.19.0

# Utilitaires
python-dotenv==1.0.0
pydantic==2.5.3
pydantic-settings==2.1.0
aiofiles==23.2.1

# Développement
pytest==7.4.4
pytest-asyncio==0.23.3
httpx==0.26.0
```

**Installer:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Télécharger Modèles

**Whisper (première utilisation):**
```python
# Le modèle se télécharge automatiquement au premier usage
# Ou télécharger manuellement:
from faster_whisper import WhisperModel
model = WhisperModel("base", device="cpu", compute_type="int8")
# Télécharge ~150MB dans ~/.cache/huggingface/
```

**Sentence Transformers (pour matching FAQ):**
```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
# Télécharge ~400MB
```

**NLTK (stopwords français):**
```python
import nltk
nltk.download('stopwords')
nltk.download('punkt')
```

### 5. Configuration Environnement

**Créer `.env`:**
```bash
# Application
APP_NAME="Museum Guide Bot"
APP_VERSION="1.0.0"
DEBUG=True

# API
API_HOST=0.0.0.0
API_PORT=8000

# Base de données
DATABASE_URL=sqlite:///./data/museum.db

# Audio
MAX_AUDIO_LENGTH=30  # secondes
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

### 6. Initialiser la Base de Données

**Créer `data/artworks.json`:**
```json
{
  "artworks": [
    {
      "id": "mona-lisa",
      "title": "La Joconde",
      "artist": "Léonard de Vinci",
      "year": "1503-1519",
      "description": "Portrait de Lisa Gherardini, célèbre pour son sourire énigmatique.",
      "narratives": {
        "short": "Voici la Joconde, chef-d'œuvre de Léonard de Vinci peint entre 1503 et 1519.",
        "detailed": "La Joconde est sans doute le tableau le plus célèbre au monde..."
      },
      "faq": [
        {
          "question": "Pourquoi sourit-elle?",
          "keywords": ["sourire", "expression", "pourquoi"],
          "answer": "Le sourire de la Joconde est énigmatique. Léonard a utilisé la technique du sfumato..."
        },
        {
          "question": "Qui est cette femme?",
          "keywords": ["qui", "femme", "modèle", "identité"],
          "answer": "Il s'agit de Lisa Gherardini, épouse d'un marchand florentin..."
        }
      ]
    }
  ]
}
```

**Script d'initialisation `init_db.py`:**
```python
import json
import sqlite3
from pathlib import Path

def init_database():
    Path("data").mkdir(exist_ok=True)
    
    conn = sqlite3.connect('data/museum.db')
    cursor = conn.cursor()
    
    # Créer tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS artworks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            year TEXT,
            description TEXT,
            data JSON
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            artwork_id TEXT,
            user_input TEXT,
            bot_response TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Charger données
    with open('data/artworks.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for artwork in data['artworks']:
        cursor.execute('''
            INSERT OR REPLACE INTO artworks (id, title, artist, year, description, data)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            artwork['id'],
            artwork['title'],
            artwork['artist'],
            artwork['year'],
            artwork['description'],
            json.dumps(artwork)
        ))
    
    conn.commit()
    conn.close()
    print("✅ Database initialized!")

if __name__ == "__main__":
    init_database()
```

Exécuter:
```bash
python init_db.py
```

### 7. Vérification Installation

**Script de test `test_setup.py`:**
```python
import sys

def test_imports():
    tests = {
        "FastAPI": lambda: __import__("fastapi"),
        "Faster-Whisper": lambda: __import__("faster_whisper"),
        "Edge-TTS": lambda: __import__("edge_tts"),
        "Sentence-Transformers": lambda: __import__("sentence_transformers"),
        "SQLAlchemy": lambda: __import__("sqlalchemy"),
    }
    
    for name, test in tests.items():
        try:
            test()
            print(f"✅ {name}")
        except ImportError:
            print(f"❌ {name} - Not installed")
            return False
    return True

def test_ffmpeg():
    import subprocess
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
        print("✅ FFmpeg")
        return True
    except:
        print("❌ FFmpeg - Not installed")
        return False

if __name__ == "__main__":
    print("🔍 Testing installation...\n")
    imports_ok = test_imports()
    ffmpeg_ok = test_ffmpeg()
    
    if imports_ok and ffmpeg_ok:
        print("\n✨ All dependencies installed correctly!")
        sys.exit(0)
    else:
        print("\n⚠️  Some dependencies missing")
        sys.exit(1)
```

Exécuter:
```bash
python test_setup.py
```

### 8. Lancer le Serveur de Développement

```bash
# Depuis le dossier backend/
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Accéder à:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

## Résumé des Ressources

### Espace Disque
- Python packages: ~2GB
- Whisper base model: ~150MB
- Sentence-Transformers: ~400MB
- **Total: ~2.5GB**

### RAM Minimum
- Développement: 4GB
- Production: 2GB (optimisé)

### CPU
- Fonctionne sur CPU (pas de GPU requis)
- Whisper base: ~1-2s pour 5s audio sur CPU moderne

## Prochaines Étapes

1. ✅ Configuration terminée
2. 📝 Implémenter les services (STT, TTS, NLP)
3. 🎨 Créer l'API FastAPI
4. 🧪 Tester end-to-end
5. 🚀 Déployer sur Render.com

Voulez-vous que je crée le code pour les services maintenant ?
