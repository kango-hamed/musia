from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from .database import Base

class Artwork(Base):
    __tablename__ = "artworks"

    id = Column(String, primary_key=True, index=True) # Slug ID (ex: "mona_lisa")
    title = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    year = Column(String)
    description = Column(Text)
    data = Column(JSONB, nullable=False, server_default='{}') # Metadata, narratives, faq

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    session_id = Column(String, index=True, nullable=False)
    artwork_id = Column(String, ForeignKey("artworks.id"))
    user_input = Column(Text)
    bot_response = Column(Text)
    intent = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
