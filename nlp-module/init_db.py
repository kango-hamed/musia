import json
import sqlite3
from pathlib import Path
import sys

def init_database():
    """Initialise la base de données SQLite avec les données des œuvres"""
    
    print("🗄️  Initializing database...")
    
    # Créer le dossier data s'il n'existe pas
    data_dir = Path("data")
    data_dir.mkdir(exist_ok=True)
    
    # Vérifier si artworks.json existe
    artworks_file = data_dir / "artworks.json"
    if not artworks_file.exists():
        print("❌ Error: data/artworks.json not found!")
        print("📝 Please create this file with artwork data")
        sys.exit(1)
    
    # Charger les données
    try:
        with open(artworks_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"✅ Loaded {len(data['artworks'])} artworks from JSON")
    except Exception as e:
        print(f"❌ Error loading artworks.json: {e}")
        sys.exit(1)
    
    # Connexion à la base de données
    db_path = data_dir / "museum.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Créer la table artworks
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS artworks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            year TEXT,
            description TEXT,
            data JSON NOT NULL
        )
    ''')
    print("✅ Table 'artworks' created")
    
    # Créer la table conversations
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            artwork_id TEXT,
            user_input TEXT,
            bot_response TEXT,
            intent TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (artwork_id) REFERENCES artworks(id)
        )
    ''')
    print("✅ Table 'conversations' created")
    
    # Créer index pour les recherches
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_session 
        ON conversations(session_id)
    ''')
    
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_artwork 
        ON conversations(artwork_id)
    ''')
    print("✅ Indexes created")
    
    # Insérer les œuvres
    inserted = 0
    for artwork in data['artworks']:
        try:
            cursor.execute('''
                INSERT OR REPLACE INTO artworks (id, title, artist, year, description, data)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                artwork['id'],
                artwork['title'],
                artwork['artist'],
                artwork.get('year', ''),
                artwork.get('description', ''),
                json.dumps(artwork, ensure_ascii=False)
            ))
            inserted += 1
            print(f"  ✓ {artwork['title']} by {artwork['artist']}")
        except Exception as e:
            print(f"  ✗ Error inserting {artwork['title']}: {e}")
    
    conn.commit()
    conn.close()
    
    print(f"\n✨ Database initialized successfully!")
    print(f"📊 {inserted} artworks inserted")
    print(f"💾 Database location: {db_path.absolute()}")

if __name__ == "__main__":
    init_database()