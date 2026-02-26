# 🚀 Quick Start - Musia Chatbot

## ⚡ Super Quick Start (No Backend Required!)

**Just want to try the chatbot?** Run it in 30 seconds with local JSON mode:

### Step 1: Start Web Server
```bash
cd nlp-module/frontend
python -m http.server 3000
```

### Step 2: Open Browser
Visit: **http://localhost:3000**

**That's it!** 🎉

The chatbot loads 6 African artworks from `artworks.json` and provides intelligent responses.

**What works in Local Mode:**
- ✅ 6 curated African artworks (Benin Bronze, Nok Terracotta, Makonde Mask, Ashanti Gold Weight, Zimbabwe Bird, Kuba Mask)
- ✅ Smart keyword-based responses about artists, periods, materials, cultural significance
- ✅ Beautiful modern interface
- ✅ Works completely offline
- ✅ No setup required
- ⚠️ Text chat only (voice input disabled)
- ⚠️ No audio responses (TTS)

**Perfect for:**
- Quick demos
- Testing the interface
- Showing to stakeholders
- Development without backend dependencies

---

## 🤖 AI Mode (Recommended for Production)

Want **full AI-powered responses** with text-to-speech? (Voice input temporarily disabled)

### Prerequisites

✅ Python 3.11+ installed
✅ Groq API key (get free at https://console.groq.com)

### Quick Start with Script

**Windows:**
```bash
START_CHATBOT_AI.bat
```

**macOS/Linux:**
```bash
./START_CHATBOT_AI.sh
```

**That's it!** The script automatically:
1. Starts NLP backend (port 8000)
2. Starts frontend (port 3000)
3. Opens browser

**Features in AI Mode:**
- ✅ Full AI responses (Groq LLM)
- ✅ Intelligent conversation with context
- ✅ Text-to-speech audio
- ✅ All artworks from database
- ✅ Responds in French
- ⚠️ Voice input disabled (for now)

**See detailed guide:** [AI_MODE.md](AI_MODE.md)

---

## 🎯 Manual Backend Setup (Advanced)

Want to configure everything manually?

### Prerequisites

✅ Python 3.11+ installed
✅ Groq API key (get free at https://console.groq.com)

---

## Step 1: Set Up NLP Backend

### 1.1 Navigate to NLP Module
```bash
cd nlp-module
```

### 1.2 Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 1.3 Install Dependencies
```bash
pip install -r requirements.txt
```

### 1.4 Configure Environment
```bash
# Create .env file
copy .env.example .env   # Windows
cp .env.example .env     # macOS/Linux
```

Edit `.env` and add your Groq API key:
```bash
GROQ_API_KEY=gsk_your_actual_groq_api_key_here
MUSIA_BACKEND_URL=http://localhost:3001/api
```

### 1.5 Initialize Database (if needed)
```bash
cd backend-app
python seed_admin_data.py
```

### 1.6 Start the Backend
```bash
python run.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

✅ Backend is ready!

---

## Step 2: Configure Frontend for Backend Mode

### 2.1 Edit index.html
Open `nlp-module/frontend/index.html` and change line 642:

```javascript
const USE_LOCAL_JSON = false; // Enable backend mode
```

---

## Step 3: Open the Chatbot Interface

### Option A: Direct File (Simple)
```bash
# macOS
open nlp-module/frontend/index.html

# Windows
start nlp-module/frontend/index.html

# Linux
xdg-open nlp-module/frontend/index.html
```

### Option B: Local Server (Recommended)
```bash
cd nlp-module/frontend
python -m http.server 3000
```

Then visit: **http://localhost:3000**

---

## Step 4: Start Chatting!

1. **Select an artwork** from the sidebar
2. **Wait** for the bot's introduction (with audio!)
3. **Type** your questions or **click the microphone** 🎤 to speak
4. **Listen** to audio responses

---

## 🎉 All Set!

Your chatbot is now running with full AI capabilities!

---

## 📝 Quick Test Checklist

Test these features:

### Local JSON Mode
- [ ] Artworks load in sidebar (6 African artworks)
- [ ] Click an artwork - welcome message appears
- [ ] Type "who made this?" - get artist information
- [ ] Type "when was this made?" - get period information
- [ ] Try other questions about materials, significance, etc.

### Backend Mode
- [ ] Backend responds at http://localhost:8000/artworks
- [ ] Artworks load in sidebar
- [ ] Click an artwork - welcome message with audio
- [ ] Type a question - get AI response with audio
- [ ] Click microphone - record voice question
- [ ] Voice transcribed and AI responds

---

## 🔧 Troubleshooting

### Local Mode Issues

**Problem**: "Failed to load artworks.json"

**Solution**:
- Make sure you're in `nlp-module/frontend/` directory
- Use `python -m http.server 3000` (don't open file directly)
- Check that `artworks.json` exists in the same folder

**Problem**: Responses seem generic

**Solution**: That's normal! Local mode uses keyword matching. For AI-powered responses, switch to backend mode.

---

### Backend Mode Issues

**Problem**: "Failed to load artworks"

**Solution**:
1. Check backend is running:
   ```bash
   curl http://localhost:8000/artworks
   ```
2. Should return JSON with artwork list
3. If not, restart backend: `python run.py`

**Problem**: "Connection error"

**Solution**:
- Ensure `USE_LOCAL_JSON = false` in index.html line 642
- Check `const API_URL = 'http://localhost:8000';` in index.html line 641
- Verify backend is running on port 8000

**Problem**: No audio playing

**Solution**:
1. Check browser audio is not muted
2. Test TTS endpoint:
   ```bash
   curl -X POST http://localhost:8000/test/tts \
     -H "Content-Type: application/json" \
     -d '{"text": "Hello world"}'
   ```

**Problem**: Microphone not working

**Solution**:
1. Allow microphone access in browser
2. Use HTTPS for production (required for microphone)
3. Check browser compatibility (Chrome works best)

**Problem**: CORS errors

**Solution**:
- Use `python -m http.server` to serve frontend
- OR add CORS middleware to backend
- OR use browser extension to disable CORS (dev only)

---

## 🚀 Full Stack Setup (All Services)

Want to run the entire Musia platform?

### Terminal 1 - PostgreSQL Database
```bash
# Make sure PostgreSQL is running
# Or use Neon serverless (configured in backend/.env)
```

### Terminal 2 - Backend API (Node.js)
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
# Runs on http://localhost:3001
```

### Terminal 3 - NLP Module (Python)
```bash
cd nlp-module/backend-app
python run.py
# Runs on http://localhost:8000
```

### Terminal 4 - Chatbot Frontend
```bash
cd nlp-module/frontend
python -m http.server 3000
# Visit http://localhost:3000
```

### Terminal 5 - Admin Interface (Optional)
```bash
cd admin-interface
npm install
npm run dev
# Visit http://localhost:5174
```

---

## 📞 Need Help?

- Check the [full README](README.md) for detailed documentation
- Review [troubleshooting section](#-troubleshooting) above
- Check browser console for error messages
- Verify all services are running on correct ports

---

## 🎨 Switching Modes

### Switch to Local JSON Mode
1. Open `nlp-module/frontend/index.html`
2. Line 642: `const USE_LOCAL_JSON = true;`
3. Reload browser

### Switch to Backend Mode
1. Open `nlp-module/frontend/index.html`
2. Line 642: `const USE_LOCAL_JSON = false;`
3. Make sure backend is running
4. Reload browser

---

**Happy chatting!** 🤖🎨
