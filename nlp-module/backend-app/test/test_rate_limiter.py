"""
Tests pour le Rate Limiter
"""
import pytest
import pytest_asyncio
from fakeredis import FakeAsyncRedis
from fastapi import HTTPException
from app.rate_limiter import RateLimiter


@pytest_asyncio.fixture
async def rate_limiter():
    """Rate limiter avec FakeRedis"""
    fake_redis = FakeAsyncRedis()
    return RateLimiter(redis_client=fake_redis, max_requests=5, window=60)


@pytest.mark.asyncio
@pytest.mark.unit
async def test_rate_limit_allows_within_limit(rate_limiter):
    """Test que les requêtes dans la limite sont autorisées"""
    key = "test_user_1"
    
    # 5 requêtes devraient passer
    for i in range(5):
        await rate_limiter.check_rate_limit(key)  # Ne doit pas lever d'exception


@pytest.mark.asyncio
@pytest.mark.unit
async def test_rate_limit_blocks_over_limit(rate_limiter):
    """Test que les requêtes au-delà de la limite sont bloquées"""
    key = "test_user_2"
    
    # Les 5 premières passent
    for i in range(5):
        await rate_limiter.check_rate_limit(key)
    
    # La 6ème doit être bloquée
    with pytest.raises(HTTPException) as exc_info:
        await rate_limiter.check_rate_limit(key)
    
    assert exc_info.value.status_code == 429
    assert "Rate limit exceeded" in exc_info.value.detail


@pytest.mark.asyncio
@pytest.mark.unit
async def test_rate_limit_different_keys_independent(rate_limiter):
    """Test que différents utilisateurs ont des limites indépendantes"""
    # Épuiser la limite pour user1
    for i in range(5):
        await rate_limiter.check_rate_limit("user1")
    
    # user2 devrait encore pouvoir faire des requêtes
    await rate_limiter.check_rate_limit("user2")  # Ne doit pas lever d'exception


@pytest.mark.asyncio
@pytest.mark.unit
async def test_rate_limit_get_remaining(rate_limiter):
    """Test récupération du nombre de requêtes restantes"""
    key = "test_remaining"
    
    # Au début : 5 requêtes disponibles
    remaining = await rate_limiter.get_remaining(key)
    assert remaining == 5
    
    # Après 2 requêtes : 3 restantes
    await rate_limiter.check_rate_limit(key)
    await rate_limiter.check_rate_limit(key)
    remaining = await rate_limiter.get_remaining(key)
    assert remaining == 3


@pytest.mark.asyncio
@pytest.mark.unit
async def test_rate_limit_disabled_without_redis():
    """Test que le rate limiting est désactivé sans Redis"""
    rate_limiter_no_redis = RateLimiter(redis_client=None, max_requests=1, window=60)
    
    # Devrait permettre n'importe quel nombre de requêtes
    for i in range(10):
        await rate_limiter_no_redis.check_rate_limit("any_key")  # Pas d'exception
