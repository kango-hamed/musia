"""
Rate Limiter basé sur Redis pour protéger l'API
"""
from fastapi import HTTPException, Request
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class RateLimiter:
    """Gestionnaire de rate limiting avec Redis"""
    
    def __init__(self, redis_client, max_requests: int = 10, window: int = 60):
        """
        Initialise le rate limiter
        
        Args:
            redis_client: Client Redis (ou None pour désactiver)
            max_requests: Nombre maximum de requêtes autorisées
            window: Fenêtre de temps en secondes
        """
        self.redis = redis_client
        self.max_requests = max_requests
        self.window = window
    
    async def check_rate_limit(self, key: str) -> None:
        """
        Vérifie si la limite de requêtes n'est pas dépassée
        
        Args:
            key: Clé unique pour identifier l'utilisateur/session
            
        Raises:
            HTTPException: 429 si la limite est dépassée
        """
        if not self.redis:
            logger.warning("Rate limiting disabled (no Redis connection)")
            return
        
        try:
            # Incrémenter le compteur
            current = await self.redis.incr(key)
            
            # Définir TTL à la première requête
            if current == 1:
                await self.redis.expire(key, self.window)
            
            # Vérifier la limite
            if current > self.max_requests:
                raise HTTPException(
                    status_code=429,
                    detail=f"Rate limit exceeded. Max {self.max_requests} requests per {self.window}s. Try again later."
                )
            
            logger.debug(f"Rate limit check: {current}/{self.max_requests} for key {key}")
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Rate limiter error: {e}")
            # Ne pas bloquer en cas d'erreur Redis
            pass
    
    async def get_remaining(self, key: str) -> Optional[int]:
        """
        Retourne le nombre de requêtes restantes
        
        Args:
            key: Clé unique
            
        Returns:
            Nombre de requêtes restantes ou None si rate limiting désactivé
        """
        if not self.redis:
            return None
        
        try:
            current = await self.redis.get(key)
            if current is None:
                return self.max_requests
            return max(0, self.max_requests - int(current))
        except Exception as e:
            logger.error(f"Error getting remaining requests: {e}")
            return None
