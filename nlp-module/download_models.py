import asyncio
from pathlib import Path

async def download_whisper():
    """Télécharge le modèle Whisper"""
    print("📥 Downloading Whisper model...")
    import whisper
    
    model = whisper.load_model("base", device="cpu")
    print("✅ Whisper model downloaded")
    return True

async def download_sentence_transformer():
    """Télécharge le modèle de sentence embeddings"""
    print("📥 Downloading Sentence Transformer model...")
    from sentence_transformers import SentenceTransformer
    
    model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    print("✅ Sentence Transformer model downloaded")
    return True

async def download_nltk_data():
    """Télécharge les données NLTK"""
    print("📥 Downloading NLTK data...")
    import nltk
    
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
    print("✅ NLTK data downloaded")
    return True

async def main():
    """Télécharge tous les modèles"""
    print("🚀 Downloading all required models...")
    print("This may take a few minutes on first run...\n")
    
    tasks = [
        download_whisper(),
        download_sentence_transformer(),
        download_nltk_data()
    ]
    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    print("\n" + "="*60)
    success = sum(1 for r in results if r is True)
    print(f"✨ Downloaded {success}/{len(tasks)} models successfully")
    
    if success == len(tasks):
        print("🎉 All models ready!")
        print("\nYou can now run: python backend/run.py")
    else:
        print("⚠️  Some models failed to download")
        for i, r in enumerate(results):
            if isinstance(r, Exception):
                print(f"Error in task {i}: {r}")

if __name__ == "__main__":
    asyncio.run(main())