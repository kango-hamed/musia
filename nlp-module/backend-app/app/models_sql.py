from sqlalchemy import Column, String, Integer, Text, ForeignKey, DateTime, Boolean, JSON, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from .database import Base

def generate_cuid():
    # Simulation CUID (ou UUID simple pour compatibilité)
    return str(uuid.uuid4())

# ============================================
# PHASE 1: FONDATIONS
# ============================================

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_cuid)
    email = Column(String, unique=True, index=True)
    name = Column(String, nullable=True)
    password = Column(String)
    role = Column(String, default="admin") # "admin", "manager", "operator", "viewer"
    
    createdAt = Column("createdAt", DateTime(timezone=True), server_default=func.now())
    updatedAt = Column("updatedAt", DateTime(timezone=True), onupdate=func.now())

class Artwork(Base):
    __tablename__ = "artworks"

    id = Column(String, primary_key=True, default=generate_cuid)
    code = Column(String, unique=True)
    title = Column(String)
    artist = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    
    # Classification
    period = Column(String, nullable=True)
    style = Column(String, nullable=True)
    collection = Column(String, nullable=True)
    
    # Localisation
    positionX = Column(Float, nullable=True)
    positionY = Column(Float, nullable=True)
    floor = Column(Integer, default=0)
    room = Column(String, nullable=True)
    orientation = Column(Float, default=0)
    
    # Médias
    imageUrl = Column(String, nullable=True)
    
    createdAt = Column("createdAt", DateTime(timezone=True), server_default=func.now())
    updatedAt = Column("updatedAt", DateTime(timezone=True), onupdate=func.now())

    # Relations
    narrative_contents = relationship("NarrativeContent", back_populates="artwork")
    # trajectory_steps = relationship("TrajectoryStep", back_populates="artwork")

class NarrativeContent(Base):
    __tablename__ = "narrative_contents"

    id = Column(String, primary_key=True, default=generate_cuid)
    
    artworkId = Column(String, ForeignKey("artworks.id", ondelete="CASCADE"))
    version = Column(String, default="standard") # "short", "detailed", "kids"
    language = Column(String, default="fr")
    
    textContent = Column(Text)
    audioUrl = Column(String, nullable=True)
    duration = Column(Integer, nullable=True)
    
    createdAt = Column("createdAt", DateTime(timezone=True), server_default=func.now())
    updatedAt = Column("updatedAt", DateTime(timezone=True), onupdate=func.now())
    
    artwork = relationship("Artwork", back_populates="narrative_contents")

# ============================================
# PHASE 2: TRAJETS ET VISITES (Partiel pour l'instant)
# ============================================

class VisitorInteraction(Base):
    __tablename__ = "visitor_interactions"

    id = Column(String, primary_key=True, default=generate_cuid)
    
    visitId = Column(String, nullable=True) # ForeignKey("scheduled_visits.id")
    
    interactionType = Column(String) # "question", "feedback", "command"
    questionText = Column(Text, nullable=True)
    detectedIntent = Column(String, nullable=True)
    intentConfidence = Column(Float, nullable=True)
    
    responseText = Column(Text, nullable=True)
    responseSource = Column(String, nullable=True) # "faq", "llm_generated", "fallback"
    
    language = Column(String, default="fr")
    
    # Métriques
    sttLatencyMs = Column(Integer, nullable=True)
    nlpLatencyMs = Column(Integer, nullable=True)
    ttsLatencyMs = Column(Integer, nullable=True)
    totalLatencyMs = Column(Integer, nullable=True)
    
    wasSuccessful = Column(Boolean, default=True)
    errorOccurred = Column(Boolean, default=False)
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
