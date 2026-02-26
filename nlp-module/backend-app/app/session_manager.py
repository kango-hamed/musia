"""
Gestionnaire de sessions avec Redis
Remplace le dictionnaire en mémoire pour persistance et scalabilité
"""
import redis.asyncio as redis
import json
from typing import Optional, Dict
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)


class SessionManager:
    """Gestionnaire de sessions avec stockage Redis"""
    
    def __init__(self, redis_url: str = "redis://localhost:6379", ttl: int = 3600):
        """
        Initialise le gestionnaire de sessions
        
        Args:
            redis_url: URL de connexion Redis
            ttl: Durée de vie des sessions en secondes (défaut: 1 heure)
        """
        self.redis_url = redis_url
        self.ttl = ttl
        self.redis = None
    
    async def initialize(self):
        """Initialise la connexion Redis"""
        try:
            self.redis = await redis.from_url(
                self.redis_url, 
                decode_responses=True,
                encoding="utf-8"
            )
            # Test de connexion
            await self.redis.ping()
            logger.info(f"✅ Redis connected: {self.redis_url}")
        except Exception as e:
            logger.error(f"❌ Redis connection failed: {e}")
            logger.warning("⚠️  Falling back to in-memory sessions (not production-ready!)")
            self.redis = None
    
    async def create_session(self, session_id: str, data: Dict) -> None:
        """
        Crée une nouvelle session
        
        Args:
            session_id: ID unique de la session
            data: Données de la session (dict)
        """
        if self.redis:
            try:
                await self.redis.setex(
                    f"session:{session_id}",
                    timedelta(seconds=self.ttl),
                    json.dumps(data, ensure_ascii=False)
                )
            except Exception as e:
                logger.error(f"Error creating session {session_id}: {e}")
                raise
        else:
            # Fallback en mémoire (pour développement uniquement)
            if not hasattr(self, '_memory_sessions'):
                self._memory_sessions = {}
            self._memory_sessions[session_id] = data
    
    async def get_session(self, session_id: str) -> Optional[Dict]:
        """
        Récupère une session
        
        Args:
            session_id: ID de la session
            
        Returns:
            Données de la session ou None si non trouvée
        """
        if self.redis:
            try:
                data = await self.redis.get(f"session:{session_id}")
                return json.loads(data) if data else None
            except Exception as e:
                logger.error(f"Error getting session {session_id}: {e}")
                return None
        else:
            # Fallback en mémoire
            return getattr(self, '_memory_sessions', {}).get(session_id)
    
    async def update_session(self, session_id: str, data: Dict) -> None:
        """
        Met à jour une session existante
        
        Args:
            session_id: ID de la session
            data: Nouvelles données de la session
        """
        await self.create_session(session_id, data)
    
    async def delete_session(self, session_id: str) -> None:
        """
        Supprime une session
        
        Args:
            session_id: ID de la session à supprimer
        """
        if self.redis:
            try:
                await self.redis.delete(f"session:{session_id}")
            except Exception as e:
                logger.error(f"Error deleting session {session_id}: {e}")
        else:
            # Fallback en mémoire
            if hasattr(self, '_memory_sessions'):
                self._memory_sessions.pop(session_id, None)
    
    async def extend_ttl(self, session_id: str) -> None:
        """
        Prolonge la durée de vie d'une session
        
        Args:
            session_id: ID de la session
        """
        if self.redis:
            try:
                await self.redis.expire(f"session:{session_id}", self.ttl)
            except Exception as e:
                logger.error(f"Error extending TTL for session {session_id}: {e}")
    
    async def close(self):
        """Ferme la connexion Redis"""
        if self.redis:
            await self.redis.close()
            logger.info("Redis connection closed")
