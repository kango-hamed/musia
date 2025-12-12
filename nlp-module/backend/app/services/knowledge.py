"""
KnowledgeBase Service - Fetches artwork data from Musia Backend API
Falls back to local JSON file if API is unavailable
"""
import json
import httpx
from typing import Optional, Dict, List
from pathlib import Path
import logging

from app.config import settings

logger = logging.getLogger(__name__)


class KnowledgeBase:
    """Gestion de la base de connaissances des œuvres (connectée au backend Musia)"""
    
    def __init__(self, data_path: str = "data/artworks.json"):
        self.data_path = Path(data_path)
        self.artworks: Dict[str, Dict] = {}
        self.trajectories: Dict[str, Dict] = {}
        self.backend_url = settings.musia_backend_url
        self._initialized = False
    
    async def initialize(self):
        """Initialize knowledge base - fetch from API or fallback to local"""
        if self._initialized:
            return
            
        # Try to fetch from Musia Backend API first
        if await self._fetch_from_api():
            logger.info("✅ Knowledge base loaded from Musia Backend API")
        else:
            # Fallback to local JSON
            self._load_from_file()
            logger.warning("⚠️ Using local fallback data (API unavailable)")
        
        self._initialized = True
    
    async def _fetch_from_api(self) -> bool:
        """Fetch artworks and trajectories from Musia Backend API"""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                # Fetch Artworks
                artworks_response = await client.get(f"{self.backend_url}/artworks")
                if artworks_response.status_code == 200:
                    data = artworks_response.json()
                    artworks_list = data.get("data", data)  # Handle both wrapped and unwrapped
                    self.artworks = {
                        artwork["id"]: self._transform_artwork(artwork)
                        for artwork in artworks_list
                    }
                    logger.info(f"Fetched {len(self.artworks)} artworks from API")
                
                # Fetch Trajectories
                trajectories_response = await client.get(f"{self.backend_url}/trajectories")
                if trajectories_response.status_code == 200:
                    data = trajectories_response.json()
                    trajectories_list = data.get("data", data)
                    self.trajectories = {
                        traj["id"]: traj
                        for traj in trajectories_list
                    }
                    logger.info(f"Fetched {len(self.trajectories)} trajectories from API")
                
                return len(self.artworks) > 0
                
        except Exception as e:
            logger.error(f"Failed to fetch from API: {e}")
            return False
    
    def _transform_artwork(self, artwork: Dict) -> Dict:
        """Transform API artwork format to NLP-compatible format"""
        # The API returns narrativeContents as a relation
        narratives = {}
        for nc in artwork.get("narrativeContents", []):
            version = nc.get("version", "standard")
            narratives[version] = nc.get("textContent", "")
        
        return {
            "id": artwork["id"],
            "title": artwork.get("title", ""),
            "artist": artwork.get("artist", "Artiste inconnu"),
            "year": artwork.get("period", ""),
            "description": artwork.get("description", ""),
            "imageUrl": artwork.get("imageUrl", ""),
            "narratives": narratives,
            "faq": []  # FAQs are not in our current schema, can be added later
        }
    
    def _load_from_file(self):
        """Fallback: Load from local JSON file"""
        if not self.data_path.exists():
            logger.warning(f"Local knowledge base not found: {self.data_path}")
            return
        
        try:
            with open(self.data_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.artworks = {
                    artwork["id"]: artwork 
                    for artwork in data.get("artworks", [])
                }
            logger.info(f"Loaded {len(self.artworks)} artworks from local file")
        except Exception as e:
            logger.error(f"Error loading local knowledge base: {e}")
    
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
    
    def get_narrative(self, artwork_id: str, narrative_type: str = "standard") -> Optional[str]:
        """Récupère la narration d'une œuvre"""
        artwork = self.get_artwork(artwork_id)
        if artwork and "narratives" in artwork:
            return artwork["narratives"].get(narrative_type)
        return None
    
    # ========== TRAJECTORIES (NEW) ==========
    
    def get_trajectory(self, trajectory_id: str) -> Optional[Dict]:
        """Récupère un parcours par son ID"""
        return self.trajectories.get(trajectory_id)
    
    def get_all_trajectories(self) -> List[Dict]:
        """Récupère tous les parcours"""
        return list(self.trajectories.values())
    
    async def get_trajectory_details(self, trajectory_id: str) -> Optional[Dict]:
        """Fetch full trajectory details with steps from API"""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{self.backend_url}/trajectories/{trajectory_id}")
                if response.status_code == 200:
                    data = response.json()
                    return data.get("data", data)
        except Exception as e:
            logger.error(f"Failed to fetch trajectory details: {e}")
        return None
    
    async def preload_trajectory(self, trajectory_id: str) -> Dict:
        """
        Preload all artworks and narratives for a trajectory.
        Returns a structure optimized for guided tour playback.
        """
        trajectory = await self.get_trajectory_details(trajectory_id)
        if not trajectory:
            return None
        
        steps = trajectory.get("steps", [])
        preloaded = {
            "trajectory": {
                "id": trajectory["id"],
                "name": trajectory.get("name", ""),
                "description": trajectory.get("description", ""),
                "totalSteps": len(steps)
            },
            "steps": []
        }
        
        for step in steps:
            artwork = step.get("artwork", {})
            narrative = step.get("narrativeContent", {})
            
            preloaded["steps"].append({
                "order": step.get("stepOrder", 0),
                "artwork": {
                    "id": artwork.get("id"),
                    "title": artwork.get("title"),
                    "imageUrl": artwork.get("imageUrl")
                },
                "narrative": {
                    "text": narrative.get("textContent", ""),
                    "audioUrl": narrative.get("audioUrl", ""),
                    "duration": narrative.get("duration", 0)
                }
            })
        
        return preloaded
    
    def search_artworks(self, query: str) -> List[Dict]:
        """Recherche d'œuvres par mots-clés"""
        query_lower = query.lower()
        results = []
        
        for artwork in self.artworks.values():
            searchable = f"{artwork['title']} {artwork['artist']} {artwork.get('description', '')}".lower()
            if query_lower in searchable:
                results.append(artwork)
        
        return results