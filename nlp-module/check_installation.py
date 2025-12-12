import sys
import subprocess
from pathlib import Path

def check_python():
    """Vérifie la version de Python"""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 10:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(f"❌ Python version too old: {version.major}.{version.minor}")
        print("   Required: Python 3.10+")
        return False

def check_ffmpeg():
    """Vérifie FFmpeg"""
    try:
        result = subprocess.run(
            ["ffmpeg", "-version"],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            version = result.stdout.split('\n')[0]
            print(f"✅ {version}")
            return True
    except FileNotFoundError:
        print("❌ FFmpeg not found")
        print("   Install: apt install ffmpeg (Linux) or brew install ffmpeg (Mac)")
        return False

def check_package(package_name, import_name=None):
    """Vérifie qu'un package Python est installé"""
    if import_name is None:
        import_name = package_name
    
    try:
        __import__(import_name)
        print(f"✅ {package_name}")
        return True
    except ImportError:
        print(f"❌ {package_name} not installed")
        return False

def check_files():
    """Vérifie la structure des fichiers"""
    required_files = [
        "backend/app/main.py",
        "backend/app/models.py",
        "backend/app/config.py",
        "backend/app/services/stt.py",
        "backend/app/services/tts.py",
        "backend/app/services/nlp.py",
        "backend/app/services/knowledge.py",
        "data/artworks.json"
    ]
    
    all_exist = True
    for file_path in required_files:
        if Path(file_path).exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} - Missing")
            all_exist = False
    
    return all_exist

def main():
    print("🔍 Checking Museum Guide Bot Installation")
    print("="*60)
    
    print("\n1. Checking Python...")
    python_ok = check_python()
    
    print("\n2. Checking FFmpeg...")
    ffmpeg_ok = check_ffmpeg()
    
    print("\n3. Checking Python packages...")
    packages = [
        ("FastAPI", "fastapi"),
        ("Uvicorn", "uvicorn"),
        ("OpenAI-Whisper", "whisper"),
        ("Edge-TTS", "edge_tts"),
        ("Sentence-Transformers", "sentence_transformers"),
        ("SQLAlchemy", "sqlalchemy"),
        ("Pydantic", "pydantic"),
    ]
    
    packages_ok = all(check_package(name, imp) for name, imp in packages)
    
    print("\n4. Checking file structure...")
    files_ok = check_files()
    
    print("\n" + "="*60)
    if all([python_ok, ffmpeg_ok, packages_ok, files_ok]):
        print("✅ Installation complete! Ready to run.")
        print("\nNext steps:")
        print("  1. python init_db.py")
        print("  2. python download_models.py")
        print("  3. python backend/run.py")
        return 0
    else:
        print("❌ Installation incomplete. Fix the issues above.")
        return 1

if __name__ == "__main__":
    exit(main())