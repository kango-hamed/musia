import sys
import os
import asyncio
from pathlib import Path

# Setup path
sys.path.insert(0, str(Path(__file__).parent))

async def test_startup():
    print("Testing imports...")
    try:
        from app.main import app, sio_app
        from app.services import nlp_service, knowledge_base
        print("✅ Imports successful")
        
        print("Testing Knowledge Base...")
        artworks = await knowledge_base.get_all_artworks()
        print(f"✅ Artworks loaded: {len(artworks)}")
        
        print("Testing NLP Service initialization...")
        await nlp_service.initialize()
        print("✅ NLP initialized")
        
        print("Ready to launch.")
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_startup())
