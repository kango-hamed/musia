# 🤖 Mode IA - Chatbot Musia avec Intelligence Artificielle

Le chatbot Musia fonctionne maintenant avec **l'IA complète** (Groq LLM) mais **sans entrée vocale** pour le moment.

---

## 🎯 Configuration Actuelle

### Mode Activé : Backend IA
```javascript
const USE_LOCAL_JSON = false;      // ✅ Backend IA activé
const ENABLE_VOICE_INPUT = false;  // ⚠️ Entrée vocale désactivée
```

### Fonctionnalités Disponibles

| Fonctionnalité | Statut | Description |
|----------------|--------|-------------|
| **Réponses IA** | ✅ Activé | Utilise Groq LLM (Llama 3.1-8b-instant) |
| **Chat Texte** | ✅ Activé | Questions/réponses en temps réel |
| **Audio TTS** | ✅ Activé | Réponses audio avec Edge TTS |
| **Toutes les Œuvres** | ✅ Activé | Accès à toute la base de données |
| **Entrée Vocale** | ❌ Désactivé | Microphone désactivé temporairement |
| **Conversation Intelligente** | ✅ Activé | Contexte et mémoire de conversation |

---

## 🚀 Démarrage Rapide

### Prérequis
- ✅ Python 3.11+
- ✅ Clé API Groq (gratuite)
- ✅ Backend NLP configuré

### Option 1 : Script Automatique (Recommandé)

**Windows :**
```bash
START_CHATBOT_AI.bat
```

**macOS/Linux :**
```bash
./START_CHATBOT_AI.sh
```

Le script démarre automatiquement :
1. Backend NLP sur port 8000
2. Frontend sur port 3000
3. Ouvre le navigateur

### Option 2 : Démarrage Manuel

**Terminal 1 - Backend NLP :**
```bash
cd nlp-module/backend-app
python run.py
```

**Terminal 2 - Frontend :**
```bash
cd nlp-module/frontend
python -m http.server 3000
```

**Navigateur :**
Visitez http://localhost:3000

---

## 💬 Différences avec le Mode Local

### Mode Local (JSON)
- ⚡ Réponses instantanées (800ms simulé)
- 📋 Réponses basées sur mots-clés
- 💾 6 œuvres fixes en JSON
- 🔌 Fonctionne hors ligne
- 🎯 Réponses scriptées

### Mode IA (Backend) - Actuel
- 🤖 **Réponses intelligentes de l'IA**
- 💡 Comprend le contexte et les nuances
- 🗣️ Conversations naturelles
- 🌐 Accès à toute la base de données
- 🔊 Audio TTS pour chaque réponse
- ⏱️ Temps de réponse : 1-3 secondes

---

## 🎨 Exemple de Conversation avec IA

### Avec Mode Local (Keyword)
**Vous :** "Parle-moi de cette œuvre"
**Musia :** *[Réponse scriptée basique]*

### Avec Mode IA (Actuel)
**Vous :** "Parle-moi de cette œuvre et de son importance dans l'histoire africaine"
**Musia :** *[Réponse IA détaillée et contextuelle, générée par Groq LLM, tenant compte de l'histoire, la culture, l'art africain, etc.]*

**Vous :** "Pourquoi les artistes Edo utilisaient-ils cette technique ?"
**Musia :** *[Réponse IA expliquant les raisons historiques, culturelles et techniques, avec contexte]*

**Vous :** "Compare cette œuvre avec l'art européen de la même période"
**Musia :** *[Analyse comparative intelligente par l'IA]*

---

## ⚙️ Configuration Backend

### Fichier .env (nlp-module/backend-app/.env)

```bash
# API Groq (obligatoire)
GROQ_API_KEY=gsk_votre_clé_groq_ici

# URL du backend principal (optionnel)
MUSIA_BACKEND_URL=http://localhost:3001/api
```

### Obtenir une Clé Groq (Gratuit)

1. Visitez https://console.groq.com
2. Créez un compte gratuit
3. Générez une clé API
4. Copiez dans `.env`

**Quota gratuit :**
- 🆓 14,400 requêtes/jour
- ⚡ Très rapide (Llama 3.1)
- 💯 Suffisant pour développement

---

## 🔊 Audio Text-to-Speech

### Comment ça marche

1. **Vous posez une question** (texte uniquement)
2. **Groq LLM génère la réponse** en français
3. **Edge TTS convertit en audio** automatiquement
4. **Vous recevez :**
   - Texte de la réponse (affiché dans le chat)
   - Fichier audio MP3 (lecture automatique)

### Contrôles Audio
- 🔊 Lecture automatique pour la première réponse
- ▶️ Bouton play/pause pour les réponses suivantes
- 🔁 Réécouter à volonté

---

## 🎤 Pourquoi l'Entrée Vocale est Désactivée ?

L'entrée vocale (microphone) est temporairement désactivée pour :

1. **Simplifier l'utilisation** - Pas besoin de permissions micro
2. **Focus sur l'IA textuelle** - Tester d'abord les réponses IA
3. **Développement progressif** - Activer la voix plus tard

### Pour Activer la Voix Plus Tard

Éditez `index.html` ligne 643 :
```javascript
const ENABLE_VOICE_INPUT = true;  // Activer l'entrée vocale
```

**Le microphone permettra alors :**
- 🎙️ Enregistrement de questions vocales
- 🔄 Transcription automatique (Whisper STT)
- 🤖 Réponses IA comme d'habitude
- 🔊 Audio TTS de la réponse

---

## 📊 Architecture du Mode IA

```
Utilisateur tape une question
        ↓
Frontend (index.html)
        ↓
POST /conversation/text
        ↓
Backend NLP (FastAPI)
        ├─ Chargement du contexte de l'œuvre
        ├─ Classification de l'intention (NLP)
        ├─ Groq LLM (Llama 3.1-8b-instant)
        │   └─ Génère réponse intelligente en français
        ├─ Edge TTS
        │   └─ Convertit texte → audio MP3
        └─ Stockage conversation
        ↓
Retour à Frontend
        ├─ Texte de la réponse
        └─ URL audio MP3
        ↓
Affichage + Lecture audio
```

---

## 🧪 Test du Mode IA

### Checklist de Test

**Backend :**
- [ ] Backend démarre sur port 8000
- [ ] `curl http://localhost:8000/artworks` retourne JSON
- [ ] Groq API key configurée dans .env
- [ ] Pas d'erreurs dans les logs

**Frontend :**
- [ ] Page charge à http://localhost:3000
- [ ] Œuvres s'affichent dans la barre latérale
- [ ] Clic sur œuvre → Message de bienvenue avec audio
- [ ] Taper question → Réponse IA + audio
- [ ] Bouton microphone désactivé (message d'erreur)

**Réponses IA :**
- [ ] Questions simples → Réponses appropriées
- [ ] Questions complexes → Analyse détaillée
- [ ] Questions de suivi → Contexte conservé
- [ ] Comparaisons → Réponses comparatives
- [ ] Questions hors-sujet → Recentrage sur l'œuvre

---

## 🐛 Dépannage

### Problème : "Échec du chargement des œuvres"

**Solution :**
1. Vérifier backend : `curl http://localhost:8000/artworks`
2. Vérifier `USE_LOCAL_JSON = false` dans index.html
3. Redémarrer le backend

---

### Problème : Réponses en anglais au lieu du français

**Solution :**
Le backend doit être configuré pour répondre en français.

Vérifier dans `nlp-module/backend-app/app/services/llm.py` :
```python
system_prompt = """Tu es Musia, un guide muséal AI qui parle français.
Réponds TOUJOURS en français, même si la question est en anglais."""
```

---

### Problème : Pas d'audio

**Solutions :**
1. Vérifier que le navigateur n'est pas muet
2. Tester : `curl -X POST http://localhost:8000/test/tts -H "Content-Type: application/json" -d '{"text":"Bonjour"}'`
3. Vérifier que Edge TTS est installé : `pip list | grep edge-tts`

---

### Problème : Erreur "Groq API"

**Solutions :**
1. Vérifier clé API dans `.env`
2. Vérifier quota : https://console.groq.com
3. Tester clé : `curl https://api.groq.com/openai/v1/models -H "Authorization: Bearer gsk_..."`

---

## 📈 Performance

### Temps de Réponse Typique

- **Question simple :** 1-2 secondes
- **Question complexe :** 2-3 secondes
- **Génération TTS :** +500ms-1s
- **Total :** 1.5-4 secondes

### Optimisations Possibles

1. **Cache LLM** - Stocker réponses communes
2. **TTS pré-généré** - Pour messages de bienvenue
3. **Streaming** - Afficher réponse au fur et à mesure
4. **Queue** - Gérer plusieurs requêtes simultanées

---

## 🔄 Modes Disponibles

Le chatbot peut fonctionner en 3 modes :

### 1. Mode Local (JSON uniquement)
```javascript
USE_LOCAL_JSON = true
ENABLE_VOICE_INPUT = false
```
- ✅ Aucun backend nécessaire
- ⚠️ Réponses scriptées

### 2. Mode IA sans Voix (Actuel)
```javascript
USE_LOCAL_JSON = false
ENABLE_VOICE_INPUT = false
```
- ✅ Réponses IA intelligentes
- ✅ Audio TTS
- ⚠️ Pas d'entrée vocale

### 3. Mode IA Complet (Futur)
```javascript
USE_LOCAL_JSON = false
ENABLE_VOICE_INPUT = true
```
- ✅ Réponses IA intelligentes
- ✅ Audio TTS
- ✅ Entrée vocale (microphone)

---

## 🎯 Prochaines Étapes

### Court Terme
- [ ] Tester réponses IA en français
- [ ] Ajuster prompts système si nécessaire
- [ ] Améliorer temps de réponse
- [ ] Ajouter plus d'œuvres à la base

### Moyen Terme
- [ ] Activer l'entrée vocale
- [ ] Ajouter streaming des réponses
- [ ] Implémenter cache LLM
- [ ] Améliorer gestion du contexte

### Long Terme
- [ ] Support multilingue complet
- [ ] Personnalités du guide (enfant/adulte/expert)
- [ ] Visites guidées automatiques
- [ ] Analytics des conversations

---

## 📚 Documentation

- **Configuration :** Voir [QUICKSTART.md](QUICKSTART.md)
- **Mode Local :** Voir [LOCAL_MODE.md](LOCAL_MODE.md)
- **Questions FR :** Voir [QUESTIONS_FRANCAIS.md](QUESTIONS_FRANCAIS.md)
- **Backend NLP :** Voir `nlp-module/CLAUDE.md`

---

**Profitez du chatbot Musia avec intelligence artificielle complète !** 🤖🎨✨
