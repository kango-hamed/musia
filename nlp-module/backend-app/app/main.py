from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import logging
from pathlib import Path
import uuid
import os
import socketio

from .services import STTService, TTSService, NLPService, KnowledgeBase
from .services.llm import LLMService
from .session_manager import SessionManager
from .rate_limiter import RateLimiter
from .validators import ConversationRequestValidated
from .models import (
    ConversationRequest, 
    ConversationResponse,
    ArtworkResponse,
    ConversationStartRequest
)
from .database import SessionLocal
from .models_sql import VisitorInteraction
from .config import settings
from datetime import datetime

# Configuration logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Resolution des chemins
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
ARTWORKS_PATH = DATA_DIR / "artworks.json"

# Créer dossiers nécessaires (localement pour le runtime)
Path("data/uploads").mkdir(parents=True, exist_ok=True)
Path("data/tts_cache").mkdir(parents=True, exist_ok=True)

# Services globaux
stt_service = STTService(model_size="small", device="cpu")
tts_service = TTSService(voice="fr-FR-DeniseNeural")
nlp_service = NLPService()
knowledge_base = KnowledgeBase(data_path=str(ARTWORKS_PATH))
llm_service = LLMService()

# 🔄 Gestion de sessions (Redis avec fallback en mémoire)
session_manager = SessionManager(redis_url=settings.redis_url)

# 🛡️ Rate Limiter (protection API)
rate_limiter = None  # Sera initialisé après session_manager dans lifespan

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialisation au démarrage"""
    logger.info("🚀 Starting Museum Guide Bot...")
    
    # Initialiser les services
    await stt_service.initialize()
    await nlp_service.initialize()
    await knowledge_base.initialize()  # NEW: Fetch from Musia Backend
    llm_service.initialize()
    
    # Initialiser Redis session manager
    await session_manager.initialize()
    
    # Initialiser Rate Limiter (après session_manager pour accès Redis)
    global rate_limiter
    rate_limiter = RateLimiter(
        redis_client=session_manager.redis,
        max_requests=10,  # 10 requêtes
        window=60  # par minute
    )
    logger.info("🛡️ Rate limiter initialized")
    
    logger.info("✅ All services initialized")
    yield
    
    # Cleanup
    await session_manager.close()
    logger.info("👋 Shutting down...")

# ============================================================================
# Métadonnées OpenAPI / Swagger
# ============================================================================

openapi_tags = [
    {
        "name": "health",
        "description": "Vérification de l'état des services (STT, TTS, NLP, LLM, Redis).",
    },
    {
        "name": "artworks",
        "description": "Gestion des œuvres d'art : liste, détail, narration audio générée par TTS.",
    },
    {
        "name": "trajectories",
        "description": "Parcours guidés : liste, détail, préchargement audio et démarrage de visite.",
    },
    {
        "name": "conversation",
        "description": "Chatbot conversationnel : démarrage de session, question audio (STT→NLP→LLM→TTS) et question texte.",
    },
    {
        "name": "audio",
        "description": "Accès sécurisé aux fichiers audio MP3 générés par le TTS.",
    },
    {
        "name": "voices",
        "description": "Liste des voix Edge TTS disponibles en français.",
    },
    {
        "name": "testing",
        "description": "Endpoints de test rapide pour valider TTS et STT sans session.",
    },
]

# Application FastAPI
app = FastAPI(
    title="Musia — Museum Guide Bot API",
    version="1.0.0",
    description=(
        "## API du robot guide de musée intelligent Musia\n\n"
        "Cette API alimente un robot guide de musée capable de :\n"
        "- **Transcrire des questions audio** (Whisper STT)\n"
        "- **Comprendre l'intention** de l'utilisateur (NLP multilingue)\n"
        "- **Générer des réponses contextuelles** (Groq / Llama 3.1)\n"
        "- **Synthétiser la réponse en audio** (Edge TTS — voix neuronales françaises)\n"
        "- **Gérer des sessions persistantes** (Redis)\n\n"
        "### Swagger UI\n"
        "Explorez et testez tous les endpoints ci-dessous. "
        "Utilisez `/conversation/start` pour créer une session, puis `/conversation/text` pour poser une question.\n\n"
        "### Authentification\n"
        "Pas d'authentification requise pour les endpoints publics. "
        "La clé Groq est configurée côté serveur via `GROQ_API_KEY`.\n\n"
        "### Rate Limiting\n"
        "10 requêtes par minute par IP sur les endpoints de conversation."
    ),
    lifespan=lifespan,
    openapi_tags=openapi_tags,
    contact={
        "name": "Équipe Musia",
        "url": "https://github.com/kango-hamed/musia",
        "email": "contact@musia.ai",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
    swagger_ui_parameters={
        "defaultModelsExpandDepth": 2,
        "defaultModelExpandDepth": 3,
        "displayRequestDuration": True,
        "filter": True,
        "syntaxHighlight.theme": "monokai",
        "tryItOutEnabled": True,
    },
)

# Configuration Socket.IO
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

@sio.event
async def connect(sid, environ):
    logger.info(f"Socket connected: {sid}")
    await sio.emit('response', {'data': 'Connected', 'count': 0}, room=sid)

@sio.event
async def disconnect(sid):
    logger.info(f"Socket disconnected: {sid}")

@sio.event
async def chat_message(sid, data):
    logger.info(f"Message from {sid}: {data}")
    # Traitement simple pour l'instant, connexion avec NLPService à faire
    msg = data.get('message', '')
    if msg:
        # Ici on pourrait appeler nlp_service
        try:
            # Simulation réponse rapide
            response = f"J'ai bien reçu votre message : {msg}"
            # Si on a besoin de nlp_service, on peut l'utiliser ici
            # intent = nlp_service.classify_intent(msg)
            # await sio.emit('chat_response', {'response': response, 'intent': "general"}, room=sid)
             
            # Exemple avec le vrai service (si initialisé)
            # Note: il faut gérer le contexte (artwork_id) qui devrait être passé dans data ou session
            await sio.emit('chat_response', {'response': response}, room=sid)
        except Exception as e:
            logger.error(f"Error in chat_message: {e}")
            await sio.emit('error', {'detail': str(e)}, room=sid)

@sio.event
async def waypoint_reached(sid, data):
    """
    Événement déclenché quand le robot atteint un waypoint
    """
    logger.info(f"Waypoint reached from {sid}: {data}")
    
    try:
        waypoint_index = data.get('waypoint_index', 0)
        artwork_name = data.get('artwork_name', '')
        # Fallback si pas d'ID (accueil)
        artwork_id = data.get('artwork_id', None)
        artist = data.get('artist', '')
        
        # Gestion de session
        session_id = str(sid)
        
        # Initialiser ou mettre à jour la conversation
        session = await session_manager.get_session(session_id)
        if not session:
            session = {
                "current_artwork": artwork_id, 
                "history": [],
                "context": {"waypoint": waypoint_index}
            }
        else:
            session["current_artwork"] = artwork_id
            session["context"]["waypoint"] = waypoint_index
        
        await session_manager.update_session(session_id, session)

        # Générer le texte selon le waypoint
        text = ""
        if waypoint_index == 0:
            # Message d'accueil
            text = "Bonjour et bienvenue au musée virtuel. Je suis votre guide robot. Suivez-moi pour découvrir nos œuvres. Vous pouvez maintenir le bouton micro pour me poser des questions à tout moment."
        else:
            # Description de l'œuvre via LLM (simulé ici pour l'instant, mais on pourrait appeler nlp_service)
            if artist:
                # Prompt pour le LLM pourrait être ici
                text = f"Nous voici devant {artwork_name}, une œuvre magnifique de {artist}. Je suis à votre écoute si vous avez des questions sur cette œuvre."
            else:
                text = f"Voici {artwork_name}. Une œuvre remarquable qui mérite votre attention."
        
        # Générer l'audio avec TTS
        audio_path = await tts_service.synthesize(text)
        
        # Lire le fichier audio et encoder en base64
        with open(audio_path, 'rb') as audio_file:
            import base64
            audio_data = audio_file.read()
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        
        # Envoyer la réponse au frontend AVEC le session_id
        await sio.emit('robot_speech', {
            'type': 'robot_speech',
            'text': text,
            'audio_base64': audio_base64,
            'waypoint_index': waypoint_index,
            'session_id': session_id
        }, room=sid)
        
        logger.info(f"Audio sent for waypoint {waypoint_index} with session {session_id}")
        
    except Exception as e:
        logger.error(f"Error in waypoint_reached: {e}")
        await sio.emit('error', {'detail': str(e)}, room=sid)

# Création de l'application ASGI principale (SocketIO + FastAPI)
sio_app = socketio.ASGIApp(sio, app)

# CORS (pour frontend web)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Monter le dossier frontend pour servir les fichiers statiques
frontend_path = Path(__file__).parent.parent.parent / "frontend"
if frontend_path.exists():
    app.mount("/static", StaticFiles(directory=str(frontend_path)), name="static")

# ============================================================================
# Routes Principales
# ============================================================================

@app.get("/", include_in_schema=False)
async def root():
    """Page d'accueil - redirige vers le frontend"""
    frontend_index = frontend_path / "index.html"
    if frontend_index.exists():
        return FileResponse(frontend_index)
    return {
        "message": "Musia — Museum Guide Bot API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs",
        "redoc": "/redoc",
    }

@app.get("/index.html", include_in_schema=False)
async def index():
    """Sert la page d'accueil du frontend"""
    frontend_index = frontend_path / "index.html"
    if frontend_index.exists():
        return FileResponse(frontend_index)
    raise HTTPException(status_code=404, detail="Frontend not found")

@app.get(
    "/health",
    tags=["health"],
    summary="Statut de l'API et des services",
    description=(
        "Retourne l'état de santé détaillé de tous les services AI et des dépendances externes.\n\n"
        "- `healthy` : tous les services sont opérationnels\n"
        "- `degraded` : Redis indisponible (fallback mémoire actif)\n"
        "- `error` : un service critique est en échec"
    ),
    responses={
        200: {
            "description": "Statut des services",
            "content": {
                "application/json": {
                    "example": {
                        "status": "healthy",
                        "timestamp": "2026-02-26T12:00:00",
                        "services": {
                            "stt": {"status": "ready", "model": "small"},
                            "tts": {"status": "ready", "engine": "edge-tts"},
                            "nlp": {"status": "ready", "model": "sentence-transformers"},
                            "llm": {"status": "ready", "provider": "groq"},
                            "knowledge_base": {"status": "ready", "artworks_cached": 42}
                        },
                        "dependencies": {
                            "redis": {"status": "connected", "mode": "persistent"},
                            "rate_limiter": {"status": "active"}
                        }
                    }
                }
            }
        }
    }
)
async def health_check():
    """Vérification santé de l'API"""
    return {
        "status": "healthy",
        "services": {
            "stt": stt_service.model is not None,
            "tts": True,
            "nlp": nlp_service.embedder is not None,
            "knowledge_base": True
        }
    }

# ============================================================================
# Routes Œuvres
# ============================================================================

@app.get(
    "/artworks",
    response_model=list[ArtworkResponse],
    tags=["artworks"],
    summary="Liste toutes les œuvres",
    description="Retourne la liste complète des œuvres d'art disponibles dans la base de données Musia.",
    responses={
        200: {
            "description": "Liste des œuvres",
            "content": {
                "application/json": {
                    "example": [
                        {
                            "id": "clx123abc",
                            "title": "La Joconde",
                            "artist": "Léonard de Vinci",
                            "year": "1503-1519",
                            "description": "Portrait à l'huile sur panneau de bois de peuplier."
                        }
                    ]
                }
            }
        }
    }
)
async def get_artworks():
    """Liste toutes les œuvres"""
    artworks = await knowledge_base.get_all_artworks()
    return artworks

@app.get(
    "/artworks/{artwork_id}",
    response_model=ArtworkResponse,
    tags=["artworks"],
    summary="Détail d'une œuvre",
    description="Retourne les informations complètes d'une œuvre par son identifiant unique.",
    responses={
        200: {"description": "Œuvre trouvée"},
        404: {"description": "Œuvre introuvable", "content": {"application/json": {"example": {"detail": "Artwork not found"}}}}
    }
)
async def get_artwork(artwork_id: str):
    """Récupère une œuvre spécifique"""
    artwork = await knowledge_base.get_artwork(artwork_id)
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    return artwork

@app.get(
    "/artworks/{artwork_id}/narrative",
    tags=["artworks"],
    summary="Narration audio d'une œuvre",
    description=(
        "Génère et retourne la narration textuelle et audio d'une œuvre d'art.\n\n"
        "**Types disponibles :**\n"
        "- `short` : narration courte (~30s)\n"
        "- `standard` : narration complète (~2min)\n"
        "- `detailed` : narration détaillée avec contexte historique\n"
        "- `kids` : version simplifiée pour enfants"
    ),
    responses={
        200: {
            "description": "Narration générée",
            "content": {
                "application/json": {
                    "example": {
                        "text": "La Joconde, peinte par Léonard de Vinci entre 1503 et 1519...",
                        "audio_url": "/audio/f3a8b2c1d4e5.mp3"
                    }
                }
            }
        },
        404: {"description": "Œuvre ou narration introuvable"}
    }
)
async def get_narrative(artwork_id: str, type: str = "short"):
    """Récupère la narration d'une œuvre"""
    narrative = await knowledge_base.get_narrative(artwork_id, type)
    if not narrative:
        raise HTTPException(status_code=404, detail="Narrative not found")
    audio_path = await tts_service.synthesize(narrative)
    return {
        "text": narrative,
        "audio_url": f"/audio/{Path(audio_path).name}"
    }

# ============================================================================
# Health Check (Detailed)
# ============================================================================

@app.get("/health")
async def health_check():
    """
    Health check détaillé avec statut des services et dépendances
    """
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {},
        "dependencies": {}
    }
    
    # Vérifier services AI
    health_status["services"]["stt"] = {
        "status": "ready" if stt_service.model else "not_initialized",
        "model": stt_service.model_size if hasattr(stt_service, 'model_size') else "unknown"
    }
    
    health_status["services"]["tts"] = {
        "status": "ready",
        "engine": "edge-tts"
    }
    
    health_status["services"]["nlp"] = {
        "status": "ready" if nlp_service.embedder else "not_initialized",
        "model": "sentence-transformers" if nlp_service.embedder else None
    }
    
    health_status["services"]["llm"] = {
        "status": "ready" if llm_service.client else "not_configured",
        "provider": "groq"
    }
    
    health_status["services"]["knowledge_base"] = {
        "status": "ready",
        "artworks_cached": len(knowledge_base.artworks_cache) if hasattr(knowledge_base, 'artworks_cache') else 0
    }
    
    # Vérifier dépendances externes
    try:
        if session_manager.redis:
            await session_manager.redis.ping()
            health_status["dependencies"]["redis"] = {
                "status": "connected",
                "mode": "persistent"
            }
        else:
            health_status["dependencies"]["redis"] = {
                "status": "fallback_memory",
                "mode": "in-memory"
            }
            health_status["status"] = "degraded"  # Dégradé sans Redis
    except Exception as e:
        logger.error(f"Redis health check failed: {e}")
        health_status["dependencies"]["redis"] = {
            "status": "error",
            "error": str(e)
        }
        health_status["status"] = "degraded"
    
    # Vérifier rate limiter
    health_status["dependencies"]["rate_limiter"] = {
        "status": "active" if rate_limiter and rate_limiter.redis else "disabled"
    }
    
    return health_status

# ============================================================================
# Routes Trajectories (Audio Tours) - NEW
# ============================================================================

@app.get(
    "/trajectories",
    tags=["trajectories"],
    summary="Liste tous les parcours",
    description="Retourne tous les parcours guidés disponibles avec leur nombre d'étapes.",
)
async def get_trajectories():
    """Liste tous les parcours disponibles"""
    trajectories = knowledge_base.get_all_trajectories()
    return trajectories

@app.get(
    "/trajectories/{trajectory_id}",
    tags=["trajectories"],
    summary="Détail d'un parcours",
    description="Retourne les détails complets d'un parcours : étapes, œuvres associées et narrations.",
    responses={404: {"description": "Parcours introuvable"}}
)
async def get_trajectory(trajectory_id: str):
    """Récupère les détails d'un parcours"""
    trajectory = await knowledge_base.get_trajectory_details(trajectory_id)
    if not trajectory:
        raise HTTPException(status_code=404, detail="Trajectory not found")
    return trajectory

@app.get(
    "/trajectories/{trajectory_id}/preload",
    tags=["trajectories"],
    summary="Précharger un parcours",
    description=(
        "Précharge toutes les données d'un parcours pour optimiser les performances de la visite guidée. "
        "Génère en avance les audios TTS de chaque étape. À appeler avant de démarrer la visite."
    ),
    responses={404: {"description": "Parcours introuvable"}}
)
async def preload_trajectory(trajectory_id: str):
    """
    Précharge toutes les données d'un parcours pour une visite guidée.
    Retourne une structure optimisée avec tous les artworks et narratives.
    """
    preloaded = await knowledge_base.preload_trajectory(trajectory_id)
    if not preloaded:
        raise HTTPException(status_code=404, detail="Trajectory not found")
    return preloaded

@app.post(
    "/trajectories/{trajectory_id}/start",
    tags=["trajectories"],
    summary="Démarrer une visite guidée",
    description=(
        "Crée une session de visite guidée et retourne la première étape avec son audio TTS pré-généré. "
        "L'`session_id` retourné doit être utilisé pour les questions de conversation."
    ),
    responses={
        200: {
            "description": "Visite démarrée",
            "content": {
                "application/json": {
                    "example": {
                        "session_id": "550e8400-e29b-41d4-a716-446655440000",
                        "trajectory": {"id": "clx456", "name": "Maîtres de la Renaissance"},
                        "current_step": 1,
                        "total_steps": 8,
                        "artwork": {"id": "clx123", "title": "La Joconde"},
                        "narrative_text": "Bienvenue devant La Joconde...",
                        "audio_url": "/audio/f3a8b2c1.mp3"
                    }
                }
            }
        },
        404: {"description": "Parcours introuvable"}
    }
)
async def start_trajectory_visit(trajectory_id: str):
    """
    Démarre une visite guidée basée sur un parcours.
    Crée une session et retourne la première étape.
    """
    preloaded = await knowledge_base.preload_trajectory(trajectory_id)
    if not preloaded:
        raise HTTPException(status_code=404, detail="Trajectory not found")
    
    session_id = str(uuid.uuid4())
    session_data = {
        "current_artwork": preloaded["steps"][0]["artwork"]["id"] if preloaded["steps"] else None,
        "trajectory": preloaded["trajectory"],
        "current_step": 0,
        "total_steps": len(preloaded["steps"]),
        "history": [],
        "context": {}
    }
    await session_manager.create_session(session_id, session_data)
    
    first_step = preloaded["steps"][0] if preloaded["steps"] else None
    
    # Generate audio for first narrative if needed
    audio_url = ""
    if first_step and first_step["narrative"]["text"]:
        try:
            audio_path = await tts_service.synthesize(first_step["narrative"]["text"])
            audio_url = f"/audio/{Path(audio_path).name}"
        except Exception as e:
            logger.error(f"TTS Error: {e}")
    
    return {
        "session_id": session_id,
        "trajectory": preloaded["trajectory"],
        "current_step": 1,
        "total_steps": len(preloaded["steps"]),
        "artwork": first_step["artwork"] if first_step else None,
        "narrative_text": first_step["narrative"]["text"] if first_step else "",
        "audio_url": audio_url or (first_step["narrative"]["audioUrl"] if first_step else "")
    }

# ============================================================================
# Routes Conversation
# ============================================================================

@app.post(
    "/conversation/start",
    tags=["conversation"],
    summary="Démarrer une conversation",
    description=(
        "Crée une nouvelle session de conversation. Si `artworkId` est fourni, le bot se présente "
        "directement l'œuvre et génère un audio d'introduction.\n\n"
        "**Étape 1 du flux conversationnel** — conservez le `session_id` retourné."
    ),
    responses={
        200: {
            "description": "Session créée",
            "content": {
                "application/json": {
                    "example": {
                        "session_id": "550e8400-e29b-41d4-a716-446655440000",
                        "message": "Bonjour ! Je suis votre guide personnel...",
                        "audio_url": "/audio/welcome_abc123.mp3"
                    }
                }
            }
        },
        404: {"description": "Œuvre introuvable"}
    }
)
async def start_conversation(request: ConversationStartRequest):
    """Démarre une nouvelle conversation"""
    artwork_id = request.artwork_id
    
    session_id = str(uuid.uuid4())
    session_data = {
        "current_artwork": artwork_id,
        "history": [],
        "context": {}
    }
    await session_manager.create_session(session_id, session_data)

    if artwork_id:
        artwork = await knowledge_base.get_artwork(artwork_id)
        if not artwork:
            raise HTTPException(status_code=404, detail="Artwork not found")
        
        # Présentation initiale de l'œuvre
        narrative = await knowledge_base.get_narrative(artwork_id, "short")
        text_response = narrative
    else:
        # Message d'accueil générique
        text_response = "Bonjour ! Je suis votre guide personnel. Je peux vous présenter des œuvres ou répondre à vos questions. Par quoi souhaitez-vous commencer ?"

    # Synthèse vocale
    audio_path = await tts_service.synthesize(text_response)
    
    return {
        "session_id": session_id,
        "message": text_response,
        "audio_url": f"/audio/{Path(audio_path).name}"
    }

@app.post(
    "/conversation/ask",
    tags=["conversation"],
    summary="Poser une question audio",
    description=(
        "Traite une question audio de l'utilisateur via le pipeline complet :\n\n"
        "1. **STT** : transcription audio → texte (Whisper)\n"
        "2. **NLP** : classification d'intention\n"
        "3. **LLM** : génération de réponse contextuelle (Groq/Llama3)\n"
        "4. **TTS** : synthèse audio de la réponse (Edge TTS)\n\n"
        "**Format** : `multipart/form-data` avec `session_id` (texte) et `audio_file` (fichier MP3/WAV/M4A/OGG)."
    ),
    responses={
        200: {
            "description": "Réponse générée",
            "content": {
                "application/json": {
                    "example": {
                        "session_id": "550e8400-e29b-41d4-a716-446655440000",
                        "user_input": "Qui a peint cette œuvre ?",
                        "intent": "factual",
                        "response": "Cette œuvre a été peinte par Léonard de Vinci vers 1503.",
                        "audio_url": "/audio/response_abc123.mp3",
                        "confidence": 0.94
                    }
                }
            }
        },
        404: {"description": "Session introuvable"},
        500: {"description": "Erreur de traitement audio ou LLM"}
    }
)
async def ask_question(
    session_id: str = Form(..., description="UUID de session (obtenu via /conversation/start)"),
    audio_file: UploadFile = File(..., description="Fichier audio (MP3, WAV, M4A, OGG — max 10 Mo)")
):
    """
    Traite une question audio de l'utilisateur
    
    Flow:
    1. Audio → STT (transcription)
    2. Texte → NLP (classification + matching FAQ)
    3. Réponse → TTS (génération audio)
    """
    
    # Vérifier session
    conversation = await session_manager.get_session(session_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Session not found")
    
    artwork_id = conversation["current_artwork"]
    
    try:
        # 1. Sauvegarder l'audio temporairement
        audio_path = f"data/uploads/{uuid.uuid4()}.wav"
        with open(audio_path, "wb") as f:
            content = await audio_file.read()
            f.write(content)
        
        # 2. STT - Transcription
        logger.info("Transcribing audio...")
        transcription = await stt_service.transcribe(audio_path)
        user_text = transcription["text"]
        logger.info(f"User said: {user_text}")
        
        # Nettoyer le fichier temporaire
        os.remove(audio_path)
        
        # 3. NLP - Classification & RAG
        intent = nlp_service.classify_intent(user_text)
        logger.info(f"Intent classified: {intent}")
        
        # RAG Generation
        artwork = await knowledge_base.get_artwork(artwork_id)
        response_text = await nlp_service.generate_rag_response(
            question=user_text,
            artwork_data=artwork,
            llm_service=llm_service,
            history=conversation["history"]
        )
        logger.info("Response generated by LLM")
        
        # 5. TTS - Synthèse vocale (Robuste avec fallback)
        audio_url = ""
        try:
            audio_response_path = await tts_service.synthesize(response_text)
            audio_url = f"/audio/{Path(audio_response_path).name}"
        except Exception as e:
            logger.error(f"TTS Error: {e}")
            # ✅ FALLBACK : Ajouter un message utilisateur
            response_text += " (Synthèse vocale temporairement indisponible)"
            # Note: Vous pourriez également créer un fichier audio de fallback
        
        # 6. Sauvegarder l'historique
        conversation["history"].append({
            "user": user_text,
            "bot": response_text,
            "intent": intent
        })
        await session_manager.update_session(session_id, conversation)
        
        # Log DB
        await log_interaction(session_id, user_text, response_text, intent, audio_path=audio_response_path)
        
        return {
            "session_id": session_id,
            "user_input": user_text,
            "intent": intent,
            "response": response_text,
            "audio_url": audio_url,
            "confidence": transcription["confidence"]
        }
        
    except Exception as e:
        logger.error(f"Error processing question: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post(
    "/conversation/text",
    tags=["conversation"],
    summary="Poser une question en texte",
    description=(
        "Version texte du chatbot — idéale pour les tests sans audio.\n\n"
        "Pipeline : NLP → LLM → TTS (réponse audio générée quand même).\n\n"
        "**Requiert une session active** créée via `/conversation/start`."
    ),
    response_model=ConversationResponse,
    responses={
        200: {
            "description": "Réponse du chatbot",
            "content": {
                "application/json": {
                    "example": {
                        "session_id": "550e8400-e29b-41d4-a716-446655440000",
                        "user_input": "Quelle technique a été utilisée ?",
                        "intent": "technical",
                        "response": "La sfumatura est la technique emblématique de Léonard de Vinci.",
                        "audio_url": "/audio/response_def456.mp3"
                    }
                }
            }
        },
        404: {"description": "Session introuvable"}
    }
)
async def ask_question_text(request: ConversationRequest) -> ConversationResponse:
    """
    Version texte (pour tests sans audio)
    """
    conversation = await session_manager.get_session(request.session_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Session not found")
    
    artwork_id = conversation["current_artwork"]
    
    try:
        # NLP
        intent = nlp_service.classify_intent(request.message)
        
        # RAG Generation
        artwork = await knowledge_base.get_artwork(artwork_id)
        response_text = await nlp_service.generate_rag_response(
            question=request.message,
            artwork_data=artwork,
            llm_service=llm_service,
            history=conversation["history"]
        )
        
        # Log DB (Async)
        await log_interaction(request.session_id, request.message, response_text, intent)
        
        # TTS (avec gestion d'erreur robuste et fallback)
        audio_url = ""
        try:
            audio_path = await tts_service.synthesize(response_text)
            audio_url = f"/audio/{Path(audio_path).name}"
        except Exception as e:
            logger.error(f"TTS Error: {e}")
            # ✅ FALLBACK : Informer l'utilisateur du problème audio
            response_text += " (Audio indisponible)"
        
        return ConversationResponse(
            session_id=request.session_id,
            user_input=request.message,
            intent=intent,
            response=response_text,
            audio_url=audio_url
        )
        
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get(
    "/conversation/{session_id}/history",
    tags=["conversation"],
    summary="Historique d'une session",
    description="Retourne l'historique complet des échanges (questions + réponses + intentions) d'une session.",
    responses={
        200: {
            "description": "Historique",
            "content": {
                "application/json": {
                    "example": [
                        {"user": "Qui a peint ?", "bot": "Léonard de Vinci", "intent": "factual"},
                        {"user": "En quelle année ?", "bot": "Vers 1503", "intent": "temporal"}
                    ]
                }
            }
        },
        404: {"description": "Session introuvable"}
    }
)
async def get_conversation_history(session_id: str):
    """Récupère l'historique d'une conversation"""
    conversation = await session_manager.get_session(session_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return conversation.get("history", [])

# ============================================================================
# Routes Audio
# ============================================================================

@app.get(
    "/audio/{filename}",
    tags=["audio"],
    summary="Télécharger un fichier audio",
    description=(
        "Sert les fichiers audio MP3 générés par le TTS.\n\n"
        "**Sécurité** : protection contre path traversal, validation de l'extension `.mp3`, "
        "et restriction au répertoire `data/tts_cache/`."
    ),
    response_description="Fichier audio MP3",
    responses={
        200: {"description": "Fichier MP3", "content": {"audio/mpeg": {}}},
        400: {"description": "Extension ou nom de fichier invalide"},
        403: {"description": "Accès refusé (path traversal détecté)"},
        404: {"description": "Fichier audio introuvable"}
    }
)
async def get_audio(filename: str):
    """Sert les fichiers audio générés (SÉCURISÉ)"""
    # ✅ SÉCURISATION contre Path Traversal
    
    # 1. Extraire uniquement le nom de fichier (pas de répertoire)
    safe_filename = Path(filename).name
    
    # 2. Valider l'extension
    if not safe_filename.endswith('.mp3'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .mp3 files are allowed")
    
    # 3. Bloquer les noms suspects
    if safe_filename.startswith('.') or len(safe_filename) > 100:
        raise HTTPException(status_code=400, detail="Invalid filename format")
    
    # 4. Construire le chemin sécurisé
    cache_dir = Path("data/tts_cache").resolve()
    audio_path = (cache_dir / safe_filename).resolve()
    
    # 5. Vérifier que le fichier est bien dans le répertoire autorisé
    try:
        audio_path.relative_to(cache_dir)
    except ValueError:
        # Le fichier est en dehors du cache
        raise HTTPException(status_code=403, detail="Access denied")
    
    # 6. Vérifier l'existence du fichier
    if not audio_path.exists():
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    return FileResponse(
        audio_path,
        media_type="audio/mpeg",
        filename=safe_filename
    )


# ============================================================================
# Lifespan Events (Startup/Shutdown)
# ============================================================================
# NOTE: Lifespan is already defined at the top of the file (line 49-62)
# This section is kept for documentation purposes only



# ============================================================================
# Logging Function
# ============================================================================

async def log_interaction(
    session_id: str,
    user_text: str,
    response_text: str,
    intent: str,
    audio_path: str = None,
    success: bool = True
):
    """Log l'interaction en base de données"""
    try:
        async with SessionLocal() as session:
            interaction = VisitorInteraction(
                # visitId non disponible pour le moment (session anonyme)
                interactionType="question",
                questionText=user_text,
                detectedIntent=intent,
                intentConfidence=0.0, # À récupérer du STT si dispo
                responseText=response_text,
                responseSource="llm_generated", # Par défaut
                wasSuccessful=success
            )
            session.add(interaction)
            await session.commit()
    except Exception as e:
        logger.error(f"Failed to log interaction: {e}")

# ============================================================================
# Routes Utilitaires
# ============================================================================

@app.get(
    "/voices",
    tags=["voices"],
    summary="Voix TTS disponibles",
    description="Liste toutes les voix Edge TTS disponibles en français (fr-FR, fr-CA).",
    responses={
        200: {
            "description": "Liste des voix",
            "content": {
                "application/json": {
                    "example": [
                        {"name": "fr-FR-DeniseNeural", "locale": "fr-FR", "gender": "Female"},
                        {"name": "fr-FR-HenriNeural", "locale": "fr-FR", "gender": "Male"}
                    ]
                }
            }
        }
    }
)
async def get_available_voices():
    """Liste les voix TTS disponibles"""
    voices = await tts_service.get_available_voices("fr")
    return voices

@app.post(
    "/test/tts",
    tags=["testing"],
    summary="Test TTS",
    description="Synthétise un texte en audio et retourne l'URL du fichier MP3 généré. Ne nécessite pas de session.",
    responses={
        200: {
            "description": "Audio généré",
            "content": {"application/json": {"example": {"text": "Bonjour !", "audio_url": "/audio/test_abc.mp3"}}}
        }
    }
)
async def test_tts(text: str = "Bonjour, je suis votre guide !"):
    """Test rapide de synthèse vocale"""
    audio_path = await tts_service.synthesize(text)
    return {
        "text": text,
        "audio_url": f"/audio/{Path(audio_path).name}"
    }

@app.post(
    "/test/stt",
    tags=["testing"],
    summary="Test STT",
    description="Transcrit un fichier audio en texte sans nécessiter de session. Utile pour valider la configuration Whisper.",
    responses={
        200: {
            "description": "Transcription",
            "content": {"application/json": {"example": {"text": "Qui a peint cette œuvre ?", "confidence": 0.92, "language": "fr"}}}
        }
    }
)
async def test_stt(audio: UploadFile = File(..., description="Fichier audio à transcrire (MP3, WAV, M4A, OGG)")):
    """Test rapide de transcription"""
    audio_path = f"data/uploads/{uuid.uuid4()}.wav"
    with open(audio_path, "wb") as f:
        content = await audio.read()
        f.write(content)
    result = await stt_service.transcribe(audio_path)
    os.remove(audio_path)
    return result

# ============================================================================
# Gestion des erreurs
# ============================================================================

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "error": str(exc)
        }
    )
