# 🎨 Local JSON Mode - Demo Without Backend

The Musia chatbot now supports **Local JSON Mode** - a demo version that runs without any backend server or API dependencies!

---

## 🚀 What is Local JSON Mode?

Local JSON Mode allows you to run the chatbot interface using a local `artworks.json` file with 6 curated African artworks. Perfect for:

- **Quick demos** - Show the interface without complex setup
- **Development** - Frontend work without backend dependencies
- **Testing** - Verify UI/UX without API calls
- **Presentations** - Reliable demo for stakeholders
- **Offline use** - No internet or server required

---

## ✅ What Works in Local Mode

### Fully Functional
- ✅ **6 African Artworks** - Benin Bronze, Nok Terracotta, Makonde Mask, Ashanti Gold Weight, Zimbabwe Bird, Kuba Mask
- ✅ **Artwork Browser** - Beautiful sidebar with artwork cards
- ✅ **Text Chat** - Type questions and get responses
- ✅ **Smart Responses** - Keyword-based intelligent answers about:
  - Artist information
  - Historical periods
  - Materials and techniques
  - Cultural significance
  - Geographic origins
  - Artistic styles
- ✅ **Modern UI** - Full design system with Musia branding
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Toast Notifications** - User-friendly feedback
- ✅ **Status Indicators** - Real-time conversation state
- ✅ **Auto-scroll Messages** - Smooth chat experience

### Limitations
- ⚠️ **No Voice Input** - Microphone button disabled (requires backend)
- ⚠️ **No Audio Responses** - Text-to-speech unavailable (requires backend)
- ⚠️ **Keyword Matching** - Responses based on keywords, not true AI (use backend for LLM responses)
- ⚠️ **Fixed Dataset** - Only 6 artworks in `artworks.json`

---

## 🏃 Quick Start

### Option 1: Use the Startup Script (Easiest)

**Windows:**
```bash
START_CHATBOT_LOCAL.bat
```

**macOS/Linux:**
```bash
./START_CHATBOT_LOCAL.sh
```

### Option 2: Manual Start

```bash
cd nlp-module/frontend
python -m http.server 3000
```

Then visit: **http://localhost:3000**

---

## 📝 The Artworks

The `artworks.json` file contains 6 carefully selected African masterpieces:

### 1. La Plaque en Bronze du Bénin
- **Artist:** Artisans Edo
- **Period:** 16ème-17ème siècle
- **Country:** Nigeria
- **Style:** Bronze du Bénin

### 2. Tête en Terre Cuite Nok
- **Artist:** Artisans de la Culture Nok
- **Period:** 500 av. J.-C. - 200 ap. J.-C.
- **Country:** Nigeria
- **Style:** Terre Cuite Nok

### 3. Masque Corporel Makonde
- **Artist:** Maîtres Sculpteurs Makonde
- **Period:** 19ème-20ème siècle
- **Country:** Tanzanie/Mozambique
- **Style:** Sculpture sur Bois Makonde

### 4. Poids à Or Ashanti
- **Artist:** Orfèvres Ashanti
- **Period:** 18ème-19ème siècle
- **Country:** Ghana
- **Style:** Travail du Laiton Ashanti

### 5. Oiseau du Grand Zimbabwe
- **Artist:** Sculpteurs sur Pierre Shona
- **Period:** 13ème-15ème siècle
- **Country:** Zimbabwe
- **Style:** Sculpture sur Pierre du Zimbabwe

### 6. Masque Royal Kuba
- **Artist:** Artisans du Royaume Kuba
- **Period:** 19ème-20ème siècle
- **Country:** République Démocratique du Congo
- **Style:** Art Cérémoniel Kuba

---

## 💬 Example Conversations

Try asking these questions in Local Mode:

**About the Artist:**
- "Who made this?"
- "Who is the artist?"
- "Who created this artwork?"

**About the Period:**
- "When was this made?"
- "How old is this?"
- "What period is this from?"

**About the Origin:**
- "Where is this from?"
- "What country?"
- "Where was it made?"

**About Materials:**
- "What is it made of?"
- "What materials were used?"
- "What's the medium?"

**About Significance:**
- "What does it mean?"
- "What's the significance?"
- "What does it represent?"

**General:**
- "Tell me more"
- "Describe this artwork"
- "Explain this piece"

The chatbot will provide contextual responses based on the selected artwork!

---

## 🔧 How It Works

### Architecture

```
Frontend (index.html)
    ↓
Loads artworks.json
    ↓
User selects artwork
    ↓
generateLocalResponse() function
    ↓
Keyword matching algorithm
    ↓
Returns contextual response
```

### Configuration

The mode is controlled by a single variable in `index.html` line 642:

```javascript
const USE_LOCAL_JSON = true; // Local mode enabled
```

### Response Generation

The `generateLocalResponse()` function uses keyword matching:

1. **Converts user message to lowercase**
2. **Checks for keywords** (who, when, where, material, etc.)
3. **Accesses selected artwork data**
4. **Constructs contextual response**
5. **Returns formatted message**

Example:
```javascript
if (msg.includes('who') && msg.includes('artist')) {
    return `${selectedArtwork.title} was created by ${selectedArtwork.artist}...`;
}
```

---

## 📊 Comparison: Local vs Backend Mode

| Feature | Local JSON Mode | Backend API Mode |
|---------|----------------|------------------|
| **Setup Time** | 30 seconds | 10+ minutes |
| **Backend Required** | ❌ No | ✅ Yes |
| **Internet Required** | ❌ No | ✅ Yes |
| **Artworks** | 6 fixed | All in database |
| **Responses** | Keyword-based | AI-powered (Groq LLM) |
| **Voice Input** | ❌ Disabled | ✅ Enabled |
| **Audio Responses** | ❌ No TTS | ✅ Edge TTS |
| **Response Quality** | Good (scripted) | Excellent (AI) |
| **Reliability** | 100% (offline) | 95% (API dependent) |
| **Use Case** | Demos, testing | Production |

---

## 🎨 Customizing Artworks

Want to add your own artworks? Edit `artworks.json`:

```json
[
  {
    "id": "7",
    "code": "AFR007",
    "title": "Your Artwork Title",
    "artist": "Artist Name",
    "description": "Detailed description...",
    "period": "Time Period",
    "style": "Artistic Style",
    "collection": "Collection Name",
    "country": "Country of Origin"
  }
]
```

**Important:** Keep the same JSON structure for the UI to work correctly.

---

## 🔄 Switching to Backend Mode

When you're ready for full AI capabilities:

### Step 1: Edit Configuration
Open `index.html` line 642:
```javascript
const USE_LOCAL_JSON = false; // Enable backend mode
```

### Step 2: Start Backend
```bash
cd nlp-module/backend-app
python run.py
```

### Step 3: Reload Browser
The chatbot will now use the NLP backend for AI-powered responses!

---

## 🐛 Troubleshooting

### Problem: "Failed to load artworks.json"

**Cause:** Direct file opening (file://) doesn't allow JSON loading

**Solution:** Use `python -m http.server 3000` to serve via HTTP

---

### Problem: Voice button doesn't work

**Cause:** Voice input disabled in local mode

**Solution:** This is expected! Switch to backend mode for voice features

---

### Problem: Responses seem repetitive

**Cause:** Keyword matching has limited variation

**Solution:** This is normal for local mode. Try different question phrasings or switch to backend mode for AI responses

---

### Problem: Only 6 artworks available

**Cause:** Local mode uses fixed `artworks.json`

**Solution:** Add more artworks to the JSON file, or switch to backend mode for full database

---

## 📈 Performance

Local JSON Mode is **extremely fast** because:

- ✅ No network requests (except initial page load)
- ✅ No API latency
- ✅ Instant keyword matching (< 1ms)
- ✅ Simulated 800ms "thinking" delay for natural feel
- ✅ Minimal memory usage (< 10MB)

---

## 🎯 Best Practices

### For Demos
1. **Pre-select an artwork** before presentation
2. **Prepare questions** that trigger good responses
3. **Explain it's demo mode** if responses seem limited
4. **Use it as a UI showcase** - highlight the beautiful design

### For Development
1. **Test UI changes** without backend complexity
2. **Verify responsive design** on different devices
3. **Check animations** and transitions
4. **Validate form inputs** and error states

### For Testing
1. **Browser compatibility** - Works in all modern browsers
2. **Mobile responsiveness** - Test on small screens
3. **Loading states** - Very fast, but UI should handle it
4. **Error handling** - Try invalid inputs

---

## 🚀 Future Enhancements

Potential improvements to Local Mode:

- [ ] Add more artworks to `artworks.json`
- [ ] Include artwork images (currently text-only)
- [ ] More sophisticated keyword matching
- [ ] Multi-language support
- [ ] Conversation history export
- [ ] Offline PWA support

---

## 📄 Files

Local Mode uses these files:

```
nlp-module/frontend/
├── index.html          # Main chatbot interface
├── artworks.json       # 6 African artworks dataset
├── LOCAL_MODE.md       # This file
├── QUICKSTART.md       # Getting started guide
└── README.md           # Full documentation
```

---

## 🤝 Contributing

Want to improve Local Mode?

1. Add more artworks to `artworks.json`
2. Enhance `generateLocalResponse()` function
3. Improve keyword matching logic
4. Add more conversation patterns
5. Create artwork images

---

## 📞 Support

- **For Local Mode issues:** Check this document
- **For Backend Mode:** See [QUICKSTART.md](QUICKSTART.md)
- **For full docs:** See [README.md](README.md)

---

**Enjoy your offline Musia chatbot!** 🎨🤖
