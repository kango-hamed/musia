# NLP Module - Musia AI Engine

## Overview

The Musia NLP Module is a **Python-based AI conversational engine** that powers the museum chatbot with speech-to-text, natural language processing, LLM-based responses, and text-to-speech capabilities.

### Technology Stack
- **Framework:** FastAPI 0.109.0
- **Server:** Uvicorn 0.27.0
- **Language:** Python 3.11+
- **Speech-to-Text:** OpenAI Whisper (base model)
- **Text-to-Speech:** Edge TTS 6.1.9
- **LLM:** Groq API (Llama 3.1-8b-instant)
- **NLP:** Sentence Transformers, NLTK, scikit-learn
- **Database:** SQLAlchemy 2.0.25 + aiosqlite 0.19.0
- **Audio:** pydub 0.25.1
- **Validation:** Pydantic 2.5.3
- **Testing:** pytest 7.4.4

---

## Project Structure

```
nlp-module/
├── backend/
│   ├── app/
│   │   ├── services/           # Core services
│   │   │   ├── stt.py         # Speech-to-Text (Whisper)
│   │   │   ├── tts.py         # Text-to-Speech (Edge TTS)
│   │   │   ├── nlp.py         # NLP Processing
│   │   │   ├── llm.py         # LLM Integration (Groq)
│   │   │   └── knowledge.py   # Knowledge Base
│   │   ├── main.py            # FastAPI application
│   │   ├── models.py          # Pydantic models
│   │   └── config.py          # Configuration
│   ├── data/
│   │   ├── artworks.json      # Fallback artwork data
│   │   └── tts_cache/         # Cached TTS audio files
│   ├── tests/
│   │   ├── test_stt.py
│   │   ├── test_tts.py
│   │   ├── test_nlp.py
│   │   └── test_llm.py
│   └── run.py                 # Entry point
├── requirements.txt           # Python dependencies
├── Dockerfile
├── .env
└── CLAUDE.md                 # This file
```

---

## Core Services

### 1. Speech-to-Text (STT)

**File:** [backend/app/services/stt.py](backend/app/services/stt.py)

**Purpose:** Convert audio to text using OpenAI Whisper

**Model:** Whisper base (CPU inference)

**Features:**
- Multilingual support (focused on French)
- Confidence scoring
- Async processing
- Audio format conversion (via pydub)

**Implementation:**
```python
import whisper
from pydub import AudioSegment

class STTService:
    def __init__(self):
        self.model = whisper.load_model("base")

    async def transcribe(self, audio_file: bytes) -> dict:
        """
        Transcribe audio to text

        Args:
            audio_file: Audio bytes (mp3, wav, m4a, ogg)

        Returns:
            {
                "text": str,
                "confidence": float,
                "language": str
            }
        """
        # Convert to WAV if needed
        audio = AudioSegment.from_file(io.BytesIO(audio_file))
        audio = audio.set_frame_rate(16000).set_channels(1)

        # Save temporarily
        temp_path = "/tmp/audio.wav"
        audio.export(temp_path, format="wav")

        # Transcribe
        result = self.model.transcribe(
            temp_path,
            language="fr",
            fp16=False  # CPU mode
        )

        return {
            "text": result["text"],
            "confidence": result.get("confidence", 0.0),
            "language": result["language"]
        }
```

**Supported Formats:**
- MP3, WAV, M4A, OGG, FLAC

**Performance:**
- Base model: ~10s per minute of audio (CPU)
- Accuracy: 85-95% for clear French speech

---

### 2. Text-to-Speech (TTS)

**File:** [backend/app/services/tts.py](backend/app/services/tts.py)

**Purpose:** Convert text to natural speech audio

**Engine:** Microsoft Edge TTS (cloud-based)

**Features:**
- Neural voices (high quality)
- French language support
- Audio caching for performance
- Multiple voice options
- SSML support (Speech Synthesis Markup Language)

**Implementation:**
```python
import edge_tts
import asyncio
import hashlib
from pathlib import Path

class TTSService:
    def __init__(self, cache_dir: str = "data/tts_cache"):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.voice = "fr-FR-DeniseNeural"  # French female voice

    async def synthesize(self, text: str) -> str:
        """
        Convert text to speech

        Args:
            text: Text to synthesize

        Returns:
            Path to generated audio file
        """
        # Check cache
        cache_key = hashlib.md5(
            f"{text}_{self.voice}".encode()
        ).hexdigest()
        cache_path = self.cache_dir / f"{cache_key}.mp3"

        if cache_path.exists():
            return str(cache_path)

        # Generate new audio
        communicate = edge_tts.Communicate(text, self.voice)
        await communicate.save(str(cache_path))

        return str(cache_path)

    async def list_voices(self) -> list:
        """List available voices"""
        voices = await edge_tts.list_voices()
        return [
            {
                "name": v["Name"],
                "locale": v["Locale"],
                "gender": v["Gender"]
            }
            for v in voices
            if v["Locale"].startswith("fr")
        ]
```

**Available French Voices:**
- `fr-FR-DeniseNeural` (Female) - Default
- `fr-FR-HenriNeural` (Male)
- `fr-CA-SylvieNeural` (Canadian Female)
- `fr-CA-JeanNeural` (Canadian Male)

**Cache Benefits:**
- Instant playback for repeated phrases
- Reduced API calls
- Disk-based persistence

---

### 3. Natural Language Processing (NLP)

**File:** [backend/app/services/nlp.py](backend/app/services/nlp.py)

**Purpose:** Analyze and understand user questions

**Features:**
- Intent classification
- Keyword extraction
- FAQ matching (keyword + semantic)
- Multilingual embeddings
- Context extraction

**Intent Categories:**
```python
INTENT_CATEGORIES = [
    "factual",        # "Who painted this?"
    "temporal",       # "When was this created?"
    "technical",      # "What technique was used?"
    "contextual",     # "What was happening then?"
    "comparative",    # "How does this compare to..."
    "personal",       # "Why do I like this?"
    "navigation",     # "Where is the next artwork?"
    "general"         # Other questions
]
```

**Implementation:**
```python
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import nltk

class NLPService:
    def __init__(self):
        # Multilingual embeddings
        self.model = SentenceTransformer(
            'sentence-transformers/paraphrase-multilingual-mpnet-base-v2'
        )

        # Download NLTK data
        nltk.download('stopwords')
        nltk.download('punkt')

    def classify_intent(self, question: str) -> str:
        """Classify question intent"""
        question_lower = question.lower()

        # Keyword-based classification
        if any(word in question_lower for word in ["qui", "artiste", "auteur"]):
            return "factual"
        elif any(word in question_lower for word in ["quand", "date", "époque"]):
            return "temporal"
        elif any(word in question_lower for word in ["technique", "comment", "matériau"]):
            return "technical"
        elif any(word in question_lower for word in ["pourquoi", "contexte", "histoire"]):
            return "contextual"
        # ... more patterns

        return "general"

    def extract_keywords(self, text: str) -> list[str]:
        """Extract important keywords"""
        # Tokenize
        tokens = nltk.word_tokenize(text, language='french')

        # Remove stopwords
        stopwords = set(nltk.corpus.stopwords.words('french'))
        keywords = [
            token.lower()
            for token in tokens
            if token.isalnum() and token.lower() not in stopwords
        ]

        return keywords

    def find_similar_faq(
        self,
        question: str,
        faq_list: list[dict],
        threshold: float = 0.7
    ) -> dict | None:
        """
        Find similar FAQ using semantic similarity

        Args:
            question: User question
            faq_list: List of FAQs with "question" and "answer"
            threshold: Similarity threshold (0-1)

        Returns:
            Best matching FAQ or None
        """
        # Generate embeddings
        question_emb = self.model.encode([question])
        faq_questions = [faq["question"] for faq in faq_list]
        faq_embs = self.model.encode(faq_questions)

        # Calculate similarities
        similarities = cosine_similarity(question_emb, faq_embs)[0]

        # Find best match
        best_idx = similarities.argmax()
        best_score = similarities[best_idx]

        if best_score >= threshold:
            return {
                **faq_list[best_idx],
                "similarity": float(best_score)
            }

        return None
```

**Semantic Similarity:**
- Uses multilingual sentence embeddings
- Cosine similarity scoring
- Threshold-based matching (default: 0.7)

---

### 4. LLM Integration

**File:** [backend/app/services/llm.py](backend/app/services/llm.py)

**Purpose:** Generate AI responses using Large Language Model

**Provider:** Groq (fast inference)

**Model:** Llama 3.1-8b-instant

**Features:**
- RAG (Retrieval-Augmented Generation)
- Context-aware responses
- Conversation history tracking
- System prompts for museum context
- Streaming support (optional)

**Implementation:**
```python
from groq import Groq
import os

class LLMService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.1-8b-instant"

        self.system_prompt = """
        Tu es un guide de musée expert et passionné.
        Tu réponds aux questions sur les œuvres d'art avec précision et enthousiasme.
        Tes réponses sont claires, concises (2-3 phrases) et adaptées au grand public.
        Tu utilises un ton chaleureux et accessible.
        """

    async def generate_response(
        self,
        question: str,
        context: dict,
        conversation_history: list = None
    ) -> str:
        """
        Generate AI response

        Args:
            question: User question
            context: Relevant information (artwork data, etc.)
            conversation_history: Previous messages

        Returns:
            AI-generated response text
        """
        # Build messages
        messages = [
            {"role": "system", "content": self.system_prompt}
        ]

        # Add conversation history
        if conversation_history:
            messages.extend(conversation_history)

        # Add context
        context_str = self._format_context(context)
        user_message = f"""
        Contexte: {context_str}

        Question: {question}
        """
        messages.append({"role": "user", "content": user_message})

        # Generate response
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7,
            max_tokens=300,
            top_p=0.9
        )

        return response.choices[0].message.content

    def _format_context(self, context: dict) -> str:
        """Format context for LLM"""
        if "artwork" in context:
            artwork = context["artwork"]
            return f"""
            Titre: {artwork["title"]}
            Artiste: {artwork.get("artist", "Inconnu")}
            Période: {artwork.get("period", "Non spécifiée")}
            Style: {artwork.get("style", "Non spécifié")}
            Description: {artwork.get("description", "")}
            """
        return ""
```

**Response Quality:**
- Coherent and contextual
- Museum-appropriate tone
- Limited to 2-3 sentences (configurable)
- French language optimized

---

### 5. Knowledge Base

**File:** [backend/app/services/knowledge.py](backend/app/services/knowledge.py)

**Purpose:** Manage museum knowledge and artwork data

**Features:**
- Fetch artworks from Musia Backend API
- Fallback to local JSON data
- Caching for performance
- Artwork search by keywords

**Implementation:**
```python
import aiohttp
import json
from pathlib import Path

class KnowledgeBase:
    def __init__(self, backend_url: str = None):
        self.backend_url = backend_url or os.getenv(
            "MUSIA_BACKEND_URL",
            "http://localhost:3001/api"
        )
        self.fallback_path = Path("data/artworks.json")
        self.cache = {}

    async def get_artworks(self) -> list[dict]:
        """Fetch all artworks"""
        # Check cache
        if "artworks" in self.cache:
            return self.cache["artworks"]

        try:
            # Fetch from API
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{self.backend_url}/artworks"
                ) as response:
                    data = await response.json()
                    artworks = data.get("data", [])

                    # Cache
                    self.cache["artworks"] = artworks
                    return artworks
        except Exception as e:
            print(f"Failed to fetch artworks: {e}")

            # Fallback to local data
            if self.fallback_path.exists():
                with open(self.fallback_path) as f:
                    return json.load(f)

            return []

    async def get_artwork(self, artwork_id: str) -> dict | None:
        """Get single artwork by ID"""
        artworks = await self.get_artworks()
        return next(
            (a for a in artworks if a["id"] == artwork_id),
            None
        )

    async def search_artworks(
        self,
        query: str,
        limit: int = 5
    ) -> list[dict]:
        """
        Search artworks by keyword

        Args:
            query: Search keywords
            limit: Max results

        Returns:
            List of matching artworks
        """
        artworks = await self.get_artworks()
        query_lower = query.lower()

        matches = []
        for artwork in artworks:
            # Search in title, artist, description
            searchable = " ".join([
                artwork.get("title", ""),
                artwork.get("artist", ""),
                artwork.get("description", ""),
                artwork.get("period", ""),
                artwork.get("style", "")
            ]).lower()

            if query_lower in searchable:
                matches.append(artwork)

            if len(matches) >= limit:
                break

        return matches
```

**Data Sources:**
1. **Primary:** Musia Backend API (http://localhost:3001/api)
2. **Fallback:** Local JSON file ([data/artworks.json](backend/data/artworks.json))

---

## API Endpoints

### Base URL
```
http://localhost:8000
```

### Health Check

**GET /** or **GET /health**

**Response:**
```json
{
  "status": "healthy",
  "services": {
    "stt": "ready",
    "tts": "ready",
    "nlp": "ready",
    "llm": "ready"
  }
}
```

---

### Conversation

#### Start Conversation

**POST /conversation/start**

**Request:**
```json
{
  "trajectory_id": "optional-trajectory-id"
}
```

**Response:**
```json
{
  "session_id": "uuid-v4",
  "message": "Conversation started"
}
```

---

#### Ask Question (Audio)

**POST /conversation/ask**

**Request:** `multipart/form-data`
- `audio`: Audio file (MP3, WAV, M4A, OGG)
- `session_id`: Session UUID

**Response:**
```json
{
  "question": "Qui a peint cette œuvre?",
  "answer": "Cette œuvre a été peinte par Leonardo da Vinci...",
  "audio_url": "/audio/abc123.mp3",
  "confidence": 0.95,
  "intent": "factual",
  "artwork_id": "clx123..."
}
```

---

#### Ask Question (Text)

**POST /conversation/text**

**Request:**
```json
{
  "session_id": "uuid",
  "question": "Qui a peint cette œuvre?",
  "artwork_id": "clx123..." // optional
}
```

**Response:**
```json
{
  "question": "Qui a peint cette œuvre?",
  "answer": "Cette œuvre a été peinte par Leonardo da Vinci...",
  "audio_url": "/audio/abc123.mp3",
  "intent": "factual",
  "artwork_id": "clx123..."
}
```

---

#### Get Conversation History

**GET /conversation/{session_id}/history**

**Response:**
```json
{
  "session_id": "uuid",
  "messages": [
    {
      "role": "user",
      "content": "Qui a peint cette œuvre?",
      "timestamp": "2025-01-13T10:30:00Z"
    },
    {
      "role": "assistant",
      "content": "Cette œuvre a été peinte par...",
      "timestamp": "2025-01-13T10:30:05Z"
    }
  ]
}
```

---

### Artworks

#### List Artworks

**GET /artworks**

**Response:**
```json
{
  "artworks": [
    {
      "id": "clx123",
      "title": "Mona Lisa",
      "artist": "Leonardo da Vinci",
      "description": "...",
      "imageUrl": "..."
    }
  ]
}
```

---

#### Get Artwork with Narrative

**GET /artworks/{id}/narrative**

**Query Parameters:**
- `version`: "standard" | "short" | "detailed" | "kids" (default: "standard")
- `language`: ISO language code (default: "fr")

**Response:**
```json
{
  "artwork": { ... },
  "narrative": {
    "text": "La Joconde, peinte par Leonardo da Vinci...",
    "audio_url": "/audio/narrative_xyz.mp3",
    "duration": 120,
    "version": "standard"
  }
}
```

---

### Trajectories

#### List Trajectories

**GET /trajectories**

**Response:**
```json
{
  "trajectories": [
    {
      "id": "clx456",
      "name": "Renaissance Masters",
      "description": "...",
      "steps": [ ... ]
    }
  ]
}
```

---

#### Get Trajectory

**GET /trajectories/{id}**

**Response:**
```json
{
  "id": "clx456",
  "name": "Renaissance Masters",
  "steps": [
    {
      "stepOrder": 1,
      "artwork": { ... },
      "narrative": { ... },
      "stopDuration": 5
    }
  ]
}
```

---

#### Preload Trajectory

**GET /trajectories/{id}/preload**

**Purpose:** Pre-generate TTS audio for all narratives

**Response:**
```json
{
  "trajectory_id": "clx456",
  "steps_preloaded": 8,
  "audio_files": [
    "/audio/step1.mp3",
    "/audio/step2.mp3"
  ]
}
```

---

#### Start Guided Tour

**POST /trajectories/{id}/start**

**Request:**
```json
{
  "session_id": "optional-existing-session"
}
```

**Response:**
```json
{
  "session_id": "uuid",
  "trajectory_id": "clx456",
  "current_step": 0,
  "total_steps": 8,
  "message": "Bienvenue dans la visite Renaissance Masters!"
}
```

---

### Testing Endpoints

#### Test TTS

**POST /test/tts**

**Request:**
```json
{
  "text": "Bonjour, je suis votre guide.",
  "voice": "fr-FR-DeniseNeural"
}
```

**Response:**
```json
{
  "text": "Bonjour, je suis votre guide.",
  "audio_url": "/audio/test_xyz.mp3",
  "voice": "fr-FR-DeniseNeural"
}
```

---

#### Test STT

**POST /test/stt**

**Request:** `multipart/form-data`
- `audio`: Audio file

**Response:**
```json
{
  "text": "Bonjour, comment allez-vous?",
  "confidence": 0.92,
  "language": "fr"
}
```

---

#### List Voices

**GET /voices**

**Response:**
```json
{
  "voices": [
    {
      "name": "fr-FR-DeniseNeural",
      "locale": "fr-FR",
      "gender": "Female"
    },
    {
      "name": "fr-FR-HenriNeural",
      "locale": "fr-FR",
      "gender": "Male"
    }
  ]
}
```

---

### Audio Serving

**GET /audio/{filename}**

**Purpose:** Serve generated TTS audio files

**Response:** Audio file (MP3)

---

## Pydantic Models

**File:** [backend/app/models.py](backend/app/models.py)

### Conversation Models

```python
from pydantic import BaseModel
from typing import Optional

class ConversationStart(BaseModel):
    trajectory_id: Optional[str] = None

class ConversationResponse(BaseModel):
    session_id: str
    message: str

class TextQuestion(BaseModel):
    session_id: str
    question: str
    artwork_id: Optional[str] = None

class QuestionResponse(BaseModel):
    question: str
    answer: str
    audio_url: str
    confidence: Optional[float] = None
    intent: str
    artwork_id: Optional[str] = None
```

---

### Artwork Models

```python
class Artwork(BaseModel):
    id: str
    code: str
    title: str
    artist: Optional[str] = None
    description: Optional[str] = None
    period: Optional[str] = None
    style: Optional[str] = None
    imageUrl: Optional[str] = None

class Narrative(BaseModel):
    text: str
    audio_url: str
    duration: int
    version: str
    language: str
```

---

### Trajectory Models

```python
class TrajectoryStep(BaseModel):
    stepOrder: int
    artwork: Artwork
    narrative: Optional[Narrative] = None
    stopDuration: int

class Trajectory(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    theme: Optional[str] = None
    steps: list[TrajectoryStep]
```

---

## Configuration

**File:** [backend/app/config.py](backend/app/config.py)

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Keys
    groq_api_key: str

    # Backend URL
    musia_backend_url: str = "http://localhost:3001/api"

    # Whisper Model
    whisper_model: str = "base"

    # TTS Settings
    tts_voice: str = "fr-FR-DeniseNeural"
    tts_cache_dir: str = "data/tts_cache"

    # LLM Settings
    llm_model: str = "llama-3.1-8b-instant"
    llm_temperature: float = 0.7
    llm_max_tokens: int = 300

    # NLP Settings
    embedding_model: str = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
    similarity_threshold: float = 0.7

    class Config:
        env_file = ".env"

settings = Settings()
```

---

## Environment Variables

**File:** `.env`

```bash
# Required
GROQ_API_KEY=gsk_your_api_key_here

# Optional
MUSIA_BACKEND_URL=http://localhost:3001/api
WHISPER_MODEL=base
TTS_VOICE=fr-FR-DeniseNeural
LLM_MODEL=llama-3.1-8b-instant
```

---

## Running the NLP Module

### Development

```bash
cd nlp-module

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your GROQ_API_KEY

# Run server
python run.py
```

**Server starts on:** http://localhost:8000

---

### Production

```bash
# With Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000

# With workers
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

### Docker

```bash
# Build image
docker build -t musia-nlp .

# Run container
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_key \
  -v ./data:/app/data \
  musia-nlp
```

---

## Testing

### Run Tests

```bash
# All tests
pytest

# Specific test file
pytest tests/test_stt.py -v

# With coverage
pytest --cov=app --cov-report=html

# Async tests
pytest tests/test_llm.py -v
```

---

### Test Files

**STT Tests:** [tests/test_stt.py](tests/test_stt.py)
```python
import pytest
from app.services.stt import STTService

@pytest.mark.asyncio
async def test_transcribe_audio():
    service = STTService()

    with open("tests/fixtures/audio_sample.mp3", "rb") as f:
        audio = f.read()

    result = await service.transcribe(audio)

    assert "text" in result
    assert result["language"] == "fr"
    assert result["confidence"] > 0.5
```

---

**TTS Tests:** [tests/test_tts.py](tests/test_tts.py)
```python
@pytest.mark.asyncio
async def test_synthesize_text():
    service = TTSService()

    audio_path = await service.synthesize("Bonjour le monde")

    assert Path(audio_path).exists()
    assert audio_path.endswith(".mp3")
```

---

## Performance

### Benchmarks

**STT (Whisper base, CPU):**
- ~10 seconds per minute of audio
- Accuracy: 85-95% (French)

**TTS (Edge TTS):**
- ~2 seconds first synthesis
- Instant from cache
- Cache hit rate: ~60-70%

**LLM (Groq Llama 3.1):**
- ~1-2 seconds per response
- Tokens: 50-150 per response

**Overall Response Time:**
- Audio question: 10-15 seconds (STT + LLM + TTS)
- Text question: 2-3 seconds (LLM + TTS)
- Cached response: <1 second

---

### Optimization Tips

1. **Preload trajectories** - Use `/trajectories/{id}/preload`
2. **Use text mode** - Faster than audio transcription
3. **Cache warming** - Pre-generate common FAQs
4. **Smaller Whisper model** - Use "tiny" for speed (trade-off: accuracy)
5. **Batch processing** - Process multiple questions in parallel

---

## Troubleshooting

### Whisper Model Not Found

**Issue:** "Model 'base' not found"

**Solution:**
```bash
python -c "import whisper; whisper.load_model('base')"
```

This downloads the model (~140MB).

---

### Groq API Errors

**Issue:** "401 Unauthorized"

**Solution:**
1. Check `GROQ_API_KEY` in `.env`
2. Verify key at https://console.groq.com
3. Check API quota/limits

---

### Edge TTS Fails

**Issue:** "Failed to synthesize"

**Solution:**
1. Check internet connection (cloud-based)
2. Verify voice name (`fr-FR-DeniseNeural`)
3. Test with `/test/tts` endpoint

---

### Backend API Unreachable

**Issue:** "Failed to fetch artworks"

**Solution:**
1. Ensure backend is running (http://localhost:3001)
2. Check `MUSIA_BACKEND_URL` in `.env`
3. Falls back to local `data/artworks.json`

---

## Future Enhancements

### Planned Features

- [ ] **Vector Database** - Pinecone/Weaviate for semantic search
- [ ] **Conversation Memory** - Redis for session persistence
- [ ] **Streaming Responses** - Real-time LLM streaming
- [ ] **Multi-Language** - English, Spanish support
- [ ] **Emotion Detection** - Analyze user sentiment
- [ ] **Voice Cloning** - Custom museum guide voices
- [ ] **Whisper Fine-Tuning** - Improve accuracy for museum context
- [ ] **GPU Acceleration** - Faster STT inference
- [ ] **Advanced RAG** - Document retrieval with embeddings
- [ ] **Analytics** - Track question patterns

---

## Resources

### Documentation
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Whisper GitHub](https://github.com/openai/whisper)
- [Groq API Docs](https://console.groq.com/docs)
- [Edge TTS](https://github.com/rany2/edge-tts)
- [Sentence Transformers](https://www.sbert.net/)

### Related Files
- [Root CLAUDE.md](../CLAUDE.md) - Project overview
- [Backend CLAUDE.md](../backend/CLAUDE.md) - Backend API
- [Frontend CLAUDE.md](../frontend/CLAUDE.md) - Frontend 3D Museum

---

**Last Updated:** 2025-01-13
**Version:** 1.0.0
