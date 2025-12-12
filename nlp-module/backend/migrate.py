import asyncio
import json
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent))

from app.database import engine, Base, SessionLocal
from app.orm import Artwork
from app.config import settings

async def init_and_seed():
    print("🚀 Starting migration to PostgreSQL/Neon...")
    
    if not settings.database_url:
        print("❌ DATABASE_URL is missing in config/env!")
        print("   Please add DATABASE_URL=postgresql+asyncpg://user:pass@host/db to .env")
        return

    # 1. Create Tables
    try:
        async with engine.begin() as conn:
            print("🛠️ Creating tables (Artworks, Conversations)...")
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        print(f"❌ Error connecting/creating tables: {e}")
        return
    
    # 2. Load JSON Data
    # Path relative to backend/migrate.py -> ../data/artworks.json
    # BASE_DIR is backend/
    base_dir = Path(__file__).parent.parent
    json_path = base_dir / "data" / "artworks.json"
    
    if not json_path.exists():
         print(f"⚠️ Warning: {json_path} not found. Skipping seeding.")
         return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    artworks_list = data.get('artworks', [])
    print(f"📂 Found {len(artworks_list)} artworks in JSON to migrate.")

    # 3. Insert Data
    async with SessionLocal() as session:
        for item in artworks_list:
            # Check if exists
            existing = await session.get(Artwork, item['id'])
            if not existing:
                print(f"   + Inserting: {item['title']}")
                artwork = Artwork(
                    id=item['id'],
                    title=item['title'],
                    artist=item['artist'],
                    year=item.get('year'),
                    description=item.get('description'),
                    data=item # Store full JSON in data blob
                )
                session.add(artwork)
            else:
                print(f"   . Updating: {item['title']}")
                existing.title = item['title']
                existing.data = item
                # Update other fields if needed
                existing.artist = item['artist']
                existing.year = item.get('year')
                existing.description = item.get('description')
        
        await session.commit()
    
    print("✅ Migration complete!")

if __name__ == "__main__":
    asyncio.run(init_and_seed())
