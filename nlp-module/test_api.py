import asyncio
import aiohttp
import json
from pathlib import Path

BASE_URL = "http://localhost:8000"

async def test_health():
    """Test du endpoint health"""
    print("\n🔍 Testing /health...")
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{BASE_URL}/health") as resp:
            data = await resp.json()
            print(f"Status: {resp.status}")
            print(f"Response: {json.dumps(data, indent=2)}")
            return resp.status == 200

async def test_artworks():
    """Test du endpoint artworks"""
    print("\n🔍 Testing /artworks...")
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{BASE_URL}/artworks") as resp:
            data = await resp.json()
            print(f"Status: {resp.status}")
            print(f"Found {len(data)} artworks")
            for artwork in data:
                print(f"  - {artwork['title']} by {artwork['artist']}")
            return resp.status == 200 and len(data) > 0

async def test_conversation():
    """Test du flow conversationnel"""
    print("\n🔍 Testing conversation flow...")
    
    async with aiohttp.ClientSession() as session:
        # 1. Démarrer une conversation
        print("  1. Starting conversation...")
        async with session.post(
            f"{BASE_URL}/conversation/start",
            params={"artwork_id": "mona-lisa"}
        ) as resp:
            if resp.status != 200:
                print(f"  ❌ Failed to start conversation: {resp.status}")
                return False
            
            data = await resp.json()
            session_id = data['session_id']
            print(f"  ✅ Session created: {session_id[:8]}...")
            print(f"  Bot: {data['message'][:100]}...")
        
        # 2. Poser une question
        print("\n  2. Asking a question...")
        question = "Pourquoi sourit-elle ?"
        async with session.post(
            f"{BASE_URL}/conversation/text",
            json={
                "session_id": session_id,
                "message": question
            }
        ) as resp:
            if resp.status != 200:
                print(f"  ❌ Failed to ask question: {resp.status}")
                return False
            
            data = await resp.json()
            print(f"  User: {question}")
            print(f"  Intent: {data['intent']}")
            print(f"  Bot: {data['response'][:200]}...")
        
        # 3. Historique
        print("\n  3. Getting conversation history...")
        async with session.get(
            f"{BASE_URL}/conversation/{session_id}/history"
        ) as resp:
            if resp.status != 200:
                print(f"  ❌ Failed to get history: {resp.status}")
                return False
            
            history = await resp.json()
            print(f"  ✅ Found {len(history)} exchanges in history")
        
        return True

async def test_tts():
    """Test du TTS"""
    print("\n🔍 Testing TTS...")
    async with aiohttp.ClientSession() as session:
        async with session.post(
            f"{BASE_URL}/test/tts",
            params={"text": "Bonjour, je suis votre guide de musée!"}
        ) as resp:
            data = await resp.json()
            print(f"Status: {resp.status}")
            print(f"Audio URL: {data['audio_url']}")
            return resp.status == 200

async def run_all_tests():
    """Execute tous les tests"""
    print("🧪 Starting API Tests...")
    print("="*60)
    
    tests = [
        ("Health Check", test_health),
        ("Artworks List", test_artworks),
        ("Conversation Flow", test_conversation),
        ("Text-to-Speech", test_tts)
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = await test_func()
            results.append((name, result))
        except Exception as e:
            print(f"\n❌ {name} failed with error: {e}")
            results.append((name, False))
    
    # Résumé
    print("\n" + "="*60)
    print("📊 Test Results:")
    print("="*60)
    
    passed = sum(1 for _, r in results if r)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {name}")
    
    print("="*60)
    print(f"Result: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    try:
        exit_code = asyncio.run(run_all_tests())
        exit(exit_code)
    except KeyboardInterrupt:
        print("\n\n👋 Tests interrupted")
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        exit(1)