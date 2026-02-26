# 🔧 Backend NLP - Mode JSON (Accepter données d'œuvres)

Le frontend envoie maintenant les données complètes des œuvres depuis le fichier JSON local au lieu d'utiliser des IDs de base de données.

---

## 🎯 Changements Requis dans le Backend

### Problème Actuel

```
Frontend → POST /conversation/start?artwork_id=1
Backend → 422 Error (artwork_id=1 n'existe pas en DB)
```

### Solution

```
Frontend → POST /conversation/start
Body: { "artwork_data": { titre, artiste, description, ... } }

Backend → Accepte les données directement
Backend → Crée session avec contexte artwork
Backend → Retourne message de bienvenue
```

---

## 📝 Modifications Backend Nécessaires

### 1. Endpoint `/conversation/start`

**Fichier:** `nlp-module/backend-app/app/main.py` (ou routes conversation)

**Avant:**
```python
@app.post("/conversation/start")
async def start_conversation(artwork_id: str):
    # Cherche artwork dans DB par ID
    artwork = await db.get_artwork(artwork_id)
    if not artwork:
        raise HTTPException(404, "Artwork not found")
    # ...
```

**Après:**
```python
from pydantic import BaseModel

class ArtworkData(BaseModel):
    id: str
    code: str
    title: str
    artist: str
    description: str
    period: str
    style: str
    collection: str
    country: str

class StartConversationRequest(BaseModel):
    artwork_data: ArtworkData

@app.post("/conversation/start")
async def start_conversation(request: StartConversationRequest):
    # Utilise directement les données reçues
    artwork = request.artwork_data

    # Crée session
    session_id = str(uuid.uuid4())

    # Génère message de bienvenue avec LLM
    welcome_message = await generate_welcome_message(artwork)

    # Génère audio TTS
    audio_url = await generate_tts(welcome_message)

    # Stocke session en mémoire
    sessions[session_id] = {
        "artwork": artwork.dict(),
        "history": []
    }

    return {
        "session_id": session_id,
        "message": welcome_message,
        "audio_url": audio_url
    }
```

---

### 2. Endpoint `/conversation/text`

**Avant:**
```python
@app.post("/conversation/text")
async def send_text_message(session_id: str, message: str):
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(404, "Session not found")

    # Génère réponse...
```

**Après:**
```python
class TextMessageRequest(BaseModel):
    session_id: str
    message: str
    artwork_data: ArtworkData  # Contexte de l'œuvre

@app.post("/conversation/text")
async def send_text_message(request: TextMessageRequest):
    session_id = request.session_id
    message = request.message
    artwork = request.artwork_data

    # Récupère ou crée session
    if session_id not in sessions:
        sessions[session_id] = {
            "artwork": artwork.dict(),
            "history": []
        }

    session = sessions[session_id]

    # Ajoute message utilisateur à l'historique
    session["history"].append({"role": "user", "content": message})

    # Génère réponse IA avec contexte
    response = await generate_ai_response(
        message=message,
        artwork=artwork.dict(),
        history=session["history"]
    )

    # Génère audio
    audio_url = await generate_tts(response)

    # Ajoute réponse à l'historique
    session["history"].append({"role": "assistant", "content": response})

    return {
        "response": response,
        "audio_url": audio_url,
        "intent": "general_question"
    }
```

---

### 3. Fonction `generate_welcome_message()`

```python
async def generate_welcome_message(artwork: ArtworkData) -> str:
    """Génère message de bienvenue en français"""

    prompt = f"""Tu es Musia, un guide muséal AI qui parle français.

Œuvre d'art sélectionnée :
- Titre : {artwork.title}
- Artiste : {artwork.artist}
- Description : {artwork.description}
- Période : {artwork.period}
- Style : {artwork.style}
- Collection : {artwork.collection}
- Pays : {artwork.country}

Génère un message de bienvenue chaleureux en français (2-3 phrases) qui :
1. Accueille le visiteur
2. Présente brièvement l'œuvre
3. Invite à poser des questions

Réponds UNIQUEMENT le message de bienvenue, sans explications."""

    # Appel à Groq LLM
    response = await call_groq_llm(prompt)

    return response
```

---

### 4. Fonction `generate_ai_response()`

```python
async def generate_ai_response(
    message: str,
    artwork: dict,
    history: list
) -> str:
    """Génère réponse IA contextuelle en français"""

    # Construit le contexte
    system_prompt = f"""Tu es Musia, un expert en art africain qui parle français.

Œuvre actuellement discutée :
- Titre : {artwork['title']}
- Artiste : {artwork['artist']}
- Description : {artwork['description']}
- Période : {artwork['period']}
- Style : {artwork['style']}
- Collection : {artwork['collection']}
- Pays : {artwork['country']}

Instructions :
1. Réponds TOUJOURS en français
2. Sois précis et informatif
3. Utilise le contexte de l'œuvre fournie
4. Reste concentré sur l'art africain
5. Si la question est hors sujet, ramène poliment vers l'œuvre

Réponds à la question de manière détaillée et engageante."""

    # Construit l'historique pour le LLM
    messages = [
        {"role": "system", "content": system_prompt}
    ]

    # Ajoute l'historique récent (derniers 5 messages)
    for msg in history[-5:]:
        messages.append(msg)

    # Appel à Groq
    response = await call_groq_llm_with_history(messages)

    return response
```

---

### 5. Fonction `call_groq_llm()`

```python
import os
from groq import AsyncGroq

client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))

async def call_groq_llm(prompt: str) -> str:
    """Appel simple à Groq"""
    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=500
    )

    return response.choices[0].message.content

async def call_groq_llm_with_history(messages: list) -> str:
    """Appel avec historique"""
    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=messages,
        temperature=0.7,
        max_tokens=500
    )

    return response.choices[0].message.content
```

---

### 6. Gestion des Sessions en Mémoire

```python
from typing import Dict
import uuid

# Stockage en mémoire (reset au redémarrage)
sessions: Dict[str, dict] = {}

def create_session(artwork_data: dict) -> str:
    """Crée une nouvelle session"""
    session_id = str(uuid.uuid4())
    sessions[session_id] = {
        "artwork": artwork_data,
        "history": [],
        "created_at": datetime.now()
    }
    return session_id

def get_session(session_id: str) -> dict:
    """Récupère une session"""
    return sessions.get(session_id)

def cleanup_old_sessions():
    """Nettoie les sessions de plus de 24h"""
    now = datetime.now()
    expired = [
        sid for sid, data in sessions.items()
        if (now - data["created_at"]).hours > 24
    ]
    for sid in expired:
        del sessions[sid]
```

---

## 🔊 Génération Audio TTS

```python
import edge_tts
import hashlib
import os

async def generate_tts(text: str) -> str:
    """Génère audio MP3 avec Edge TTS"""

    # Hash pour cache
    text_hash = hashlib.md5(text.encode()).hexdigest()
    cache_dir = "data/tts_cache"
    os.makedirs(cache_dir, exist_ok=True)
    audio_file = f"{cache_dir}/{text_hash}.mp3"

    # Si déjà en cache
    if os.path.exists(audio_file):
        return f"/audio/{text_hash}.mp3"

    # Génère avec Edge TTS (voix française)
    communicate = edge_tts.Communicate(
        text=text,
        voice="fr-FR-DeniseNeural"  # Voix féminine française
    )

    await communicate.save(audio_file)

    return f"/audio/{text_hash}.mp3"

# Route pour servir les fichiers audio
@app.get("/audio/{filename}")
async def serve_audio(filename: str):
    file_path = f"data/tts_cache/{filename}"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg")
    raise HTTPException(404, "Audio file not found")
```

---

## 📦 Structure du Projet Backend

```
nlp-module/backend-app/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app + routes
│   ├── models.py               # Pydantic models
│   ├── services/
│   │   ├── llm.py             # Groq LLM calls
│   │   ├── tts.py             # Edge TTS
│   │   └── session.py         # Session management
│   └── config.py              # Configuration
├── data/
│   └── tts_cache/             # Fichiers audio MP3
├── .env                       # GROQ_API_KEY
├── requirements.txt
└── run.py                     # Entry point
```

---

## 🧪 Test du Backend

### Test 1 : Start Conversation

```bash
curl -X POST http://localhost:8000/conversation/start \
  -H "Content-Type: application/json" \
  -d '{
    "artwork_data": {
      "id": "1",
      "code": "AFR001",
      "title": "La Plaque en Bronze du Bénin",
      "artist": "Artisans Edo",
      "description": "Une magnifique plaque...",
      "period": "16ème-17ème siècle",
      "style": "Bronze du Bénin",
      "collection": "Art d'\''Afrique de l'\''Ouest",
      "country": "Nigeria"
    }
  }'
```

**Réponse attendue:**
```json
{
  "session_id": "abc-123-def",
  "message": "Bienvenue ! Je suis Musia...",
  "audio_url": "/audio/hash123.mp3"
}
```

### Test 2 : Send Message

```bash
curl -X POST http://localhost:8000/conversation/text \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "abc-123-def",
    "message": "Qui a créé cette œuvre ?",
    "artwork_data": {
      "id": "1",
      "title": "La Plaque en Bronze du Bénin",
      "artist": "Artisans Edo",
      ...
    }
  }'
```

**Réponse attendue:**
```json
{
  "response": "Cette œuvre a été créée par les Artisans Edo...",
  "audio_url": "/audio/hash456.mp3",
  "intent": "general_question"
}
```

---

## ✅ Checklist Backend

- [ ] Installer dépendances : `groq`, `edge-tts`, `fastapi`, `uvicorn`
- [ ] Créer `.env` avec `GROQ_API_KEY`
- [ ] Modifier `/conversation/start` pour accepter `artwork_data`
- [ ] Modifier `/conversation/text` pour accepter `artwork_data`
- [ ] Implémenter `generate_welcome_message()`
- [ ] Implémenter `generate_ai_response()`
- [ ] Implémenter `generate_tts()`
- [ ] Tester avec `curl`
- [ ] Tester avec frontend

---

## 🎉 Résultat Final

Une fois le backend modifié :

```
Frontend (JSON) → Backend (LLM + TTS) → Frontend (Réponse IA + Audio)
```

**Avantages :**
- ✅ Pas de base de données nécessaire
- ✅ 6 œuvres africaines contrôlées (JSON)
- ✅ Réponses IA intelligentes (Groq)
- ✅ Audio professionnel (Edge TTS)
- ✅ Simple à déployer

---

**Le backend est maintenant compatible avec le mode JSON + IA !** 🚀
