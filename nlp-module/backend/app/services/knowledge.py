import json
from typing import Optional, Dict, List
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

class KnowledgeBase:
    """Gestion de la base de connaissances des œuvres"""
    
    def __init__(self, data_path: str = "data/artworks.json"):
        self.data_path = Path(data_path)
        self.artworks: Dict[str, Dict] = {}
        self.load_data()
    
    def load_data(self):
        """Charge les données des œuvres"""
        if not self.data_path.exists():
            logger.warning(f"Knowledge base not found: {self.data_path}")
            return
        
        try:
            with open(self.data_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.artworks = {
                    artwork["id"]: artwork 
                    for artwork in data.get("artworks", [])
                }
            logger.info(f"Loaded {len(self.artworks)} artworks")
        
        except Exception as e:
            logger.error(f"Error loading knowledge base: {e}")
    
    def get_artwork(self, artwork_id: str) -> Optional[Dict]:
        """Récupère une œuvre par son ID"""
        return self.artworks.get(artwork_id)
    
    def get_all_artworks(self) -> List[Dict]:
        """Récupère toutes les œuvres"""
        return list(self.artworks.values())
    
    def get_artwork_faq(self, artwork_id: str) -> List[Dict]:
        """Récupère les FAQs d'une œuvre"""
        artwork = self.get_artwork(artwork_id)
        if artwork:
            return artwork.get("faq", [])
        return []
    
    def get_narrative(self, artwork_id: str, type: str = "short") -> Optional[str]:
        """Récupère la narration d'une œuvre"""
        artwork = self.get_artwork(artwork_id)
        if artwork and "narratives" in artwork:
            return artwork["narratives"].get(type)
        return None
    
    def search_artworks(self, query: str) -> List[Dict]:
        """Recherche d'œuvres par mots-clés"""
        query_lower = query.lower()
        results = []
        
        for artwork in self.artworks.values():
            searchable = f"{artwork['title']} {artwork['artist']} {artwork.get('description', '')}".lower()
            if query_lower in searchable:
                results.append(artwork)
        
        return results