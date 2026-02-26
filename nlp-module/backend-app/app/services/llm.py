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
        system_prompt: str = "Tu es un guide de musée expert et passionné.",
        history: list = None
    ) -> str:
        """Génère une réponse via ChatGroq (LangChain)"""
        if not settings.groq_api_key:
            return "Clé API non configurée."

        try:
            from langchain_groq import ChatGroq
            from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
            
            chat = ChatGroq(
                temperature=0.7, 
                model_name=self.model, 
                groq_api_key=settings.groq_api_key
            )
            
            messages = [SystemMessage(content=system_prompt)]
            
            # Ajouter l'historique si présent
            if history:
                for msg in history:
                    if msg.get('user'):
                        messages.append(HumanMessage(content=msg['user']))
                    if msg.get('bot'):
                        messages.append(AIMessage(content=msg['bot']))
            
            messages.append(HumanMessage(content=prompt))
            
            response = await chat.ainvoke(messages)
            return response.content
            
        except Exception as e:
            logger.error(f"LangChain Generation Error: {e}")
            return "Désolé, une erreur est survenue lors de la génération de la réponse."
