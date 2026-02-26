"""
Tests pour le SessionManager (Redis + fallback mémoire)
"""
import pytest
import pytest_asyncio
from app.session_manager import SessionManager
from fakeredis import FakeAsyncRedis


@pytest_asyncio.fixture
async def session_mgr():
    """Instance du SessionManager avec FakeRedis"""
    mgr = SessionManager(redis_url="redis://fake", ttl=300)
    mgr.redis = FakeAsyncRedis()
    return mgr


@pytest.mark.asyncio
@pytest.mark.unit
async def test_create_and_get_session(session_mgr, sample_session_data):
    """Test création et récupération d'une session"""
    session_id = "test-session-123"
    
    await session_mgr.create_session(session_id, sample_session_data)
    retrieved = await session_mgr.get_session(session_id)
    
    assert retrieved is not None
    assert retrieved["current_artwork"] == sample_session_data["current_artwork"]
    assert retrieved["history"] == []
    assert retrieved["context"] == {}


@pytest.mark.asyncio
@pytest.mark.unit
async def test_session_not_found(session_mgr):
    """Test récupération d'une session inexistante"""
    result = await session_mgr.get_session("non-existent-session")
    assert result is None


@pytest.mark.asyncio
@pytest.mark.unit
async def test_update_session(session_mgr, sample_session_data):
    """Test mise à jour d'une session existante"""
    session_id = "test-update"
    
    # Créer session initiale
    await session_mgr.create_session(session_id, sample_session_data)
    
    # Modifier et mettre à jour
    sample_session_data["history"].append({
        "user": "Test question",
        "bot": "Test answer",
        "intent": "general"
    })
    await session_mgr.update_session(session_id, sample_session_data)
    
    # Vérifier
    updated = await session_mgr.get_session(session_id)
    assert len(updated["history"]) == 1
    assert updated["history"][0]["user"] == "Test question"


@pytest.mark.asyncio
@pytest.mark.unit
async def test_delete_session(session_mgr, sample_session_data):
    """Test suppression d'une session"""
    session_id = "test-delete"
    
    await session_mgr.create_session(session_id, sample_session_data)
    assert await session_mgr.get_session(session_id) is not None
    
    await session_mgr.delete_session(session_id)
    assert await session_mgr.get_session(session_id) is None


@pytest.mark.asyncio
@pytest.mark.unit
async def test_fallback_memory_mode():
    """Test fallback en mémoire quand Redis indisponible"""
    mgr = SessionManager(redis_url="redis://fake")
    mgr.redis = None  # Simuler Redis indisponible
    
    session_id = "memory-test"
    data = {"test": "data"}
    
    await mgr.create_session(session_id, data)
    retrieved = await mgr.get_session(session_id)
    
    assert retrieved == data
