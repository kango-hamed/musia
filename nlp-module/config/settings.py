from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Keys
    openai_api_key: str
    anthropic_api_key: str
    
    # Database
    database_url: str
    redis_url: str
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = False
    
    # NLP Config
    stt_model: str = "whisper-1"
    llm_model: str = "claude-sonnet-4-20250514"
    tts_provider: str = "google"  # or "elevenlabs"
    
    # Timeouts (seconds)
    stt_timeout: int = 10
    llm_timeout: int = 5
    tts_timeout: int = 5
    
    class Config:
        env_file = ".env"

settings = Settings()
