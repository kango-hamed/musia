from pydantic import BaseModel, Field
from typing import Optional, List, Dict

class ConversationRequest(BaseModel):
    session_id: str
    message: str

class ConversationResponse(BaseModel):
    session_id: str
    user_input: str
    intent: str
    response: str
    audio_url: str

class ArtworkResponse(BaseModel):
    id: str
    title: str
    artist: str
    year: Optional[str] = None
    description: Optional[str] = None

class NarrativeResponse(BaseModel):
    text: str
    audio_url: str
    duration: Optional[int] = None