"""
Tests pour les validateurs Pydantic
"""
import pytest
from pydantic import ValidationError
from app.validators import (
    SessionIdValidator,
    TextInputValidator,
    ConversationRequestValidated
)


@pytest.mark.unit
def test_session_id_validator_valid_uuid():
    """Test validation d'un UUID valide"""
    validator = SessionIdValidator(session_id="550e8400-e29b-41d4-a716-446655440000")
    assert validator.session_id == "550e8400-e29b-41d4-a716-446655440000"


@pytest.mark.unit
def test_session_id_validator_invalid_uuid():
    """Test rejet d'un UUID invalide"""
    with pytest.raises(ValidationError) as exc_info:
        SessionIdValidator(session_id="not-a-uuid")
    
    assert "Invalid session ID format" in str(exc_info.value)


@pytest.mark.unit
def test_text_input_validator_clean_text():
    """Test validation de texte propre"""
    validator = TextInputValidator(message="Bonjour, comment allez-vous?")
    assert validator.message == "Bonjour, comment allez-vous?"


@pytest.mark.unit
def test_text_input_validator_sanitizes_dangerous_chars():
    """Test sanitization des caractères dangereux"""
    validator = TextInputValidator(message="Hello <script>alert('xss')</script>")
    # Les balises <script> doivent être supprimées
    assert "<" not in validator.message
    assert ">" not in validator.message
    # Le contenu reste (mais sans les quotes car nettoyées par le regex strict)
    assert "alert" in validator.message


@pytest.mark.unit
def test_text_input_validator_preserves_french_accents():
    """Test que les accents français sont préservés"""
    message = "Où est l'œuvre d'art?"
    validator = TextInputValidator(message=message)
    assert "Où" in validator.message
    assert "œuvre" in validator.message


@pytest.mark.unit
def test_text_input_validator_rejects_empty():
    """Test rejet de message vide après sanitization"""
    with pytest.raises(ValidationError) as exc_info:
        TextInputValidator(message="<><><>")
    
    # Pydantic v2 wraps the ValueError
    assert "Message cannot be empty" in str(exc_info.value)


@pytest.mark.unit
def test_conversation_request_valid():
    """Test request de conversation valide"""
    request = ConversationRequestValidated(
        session_id="550e8400-e29b-41d4-a716-446655440000",
        message="Qui a peint cette œuvre?"
    )
    assert request.session_id
    assert request.message


@pytest.mark.unit
def test_conversation_request_too_long():
    """Test rejet de message trop long"""
    long_message = "a" * 1001
    
    with pytest.raises(ValidationError) as exc_info:
        ConversationRequestValidated(
            session_id="550e8400-e29b-41d4-a716-446655440000",
            message=long_message
        )
    
    # Message par défaut de Pydantic v2
    error_msg = str(exc_info.value).lower()
    assert "at most 1000 characters" in error_msg or "too long" in error_msg
