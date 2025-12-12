import edge_tts
import asyncio
from pathlib import Path
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class TTSService:
    """Service de synthèse vocale"""
    
    def __init__(self, voice: str = "fr-FR-DeniseNeural"):
        self.voice = voice
        self.cache_dir = Path("data/tts_cache")
        self.cache_dir.mkdir(parents=True, exist_ok=True)
    
    async def synthesize(self, text: str, output_path: Optional[str] = None) -> str:
        """
        Convertit du texte en audio
        
        Args:
            text: Texte à synthétiser
            output_path: Chemin de sortie (optionnel)
            
        Returns:
            Chemin du fichier audio créé
        """
        if not output_path:
            import hashlib
            text_hash = hashlib.md5(text.encode()).hexdigest()
            output_path = str(self.cache_dir / f"{text_hash}.mp3")
        
        # Vérifier le cache
        if Path(output_path).exists():
            logger.info(f"Using cached TTS: {output_path}")
            return output_path
        
        try:
            communicate = edge_tts.Communicate(text, self.voice)
            await communicate.save(output_path)
            logger.info(f"TTS generated: {output_path}")
            return output_path
            
        except Exception as e:
            logger.error(f"TTS Error: {e}")
            raise
    
    async def get_available_voices(self, language: str = "fr") -> list:
        """Liste les voix disponibles pour une langue"""
        voices = await edge_tts.list_voices()
        return [
            v for v in voices 
            if v["Locale"].startswith(language)
        ]