from typing import List, Dict, Optional, Tuple
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re
import logging

logger = logging.getLogger(__name__)

class NLPService:
    """Service de traitement du langage naturel"""
    
    def __init__(self):
        self.embedder = None
        self.intents = {
            "factual": ["qui", "quoi", "quel", "quelle", "c'est qui", "c'est quoi"],
            "temporal": ["quand", "date", "époque", "année", "période"],
            "technical": ["comment", "technique", "matériau", "créé", "fait"],
            "contextual": ["pourquoi", "raison", "signification", "symbolisme"],
            "comparison": ["différence", "comparé", "versus", "vs", "contrairement"],
            "anecdote": ["histoire", "anecdote", "raconter", "petite histoire"],
            "navigation": ["suivant", "précédent", "autre", "continuer", "passer"],
            "practical": ["toilettes", "sortie", "café", "restaurant", "horaire"]
        }
    
    async def initialize(self):
        """Charge le modèle d'embeddings"""
        logger.info("Loading sentence transformer model...")
        import asyncio
        loop = asyncio.get_event_loop()
        self.embedder = await loop.run_in_executor(
            None,
            lambda: SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
        )
        logger.info("NLP model loaded successfully")
    
    def classify_intent(self, text: str) -> str:
        """
        Classifie l'intention d'une question
        
        Returns:
            Type d'intention (factual, temporal, etc.)
        """
        text_lower = text.lower()
        
        # Règles simples basées sur mots-clés
        for intent, keywords in self.intents.items():
            if any(kw in text_lower for kw in keywords):
                return intent
        
        return "general"
    
    def extract_keywords(self, text: str) -> List[str]:
        """Extrait les mots-clés d'une phrase"""
        # Stopwords français basiques
        stopwords = {
            "le", "la", "les", "un", "une", "des", "de", "du", "à", "au", 
            "est", "sont", "et", "ou", "mais", "donc", "car", "que", "qui",
            "quoi", "comment", "pourquoi", "quand", "où", "ce", "cette", "ces"
        }
        
        # Nettoyer et tokenizer
        words = re.findall(r'\b\w+\b', text.lower())
        keywords = [w for w in words if w not in stopwords and len(w) > 2]
        
        return keywords
    
    async def find_best_faq(
        self, 
        question: str, 
        faq_list: List[Dict],
        threshold: float = 0.6
    ) -> Optional[Dict]:
        """
        Trouve la meilleure FAQ correspondante
        
        Args:
            question: Question de l'utilisateur
            faq_list: Liste des FAQs disponibles
            threshold: Seuil de similarité minimum
            
        Returns:
            FAQ correspondante ou None
        """
        if not self.embedder:
            await self.initialize()
        
        if not faq_list:
            return None
        
        # Méthode 1: Matching par mots-clés
        keywords = self.extract_keywords(question)
        
        for faq in faq_list:
            faq_keywords = faq.get("keywords", [])
            matches = sum(1 for kw in keywords if kw in " ".join(faq_keywords))
            if matches >= 2:  # Au moins 2 mots-clés en commun
                logger.info(f"FAQ matched by keywords: {faq['question']}")
                return faq
        
        # Méthode 2: Similarité sémantique (embeddings)
        try:
            question_emb = self.embedder.encode([question])
            faq_questions = [faq["question"] for faq in faq_list]
            faq_embs = self.embedder.encode(faq_questions)
            
            similarities = cosine_similarity(question_emb, faq_embs)[0]
            best_idx = np.argmax(similarities)
            best_score = similarities[best_idx]
            
            if best_score >= threshold:
                logger.info(f"FAQ matched by similarity ({best_score:.2f}): {faq_list[best_idx]['question']}")
                return faq_list[best_idx]
        
        except Exception as e:
            logger.error(f"Embedding error: {e}")
        
        return None
    
    async def generate_rag_response(
        self, 
        question: str, 
        artwork_data: Dict, 
        llm_service,
        history: List[Dict] = None
    ) -> str:
        """Génère une réponse intelligente (RAG) via LangChain"""
        
        from langchain_core.prompts import ChatPromptTemplate
        
        # 1. Construire le contexte
        if artwork_data:
            context_text = f"TITRE: {artwork_data.get('title', 'Œuvre inconnue')}\n"
            context_text += f"ARTISTE: {artwork_data.get('artist', 'Inconnu')}\n"
            context_text += f"DATE: {artwork_data.get('year', 'Inconnue')}\n"
            context_text += f"DESCRIPTION: {artwork_data.get('description', '')}\n"
            context_text += f"DETAILS: {artwork_data.get('narratives', {}).get('long', '')}\n"
            
            for faq in artwork_data.get('faq', []):
                context_text += f"- Q: {faq['question']} | R: {faq['answer']}\n"
        else:
            context_text = "Le visiteur n'est devant aucune œuvre spécifique pour le moment. Tu es un guide général du musée."

        # 2. Enrichir le contexte avec la meilleure FAQ trouvée
        if artwork_data:
            faq_list = artwork_data.get('faq', [])
            best_faq = await self.find_best_faq(question, faq_list)
            
            if best_faq:
                logger.info(f"Injecting best FAQ into context: {best_faq['question']}")
                # On place l'info pertinente au DÉBUT du contexte pour attirer l'attention du LLM
                context_text = f"INFORMATION PERTINENTE:\nQ: {best_faq['question']}\nR: {best_faq['answer']}\n\n" + context_text

        # 3. Template LangChain
        template = ChatPromptTemplate.from_messages([
            ("system", """Tu es Musia, un guide de musée virtuel expert.
            Réponds aux questions des visiteurs sur l'œuvre présentée.
            Utilise le contexte suivant pour répondre:
            {context}
            
            Si la réponse n'est pas dans le contexte, dis-le poliment et propose une information intéressante sur l'œuvre."""),
            ("human", "{question}"),
        ])
        
        # 4. Génération via LLMService
        # On passe le system prompt enrichi au service
        system_content = template.format_messages(context=context_text, question=question)[0].content
        
        return await llm_service.generate_response(
            prompt=question, 
            system_prompt=system_content,
            history=history
        )