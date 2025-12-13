#!/usr/bin/env python3
"""
Museum Guide Bot - Server Launcher
Démarre le serveur FastAPI avec Uvicorn
"""
import sys
import os
from pathlib import Path

# Ajouter le répertoire parent au PYTHONPATH pour les imports
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

import uvicorn
from app.config import settings


def main():
    """Lance le serveur FastAPI"""
    print("🚀 Starting Museum Guide Bot API...")
    print(f"📍 API: http://localhost:{settings.api_port}")
    print(f"📚 Docs: http://localhost:{settings.api_port}/docs")
    print(f"🌐 Frontend: http://localhost:{settings.api_port}/index.html")
    print()
    
    # Configuration Uvicorn
    uvicorn.run(
        "app.main:sio_app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.debug,  # Auto-reload en mode debug
        log_level="info",
        access_log=True,
    )


if __name__ == "__main__":
    main()
