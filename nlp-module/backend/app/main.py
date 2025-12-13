from fastapi import FastAPI, UploadFile, File, HTTPException
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
from .models import (
    ConversationRequest, 
    ConversationResponse,
    ArtworkResponse
)
from .database import SessionLocal
from .models_sql import VisitorInteraction

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
stt_service = STTService(model_size="base", device="cpu")
tts_service = TTSService(voice="fr-FR-DeniseNeural")
nlp_service = NLPService()
knowledge_base = KnowledgeBase(data_path=str(ARTWORKS_PATH))
llm_service = LLMService()

# Contexte conversationnel en mémoire (pour démo)
conversations = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialisation au démarrage"""
    logger.info("🚀 Starting Museum Guide Bot...")
    
    # Initialiser les services
    await stt_service.initialize()
    await nlp_service.initialize()
    llm_service.initialize()
    
    logger.info("✅ All services initialized")
    yield
    logger.info("👋 Shutting down...")

# Application FastAPI
app = FastAPI(
    title="Museum Guide Bot API",
    version="1.0.0",
    description="API pour robot guide de musée intelligent",
    lifespan=lifespan
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
        if session_id not in conversations:
            conversations[session_id] = {
                "current_artwork": artwork_id, 
                "history": [],
                "context": {"waypoint": waypoint_index}
            }
        else:
            conversations[session_id]["current_artwork"] = artwork_id
            conversations[session_id]["context"]["waypoint"] = waypoint_index

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

@app.get("/")
async def root():
    """Page d'accueil - redirige vers le frontend"""
    frontend_index = frontend_path / "index.html"
    if frontend_index.exists():
        return FileResponse(frontend_index)
    return {
        "message": "Museum Guide Bot API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/index.html")
async def index():
    """Sert la page d'accueil du frontend"""
    frontend_index = frontend_path / "index.html"
    if frontend_index.exists():
        return FileResponse(frontend_index)
    raise HTTPException(status_code=404, detail="Frontend not found")

@app.get("/health")
async def health_check():
    """Vérification santé de l'API"""
    return {
        "status": "healthy",
        "services": {
            "stt": stt_service.model is not None,
            "tts": True,
            "nlp": nlp_service.embedder is not None,
            "knowledge_base": True # knowledge_base.artworks_cache is present
        }
    }

# ============================================================================
# Routes Œuvres
# ============================================================================

@app.get("/artworks", response_model=list[ArtworkResponse])
async def get_artworks():
    """Liste toutes les œuvres"""
    artworks = await knowledge_base.get_all_artworks()
    return artworks

@app.get("/artworks/{artwork_id}", response_model=ArtworkResponse)
async def get_artwork(artwork_id: str):
    """Récupère une œuvre spécifique"""
    artwork = await knowledge_base.get_artwork(artwork_id)
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    return artwork

@app.get("/artworks/{artwork_id}/narrative")
async def get_narrative(artwork_id: str, type: str = "short"):
    """Récupère la narration d'une œuvre"""
    narrative = await knowledge_base.get_narrative(artwork_id, type)
    if not narrative:
        raise HTTPException(status_code=404, detail="Narrative not found")
    
    # Générer l'audio
    audio_path = await tts_service.synthesize(narrative)
    
    return {
        "text": narrative,
        "audio_url": f"/audio/{Path(audio_path).name}"
    }

# ============================================================================
# Routes Conversation
# ============================================================================

@app.post("/conversation/start")
async def start_conversation(artwork_id: str):
    """Démarre une nouvelle conversation"""
    artwork = await knowledge_base.get_artwork(artwork_id)
    if not artwork:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    session_id = str(uuid.uuid4())
    conversations[session_id] = {
        "current_artwork": artwork_id,
        "history": [],
        "context": {}
    }
    
    # Présentation initiale
    narrative = await knowledge_base.get_narrative(artwork_id, "short")
    audio_path = await tts_service.synthesize(narrative)
    
    return {
        "session_id": session_id,
        "message": narrative,
        "audio_url": f"/audio/{Path(audio_path).name}"
    }

@app.post("/conversation/ask")
async def ask_question(
    session_id: str,
    audio: UploadFile = File(...)
):
    """
    Traite une question audio de l'utilisateur
    
    Flow:
    1. Audio → STT (transcription)
    2. Texte → NLP (classification + matching FAQ)
    3. Réponse → TTS (génération audio)
    """
    
    # Vérifier session
    if session_id not in conversations:
        raise HTTPException(status_code=404, detail="Session not found")
    
    conversation = conversations[session_id]
    artwork_id = conversation["current_artwork"]
    
    try:
        # 1. Sauvegarder l'audio temporairement
        audio_path = f"data/uploads/{uuid.uuid4()}.wav"
        with open(audio_path, "wb") as f:
            content = await audio.read()
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
        
        # 5. TTS - Synthèse vocale (Robuste)
        audio_url = ""
        try:
            audio_response_path = await tts_service.synthesize(response_text)
            audio_url = f"/audio/{Path(audio_response_path).name}"
        except Exception as e:
            logger.error(f"TTS Error ignored: {e}")
        
        # 6. Sauvegarder l'historique
        conversation["history"].append({
            "user": user_text,
            "bot": response_text,
            "intent": intent
        })
        
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

@app.post("/conversation/text")
async def ask_question_text(request: ConversationRequest) -> ConversationResponse:
    """
    Version texte (pour tests sans audio)
    """
    if request.session_id not in conversations:
        raise HTTPException(status_code=404, detail="Session not found")
    
    conversation = conversations[request.session_id]
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
        
        # TTS (avec gestion d'erreur robuste)
        audio_url = ""
        try:
            audio_path = await tts_service.synthesize(response_text)
            audio_url = f"/audio/{Path(audio_path).name}"
        except Exception as e:
            logger.error(f"TTS Error ignored: {e}")
        
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

@app.get("/conversation/{session_id}/history")
async def get_conversation_history(session_id: str):
    """Récupère l'historique d'une conversation"""
    if session_id not in conversations:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return conversations[session_id]["history"]

# ============================================================================
# Routes Audio
# ============================================================================

@app.get("/audio/{filename}")
async def get_audio(filename: str):
    """Sert les fichiers audio générés"""
    audio_path = Path("data/tts_cache") / filename
    if not audio_path.exists():
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    return FileResponse(
        audio_path,
        media_type="audio/mpeg",
        filename=filename
    )

# ============================================================================
# Lifespan Events (Startup/Shutdown)
# ============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup events
    for folder in [DATA_DIR / "uploads", DATA_DIR / "tts_cache"]:
        folder.mkdir(parents=True, exist_ok=True)
    yield
    # Cleanup (Shutdown events)

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

@app.get("/voices")
async def get_available_voices():
    """Liste les voix TTS disponibles"""
    voices = await tts_service.get_available_voices("fr")
    return voices

@app.post("/test/tts")
async def test_tts(text: str):
    """Test rapide de synthèse vocale"""
    audio_path = await tts_service.synthesize(text)
    return {
        "text": text,
        "audio_url": f"/audio/{Path(audio_path).name}"
    }

@app.post("/test/stt")
async def test_stt(audio: UploadFile = File(...)):
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
