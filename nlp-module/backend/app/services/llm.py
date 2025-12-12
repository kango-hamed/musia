from groq import Groq
import logging
from app.config import settings

logger = logging.getLogger(__name__)

class LLMService:
    """Service d'interaction avec le LLM (Groq/Llama3)"""
    
    def __init__(self):
        self.client = None
        self.model = settings.llm_model
        
    def initialize(self):
        """Initialise le client Groq"""
        try:
            if not settings.groq_api_key:
                logger.warning("GROQ_API_KEY not found in settings!")
                return
                
            self.client = Groq(api_key=settings.groq_api_key)
            logger.info(f"LLM Service initialized with model: {self.model}")
        except Exception as e:
            logger.error(f"Failed to initialize LLM Service: {e}")

    async def generate_response(
        self, 
        prompt: str, 
        system_prompt: str = "Tu es un guide de musée expert et passionné."
    ) -> str:
        """Génère une réponse via Groq"""
        if not self.client:
            self.initialize()
            if not self.client:
                return "Désolé, mon module de génération de langage n'est pas disponible."

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model=self.model,
                temperature=0.7,
                max_tokens=800,
            )
            
            return chat_completion.choices[0].message.content
            
        except Exception as e:
            logger.error(f"LLM Generation Error: {e}")
            return "Désolé, j'ai rencontré une erreur en réfléchissant à votre question."
