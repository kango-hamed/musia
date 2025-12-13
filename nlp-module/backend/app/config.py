import os
from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    # App
    app_name: str = "Museum Guide Bot"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    # Paths
    data_dir: Path = Path("data")
    uploads_dir: Path = Path("data/uploads")
    tts_cache_dir: Path = Path("data/tts_cache")
    
    # STT
    whisper_model: str = "base"
    whisper_device: str = "cpu"
    whisper_compute_type: str = "int8"
    
    # TTS
    tts_voice: str = "fr-FR-DeniseNeural"
    
    # NLP
    intent_threshold: float = 0.6
    max_response_length: int = 300
    
    # LLM
    groq_api_key: str = os.getenv("GROQ_API_KEY")
    llm_model: str = "llama-3.1-8b-instant"

    # Database (Neon)
    database_url: str = os.getenv("DATABASE_URL")
    
    # WebSocket / Redis
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379")

    # Storage (S3/MinIO)
    s3_endpoint: str = os.getenv("S3_ENDPOINT", "http://localhost:9000")
    s3_access_key: str = os.getenv("S3_ACCESS_KEY", "minioadmin")
    s3_secret_key: str = os.getenv("S3_SECRET_KEY", "minioadmin")
    s3_bucket: str = "museum-assets"
    
    class Config:
        env_file = (".env", "../.env")
        extra = "ignore"

settings = Settings()