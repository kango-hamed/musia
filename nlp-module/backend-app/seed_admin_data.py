import asyncio
import sys
from pathlib import Path
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

# Setup path
sys.path.insert(0, str(Path(__file__).parent))

from app.database import engine
from app.models_sql import Base, Artwork, NarrativeContent, User

# Recreate tables (Warning: cleans DB)
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

async def seed_data():
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )

    async with async_session() as session:
        # 1. Simulate Admin User
        admin = User(
            email="admin@musee.fr",
            password="hashed_password_example",
            name="Admin System",
            role="admin"
        )
        session.add(admin)

        # 2. Simulate Artwork Created by Admin
        joconde = Artwork(
            code="ART-001",
            title="La Joconde",
            artist="Léonard de Vinci",
            description="Le portrait le plus célèbre du monde.",
            period="Renaissance",
            style="Portrait",
            positionX=10.5,
            positionY=20.0,
            room="Salle des États"
        )
        session.add(joconde)
        await session.flush() # get ID

        # 3. Add Narratives (Short & Long)
        narrative_short = NarrativeContent(
            artworkId=joconde.id,
            version="standard", # = "short" in legacy mapping
            textContent="C'est le portrait de Mona Lisa, peint par Léonard de Vinci entre 1503 et 1506.",
            language="fr"
        )
        narrative_long = NarrativeContent(
            artworkId=joconde.id,
            version="detailed", # = "long" in legacy mapping
            textContent="La Joconde, ou Portrait de Mona Lisa, est un tableau de l'artiste italien Léonard de Vinci, réalisé entre 1503 et 1506, qui représente un portrait mi-corps, probablement celui de la Florentine Lisa Gherardini, épouse de Francesco del Giocondo. Acquise par François Ier, cette peinture à l'huile sur panneau de bois de peuplier de 77 × 53 cm est exposée au musée du Louvre à Paris.",
            language="fr"
        )
        session.add(narrative_short)
        session.add(narrative_long)
        
        await session.commit()
        print("✅ Simluated Admin Data Inserted: Artwork + Narratives")

async def test_read_by_nlp():
    # Test if KnowledgeBase logic picks it up
    from app.services.knowledge import KnowledgeBase
    kb = KnowledgeBase()
    
    print("\n--- Testing NLP Knowledge Base Read ---")
    
    # Force DB usage
    kb.use_db = True
    
    artworks = await kb.get_all_artworks()
    print(f"📚 Artworks found in DB: {len(artworks)}")
    
    if len(artworks) > 0:
        art = artworks[0]
        print(f"🖼️ First Artwork: {art['title']} by {art['artist']}")
        print(f"📝 Narrative (Short): {art['narratives'].get('short')}")
        print(f"📝 Narrative (Long): {art['narratives'].get('long')}")
        
        if art['title'] == "La Joconde" and art['narratives'].get('long'):
            print("✅ SUCCESS: Data alignment verified!")
        else:
            print("❌ FAILURE: Data mismatch")
    else:
        print("❌ FAILURE: No artworks found")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "run":
        asyncio.run(init_db())
        asyncio.run(seed_data())
        asyncio.run(test_read_by_nlp())
    else:
        print("Run with argument 'run' to execute: python backend/seed_admin_data.py run")
