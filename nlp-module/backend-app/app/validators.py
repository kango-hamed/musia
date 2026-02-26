"""
Validateurs Pydantic pour sécuriser les inputs utilisateurs
"""
from pydantic import BaseModel, field_validator, Field
from typing import Optional
import uuid
import re


class SessionIdValidator(BaseModel):
    """Validateur pour les session IDs (doivent être des UUIDs)"""
    session_id: str = Field(..., min_length=1, max_length=100)
    
    @field_validator('session_id')
    @classmethod
    def validate_uuid(cls, v):
        """Vérifie que le session_id est un UUID valide"""
        try:
            uuid.UUID(v)
        except ValueError:
            raise ValueError('Invalid session ID format (must be UUID)')
        return v


class TextInputValidator(BaseModel):
    """Validateur pour les inputs texte avec sanitization"""
    message: str = Field(..., min_length=1, max_length=1000)
    
    @field_validator('message')
    @classmethod
    def sanitize_text(cls, v):
        """Nettoie le texte des caractères potentiellement dangereux"""
        # Supprimer les balises HTML/script
        sanitized = re.sub(r'<[^>]*>', '', v)
        
        # Autoriser lettres, chiffres, ponctuations courantes, accents français
        sanitized = re.sub(
            r'[^\w\s.,!?;:\'\"-éèêàùâîôûçÉÈÊÀÙÂÎÔÛÇ]', 
            '', 
            sanitized, 
            flags=re.UNICODE
        )
        
        if not sanitized.strip():
            raise ValueError('Message cannot be empty after sanitization')
        
        return sanitized.strip()


class ArtworkIdValidator(BaseModel):
    """Validateur pour les artwork IDs"""
    artwork_id: Optional[str] = Field(None, pattern=r'^[a-zA-Z0-9_-]{1,50}$')
    
    @field_validator('artwork_id')
    @classmethod
    def validate_artwork_id(cls, v):
        """Vérifie le format de l'artwork ID"""
        if v is not None and len(v.strip()) == 0:
            return None
        return v


class ConversationRequestValidated(BaseModel):
    """Request validé pour les conversations texte"""
    session_id: str = Field(..., min_length=1, max_length=100)
    message: str = Field(..., min_length=1, max_length=1000)
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v):
        """Valide le session ID (UUID)"""
        try:
            uuid.UUID(v)
        except ValueError:
            raise ValueError('Invalid session ID format')
        return v
    
    @field_validator('message')
    @classmethod
    def sanitize_message(cls, v):
        """Sanitize le message utilisateur"""
        # Supprimer balises HTML
        sanitized = re.sub(r'<[^>]*>', '', v)
        
        # Nettoyer caractères dangereux
        sanitized = re.sub(
            r'[^\w\s.,!?;:\'\"-éèêàùâîôûçÉÈÊÀÙÂÎÔÛÇ]',
            '',
            sanitized,
            flags=re.UNICODE
        )
        
        if not sanitized.strip():
            raise ValueError('Message cannot be empty')
        
        # La validation de longueur max est déjà faite par Field(max_length=1000)
        
        return sanitized.strip()
