"""
Fixtures pytest partagées pour tous les tests
"""
import pytest
import pytest_asyncio
from httpx import AsyncClient
from app.main import app, session_manager
from fakeredis import FakeAsyncRedis


@pytest_asyncio.fixture
async def test_client():
    """Client HTTP asynchrone pour tester l'API"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client


@pytest_asyncio.fixture
async def mock_redis(mocker):
    """Mock Redis avec fakeredis pour tests isolés"""
    fake_redis = FakeAsyncRedis()
    mocker.patch.object(session_manager, 'redis', fake_redis)
    yield fake_redis
    await fake_redis.flushall()


@pytest.fixture
def sample_session_data():
    """Données de session exemple pour les tests"""
    return {
        "current_artwork": "test-artwork-1",
        "history": [],
        "context": {}
    }


@pytest.fixture
def sample_conversation_history():
    """Historique de conversation exemple"""
    return [
        {"user": "Qui a peint cette œuvre?", "bot": "Leonardo da Vinci", "intent": "factual"},
        {"user": "En quelle année?", "bot": "En 1503", "intent": "temporal"}
    ]
