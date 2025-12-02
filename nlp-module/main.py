from fastapi import FastAPI
from loguru import logger
import sys

# Configure logger
logger.remove()
logger.add(
    sys.stdout,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan> - <level>{message}</level>",
    level="INFO"
)

app = FastAPI(
    title="Robot Guide NLP Service",
    description="Service de traitement du langage naturel pour robot guide",
    version="1.0.0"
)

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "nlp"
    }

@app.post("/process-question")
async def process_question(audio_data: bytes):
    """
    Traite une question audio complète : STT → NLP → TTS
    """
    # À implémenter dans les sprints suivants
    pass

if __name__ == "__main__":
    import uvicorn
    from config.settings import settings
    
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
