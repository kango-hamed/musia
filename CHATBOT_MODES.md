# 🎨 Chatbot Musia - Guide des 3 Modes

Le chatbot Musia peut fonctionner en **3 modes différents** selon vos besoins.

---

## 📊 Comparaison Rapide

| Fonctionnalité | 🟢 Mode Local | 🔵 Mode IA | 🟣 Mode IA Complet |
|----------------|---------------|------------|---------------------|
| **Backend requis** | ❌ Non | ✅ Oui | ✅ Oui |
| **Réponses** | Scriptées | ✅ IA (Groq) | ✅ IA (Groq) |
| **Audio TTS** | ❌ Non | ✅ Oui | ✅ Oui |
| **Entrée vocale** | ❌ Non | ❌ Non | ✅ Oui |
| **Œuvres** | 6 fixes | Toutes (DB) | Toutes (DB) |
| **Setup** | 30 sec | 5 min | 5 min |
| **Internet** | ❌ Non | ✅ Oui | ✅ Oui |
| **Statut** | ✅ Actif | ✅ **ACTUEL** | 🚧 Futur |

---

## 🟢 Mode 1 : Local JSON (Démo)

### Configuration
```javascript
// index.html lignes 642-643
const USE_LOCAL_JSON = true;
const ENABLE_VOICE_INPUT = false;
```

### Démarrage
```bash
START_CHATBOT_LOCAL.bat   # Windows
./START_CHATBOT_LOCAL.sh  # macOS/Linux
```

### Caractéristiques

**✅ Avantages :**
- Aucun backend nécessaire
- Fonctionne hors ligne
- Setup en 30 secondes
- Parfait pour démos rapides
- Pas de dépendances externes

**⚠️ Limitations :**
- Réponses scriptées (mots-clés)
- 6 œuvres fixes uniquement
- Pas d'audio TTS
- Pas d'entrée vocale
- Pas de contexte conversationnel

**🎯 Idéal pour :**
- Démos rapides
- Tests d'interface
- Présentations stakeholders
- Développement frontend
- Environnements offline

### Exemple de Conversation

**Vous :** "Qui a créé cela ?"
**Musia :** "La Plaque en Bronze du Bénin" a été créée par Artisans Edo. Artisans Edo étaient des artisans renommés du Nigeria, actifs pendant la période 16ème-17ème siècle.

---

## 🔵 Mode 2 : IA sans Voix (PRODUCTION) ⭐

### Configuration
```javascript
// index.html lignes 642-643
const USE_LOCAL_JSON = false;
const ENABLE_VOICE_INPUT = false;
```

### Démarrage
```bash
START_CHATBOT_AI.bat   # Windows
./START_CHATBOT_AI.sh  # macOS/Linux
```

### Caractéristiques

**✅ Avantages :**
- Réponses IA intelligentes (Groq LLM)
- Contexte conversationnel
- Audio TTS pour chaque réponse
- Toutes les œuvres de la base de données
- Réponses en français
- Analyse approfondie possible
- Questions de suivi comprises

**⚠️ Limitations :**
- Backend NLP requis
- Groq API key nécessaire
- Temps de réponse 2-3s
- Pas d'entrée vocale (texte uniquement)

**🎯 Idéal pour :**
- **Production** 🚀
- Conversations intelligentes
- Analyses approfondies
- Audio tours
- Expérience utilisateur complète

### Exemple de Conversation

**Vous :** "Explique-moi l'importance culturelle de cette œuvre dans le contexte de l'empire du Bénin et comment elle reflète la structure politique de l'époque"

**Musia :** *[Réponse IA détaillée de 3-4 paragraphes]*
- Analyse historique du Royaume du Bénin
- Rôle des plaques dans la légitimation du pouvoir
- Contexte politique 16ème-17ème siècle
- Signification des scènes de cour
- Liens avec d'autres œuvres de la période
- ✅ Audio TTS de toute la réponse

**Vous :** "Comment cette approche artistique se compare-t-elle à celle des royaumes voisins ?"

**Musia :** *[Suite contextuelle]*
- Comparaison avec Ife, Oyo, etc.
- Techniques métallurgiques partagées
- Influences et échanges
- ✅ Audio TTS

---

## 🟣 Mode 3 : IA Complet (FUTUR)

### Configuration
```javascript
// index.html lignes 642-643
const USE_LOCAL_JSON = false;
const ENABLE_VOICE_INPUT = true;
```

### Démarrage
```bash
START_CHATBOT.bat   # Windows (futur)
./START_CHATBOT.sh  # macOS/Linux (futur)
```

### Caractéristiques

**✅ Avantages :**
- Toutes les fonctionnalités du Mode IA
- **+ Entrée vocale** (microphone)
- Whisper STT pour transcription
- Expérience mains-libres complète
- Parfait pour musées physiques

**🎯 Idéal pour :**
- Musées physiques avec robot
- Bornes interactives
- Accessibilité
- Visiteurs préférant la voix
- Expérience immersive

### Fonctionnement

1. 🎤 **Vous parlez** dans le microphone
2. 🔄 **Whisper STT** transcrit en texte
3. 🤖 **Groq LLM** génère réponse intelligente
4. 🔊 **Edge TTS** convertit en audio
5. ✅ **Vous recevez** texte + audio

---

## 🚀 Quel Mode Choisir ?

### Pour une Démo Rapide
→ **Mode Local** 🟢
- Pas de setup
- Fonctionne immédiatement

### Pour la Production
→ **Mode IA sans Voix** 🔵 ⭐
- Conversations intelligentes
- Qualité professionnelle
- Facile à utiliser (texte)

### Pour Musée Physique (Futur)
→ **Mode IA Complet** 🟣
- Expérience mains-libres
- Interaction vocale naturelle

---

## 📁 Fichiers de Configuration

### Mode Local
```bash
nlp-module/frontend/
├── index.html (USE_LOCAL_JSON = true)
├── artworks.json (6 œuvres)
└── Pas de backend
```

### Mode IA
```bash
nlp-module/
├── backend-app/
│   ├── run.py (port 8000)
│   └── .env (GROQ_API_KEY)
└── frontend/
    └── index.html (USE_LOCAL_JSON = false)
```

---

## 🛠️ Scripts de Démarrage

| Script | Mode | Backend | Voix |
|--------|------|---------|------|
| `START_CHATBOT_LOCAL` | Local | ❌ | ❌ |
| `START_CHATBOT_AI` | IA | ✅ | ❌ |
| `START_CHATBOT` | IA Complet | ✅ | ✅ |

---

## 📊 Performance par Mode

### Temps de Réponse

| Mode | Temps | Qualité |
|------|-------|---------|
| 🟢 Local | 800ms | ⭐⭐ |
| 🔵 IA | 2-3s | ⭐⭐⭐⭐⭐ |
| 🟣 IA Complet | 3-4s | ⭐⭐⭐⭐⭐ |

### Ressources

| Mode | RAM | CPU | Réseau |
|------|-----|-----|--------|
| 🟢 Local | <10MB | Faible | ❌ |
| 🔵 IA | 200MB | Moyen | API Groq |
| 🟣 IA Complet | 250MB | Élevé | API Groq |

---

## 🔄 Passer d'un Mode à l'Autre

### De Local → IA

1. Configurer backend NLP
2. Obtenir clé Groq API
3. Éditer `index.html` :
   ```javascript
   const USE_LOCAL_JSON = false;
   ```
4. Redémarrer

### De IA → IA Complet

1. Vérifier backend fonctionne
2. Éditer `index.html` :
   ```javascript
   const ENABLE_VOICE_INPUT = true;
   ```
3. Recharger page
4. Autoriser microphone

---

## 📚 Documentation par Mode

### Mode Local
- [LOCAL_MODE.md](nlp-module/frontend/LOCAL_MODE.md)
- [CHATBOT_FRANCAIS.md](nlp-module/frontend/CHATBOT_FRANCAIS.md)

### Mode IA
- [AI_MODE.md](nlp-module/frontend/AI_MODE.md)
- [MODE_IA_RESUME.md](MODE_IA_RESUME.md)
- [QUICKSTART.md](nlp-module/frontend/QUICKSTART.md)

### Mode IA Complet
- [README.md](nlp-module/frontend/README.md) (section Backend Mode)

---

## 🎯 Roadmap

### ✅ Phase 1 : Local (Terminé)
- Interface chatbot
- 6 œuvres africaines
- Réponses scriptées

### ✅ Phase 2 : IA sans Voix (ACTUEL)
- Intégration Groq LLM
- Audio TTS
- Mode français

### 🚧 Phase 3 : IA Complet (Futur)
- Entrée vocale
- Whisper STT
- Expérience mains-libres

### 📋 Phase 4 : Optimisations (Planifié)
- Streaming réponses
- Cache LLM
- Analytics
- Multi-langue

---

## 🎉 Commandes Rapides

```bash
# Mode Local (démo rapide)
cd nlp-module/frontend && python -m http.server 3000

# Mode IA (production)
START_CHATBOT_AI.bat

# Mode IA Complet (futur)
START_CHATBOT.bat
```

---

**Choisissez votre mode et profitez du chatbot Musia !** 🎨🤖✨
