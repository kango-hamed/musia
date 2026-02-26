"""
Tests des endpoints API principaux
"""
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
@pytest.mark.integration
async def test_health_endpoint(test_client: AsyncClient):
    """Test endpoint /health"""
    response = await test_client.get("/health")
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["healthy", "degraded"]
    assert "services" in data


@pytest.mark.asyncio
@pytest.mark.integration
async def test_start_conversation_without_artwork(test_client: AsyncClient, mock_redis):
    """Test démarrage conversation sans artwork"""
    response = await test_client.post(
        "/conversation/start",
        json={"artwork_id": None}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert "message" in data
    assert "audio_url" in data


@pytest.mark.asyncio
@pytest.mark.integration  
async def test_get_artworks(test_client: AsyncClient):
    """Test récupération liste des œuvres"""
    response = await test_client.get("/artworks")
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


@pytest.mark.asyncio
@pytest.mark.integration
async def test_audio_path_traversal_blocked(test_client: AsyncClient):
    """Test sécurité : path traversal doit être bloqué"""
    # Tentatives d'attaque path traversal
    attacks = [
        "/audio/../../etc/passwd",
        "/audio/../../../Windows/System32/config/sam",
        "/audio/..%2F..%2Fetc%2Fpasswd",
    ]
    
    for attack_path in attacks:
        response = await test_client.get(attack_path)
        assert response.status_code in [400, 403, 404], f"Path traversal non bloqué: {attack_path}"


@pytest.mark.asyncio
@pytest.mark.integration
async def test_audio_invalid_extension(test_client: AsyncClient):
    """Test sécurité : extensions non-.mp3 bloquées"""
    invalid_files = [
        "/audio/malicious.exe",
        "/audio/script.sh",
        "/audio/hack.php",
        "/audio/test.txt"
    ]
    
    for file_path in invalid_files:
        response = await test_client.get(file_path)
        assert response.status_code == 400, f"Extension invalide non bloquée: {file_path}"


@pytest.mark.asyncio
@pytest.mark.integration
async def test_session_not_found(test_client: AsyncClient, mock_redis):
    """Test erreur quand session n'existe pas"""
    response = await test_client.get("/conversation/fake-session-id/history")
    
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


@pytest.mark.asyncio
@pytest.mark.integration
async def test_conversation_history_empty(test_client: AsyncClient, mock_redis):
    """Test historique vide pour nouvelle session"""
    # Créer session
    create_resp = await test_client.post(
        "/conversation/start",
        json={"artwork_id": None}
    )
    session_id = create_resp.json()["session_id"]
    
    # Récupérer historique
    history_resp = await test_client.get(f"/conversation/{session_id}/history")
    
    assert history_resp.status_code == 200
    history = history_resp.json()
    assert isinstance(history, list)
    assert len(history) == 0
