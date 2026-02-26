import base64
import io
from gtts import gTTS
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class TTSService:
    """Service de synthèse vocale pour le robot guide"""
    
    def __init__(self, language: str = 'fr'):
        self.language = language
    
    def text_to_speech(self, text: str, slow: bool = False) -> Optional[str]:
        """
        Convertit du texte en audio et retourne en base64
        
        Args:
            text: Texte à convertir
            slow: Si True, parle plus lentement
            
        Returns:
            Audio encodé en base64 ou None si erreur
        """
        try:
            # Créer l'objet TTS
            tts = gTTS(text=text, lang=self.language, slow=slow)
            
            # Sauvegarder dans un buffer mémoire
            audio_buffer = io.BytesIO()
            tts.write_to_fp(audio_buffer)
            audio_buffer.seek(0)
            
            # Encoder en base64
            audio_base64 = base64.b64encode(audio_buffer.read()).decode('utf-8')
            
            logger.info(f"Audio généré pour: {text[:50]}...")
            return audio_base64
            
        except Exception as e:
            logger.error(f"Erreur TTS: {e}")
            return None
    
    def generate_welcome_message(self) -> str:
        """Génère le message d'accueil"""
        return "Bonjour et bienvenue au musée virtuel. Je suis votre guide robot. Suivez-moi pour découvrir nos œuvres."
    
    def generate_artwork_description(self, artwork_name: str, artist: str = None) -> str:
        """
        Génère une description basique d'une œuvre
        (Sera remplacé par le LLM plus tard)
        """
        if artist:
            return f"Nous voici devant {artwork_name}, une œuvre magnifique de {artist}. Prenez le temps de l'admirer."
        else:
            return f"Voici {artwork_name}. Une œuvre remarquable qui mérite votre attention."

# Instance globale
tts_service = TTSService()
