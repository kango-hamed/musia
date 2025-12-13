import json
from typing import Optional, Dict, List
from pathlib import Path
import logging
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from ..database import SessionLocal
from ..models_sql import Artwork, NarrativeContent
from ..config import settings

logger = logging.getLogger(__name__)

class KnowledgeBase:
    """Gestion de la base de connaissances des œuvres (Hybride SQL/JSON)"""
    
    def __init__(self, data_path: str = "data/artworks.json"):
        self.data_path = Path(data_path)
        self.artworks_cache: Dict[str, Dict] = {}
        self.use_db = bool(settings.database_url)
        # On charge toujours le JSON comme fallback ou cache initial
        self.load_json_data()
    
    def load_json_data(self):
        """Charge les données JSON en mémoire"""
        if not self.data_path.exists():
            logger.warning(f"Knowledge base not found: {self.data_path}")
            return
        
        try:
            with open(self.data_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.artworks_cache = {
                    artwork["id"]: artwork 
                    for artwork in data.get("artworks", [])
                }
            logger.info(f"Loaded {len(self.artworks_cache)} artworks from JSON")
        except Exception as e:
            logger.error(f"Error loading knowledge base: {e}")

    async def get_artwork(self, artwork_id: str) -> Optional[Dict]:
        """Récupère une œuvre (DB > JSON)"""
        if self.use_db and SessionLocal:
            try:
                async with SessionLocal() as session:
                    # Eager loading des contenus narratifs
                    stmt = select(Artwork).options(selectinload(Artwork.narrative_contents)).where(Artwork.id == artwork_id)
                    result = await session.execute(stmt)
                    artwork_model = result.scalar_one_or_none()
                    if artwork_model:
                        return self._model_to_dict(artwork_model)
            except Exception as e:
                logger.error(f"DB Error getting artwork: {e}")
        
        # Fallback cache
        return self.artworks_cache.get(artwork_id)
    
    async def get_all_artworks(self) -> List[Dict]:
        """Récupère toutes les œuvres"""
        if self.use_db and SessionLocal:
            try:
                async with SessionLocal() as session:
                    stmt = select(Artwork).options(selectinload(Artwork.narrative_contents))
                    result = await session.execute(stmt)
                    models = result.scalars().all()
                    if models:
                        return [self._model_to_dict(m) for m in models]
            except Exception as e:
                logger.error(f"DB Error getting all artworks: {e}")
                
        return list(self.artworks_cache.values())
    
    async def get_narrative(self, artwork_id: str, type: str = "standard") -> Optional[str]:
        # Mapping "short"/"long" vers "standard"/"detailed" si nécessaire, ou on garde tel quel
        if type == "short": type = "standard" # Adaptation legacy
        if type == "long": type = "detailed" # Adaptation legacy

        # DB search first
        if self.use_db and SessionLocal:
             try:
                async with SessionLocal() as session:
                    stmt = select(NarrativeContent).where(
                        NarrativeContent.artworkId == artwork_id,
                        NarrativeContent.version == type
                    )
                    result = await session.execute(stmt)
                    content = result.scalar_one_or_none()
                    if content:
                        return content.textContent
             except Exception as e:
                logger.error(f"DB Error getting narrative: {e}")

        # Fallback JSON
        artwork = self.artworks_cache.get(artwork_id)
        if artwork and "narratives" in artwork:
            # Re-map inverse pour le fallback JSON qui utilise short/long
            json_type = "short" if type == "standard" else "long" if type == "detailed" else type
            return artwork["narratives"].get(json_type)
        return None
        
    def _model_to_dict(self, model: Artwork) -> Dict:
        """Helper transformation Model -> Dict compatible avec le reste de l'app"""
        
        # Reconstitution de la structure narratives { "short": "...", "long": "..." }
        narratives = {}
        if model.narrative_contents:
            for nc in model.narrative_contents:
                # Mapping vers les clés attendues par le frontend/NLP
                key = "short" if nc.version == "standard" else "long" if nc.version == "detailed" else nc.version
                narratives[key] = nc.textContent

        return {
            "id": model.id,
            "title": model.title,
            "artist": model.artist,
            "year": model.period, # Mapping period -> year (approximatif) ou on ajoute year au modèle ?
            "description": model.description,
            "narratives": narratives,
            "image": model.imageUrl,
            "faq": [] 
        }