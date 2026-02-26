import asyncio
from pathlib import Path
from typing import Optional
import whisper
import logging

logger = logging.getLogger(__name__)

class STTService:
    """Service de transcription audio vers texte"""
    
    def __init__(self, model_size: str = "base", device: str = "cpu"):
        self.model_size = model_size
        self.device = device
        self.model = None
        
    async def initialize(self):
        """Charge le modèle Whisper"""
        logger.info(f"Loading Whisper model: {self.model_size}")
        loop = asyncio.get_event_loop()
        self.model = await loop.run_in_executor(
            None,
            lambda: whisper.load_model(self.model_size, device=self.device)
        )
        logger.info("Whisper model loaded successfully")
    
    async def transcribe(self, audio_path: str, language: str = "fr") -> dict:
        """
        Transcrit un fichier audio
        
        Args:
            audio_path: Chemin vers le fichier audio
            language: Code langue (fr, en, etc.)
            
        Returns:
            dict avec 'text', 'language', 'confidence'
        """
        if not self.model:
            await self.initialize()
        
        try:
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(
                None,
                lambda: self.model.transcribe(
                    audio_path,
                    language=language,
                    fp16=False  # Disable FP16 for CPU compatibility
                )
            )
            
            # Extract text and metadata from result
            text = result.get("text", "").strip()
            detected_language = result.get("language", language)
            
            # Calculate average confidence from segments if available
            segments = result.get("segments", [])
            avg_confidence = 0.0
            if segments:
                confidences = [seg.get("no_speech_prob", 0.0) for seg in segments]
                avg_confidence = 1.0 - (sum(confidences) / len(confidences))
            
            return {
                "text": text,
                "language": detected_language,
                "confidence": avg_confidence
            }
            
        except Exception as e:
            logger.error(f"STT Error: {e}")
            raise
