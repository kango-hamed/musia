# ⚙️ Configuration du Chatbot Musia

## 📋 Résumé de la Configuration Actuelle

Le chatbot Musia est configuré pour fonctionner en **Mode IA avec fichier JSON local**.

---

## 🎯 Configuration Actuelle

### Variables de Configuration (index.html lignes 641-643)

```javascript
const API_URL = 'http://localhost:8000';
const USE_LOCAL_JSON = false;      // Mode IA activé
const ENABLE_VOICE_INPUT = false;  // Voix désactivée
```

### Source des Œuvres d'Art

**⚠️ IMPORTANT :** Le chatbot utilise **TOUJOURS** le fichier JSON local, même en mode IA.

```javascript
// Le code charge TOUJOURS depuis artworks.json
const response = await fetch('./artworks.json');
```

**Fichier :** `nlp-module/frontend/artworks.json`

**Contenu :** 6 œuvres d'art africaines en français
- La Plaque en Bronze du Bénin
- Tête en Terre Cuite Nok
- Masque Corporel Makonde
- Poids à Or Ashanti
- Oiseau du Grand Zimbabwe
- Masque Royal Kuba

---

## 🔄 Deux Modes de Fonctionnement

### Mode 1 : Local (Keyword)
```javascript
const USE_LOCAL_JSON = true;
```
- ✅ Œuvres : artworks.json
- ✅ Réponses : Scriptées (keywords)
- ❌ Backend : Non requis
- ❌ Audio : Non

### Mode 2 : IA (Actuel)
```javascript
const USE_LOCAL_JSON = false;
```
- ✅ Œuvres : **artworks.json** (toujours)
- ✅ Réponses : **Groq LLM** (IA)
- ✅ Backend : **Requis** (port 8000)
- ✅ Audio : **Edge TTS**

---

## 🎨 Pourquoi Utiliser Toujours le JSON ?

### Avantages

1. **Cohérence des données** - Mêmes 6 œuvres en français partout
2. **Pas de dépendance DB** - Pas besoin de base de données backend
3. **Démarrage rapide** - Backend NLP suffit, pas de setup DB
4. **Contrôle total** - Vous maîtrisez exactement quelles œuvres sont disponibles
5. **Performance** - Chargement instantané des œuvres

### Fonctionnement Hybride

```
Œuvres d'art (artworks.json)
        ↓
Frontend charge les 6 œuvres
        ↓
Utilisateur sélectionne une œuvre
        ↓
Frontend envoie question + contexte œuvre → Backend NLP
        ↓
Backend NLP (FastAPI)
  ├─ Reçoit : question + données œuvre JSON
  ├─ Groq LLM génère réponse intelligente
  ├─ Edge TTS crée audio
  └─ Retourne : réponse IA + audio
        ↓
Frontend affiche réponse IA + audio
```

---

## 📊 Comparaison des Modes

| Aspect | Mode Local | Mode IA (Actuel) |
|--------|------------|------------------|
| **Œuvres** | artworks.json | artworks.json |
| **Réponses** | Keywords | ✅ Groq LLM |
| **Audio** | ❌ | ✅ Edge TTS |
| **Backend** | ❌ | ✅ Port 8000 |
| **DB** | ❌ | ❌ |
| **Qualité** | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🔧 Pour Modifier les Œuvres

### Éditer le Fichier JSON

**Fichier :** `nlp-module/frontend/artworks.json`

```json
[
  {
    "id": "7",
    "code": "AFR007",
    "title": "Nouvelle Œuvre",
    "artist": "Artiste",
    "description": "Description complète...",
    "period": "Période historique",
    "style": "Style artistique",
    "collection": "Collection",
    "country": "Pays"
  }
]
```

**Recharger la page** et la nouvelle œuvre apparaîtra !

---

## 🎯 Configuration Backend NLP

### Fichier .env (nlp-module/backend-app/.env)

```bash
# Obligatoire pour le mode IA
GROQ_API_KEY=gsk_votre_clé_ici

# Optionnel
MUSIA_BACKEND_URL=http://localhost:3001/api
```

### Pas de Base de Données Requise !

Le backend NLP n'a **pas besoin** de base de données car :
- Les œuvres viennent du JSON frontend
- Les conversations sont en mémoire
- Pas de persistence nécessaire pour l'IA

---

## 🚀 Démarrage

### Étape 1 : Backend NLP
```bash
cd nlp-module/backend-app
python run.py
```

### Étape 2 : Frontend
```bash
cd nlp-module/frontend
python -m http.server 3000
```

### Étape 3 : Test
1. Ouvrir http://localhost:3000
2. 6 œuvres africaines s'affichent (depuis JSON)
3. Cliquer sur une œuvre
4. Poser une question
5. Recevoir réponse IA + audio

---

## 📝 Flux de Données

### Chargement des Œuvres
```
1. Page charge
2. fetch('./artworks.json')
3. Affichage des 6 œuvres dans sidebar
```

### Conversation
```
1. Utilisateur sélectionne œuvre #1
2. Frontend lit données œuvre depuis artworksData
3. Frontend envoie à backend :
   POST /conversation/start?artwork_id=1
4. Backend NLP :
   - Crée session
   - Génère message bienvenue (IA)
   - Génère audio (TTS)
5. Frontend reçoit :
   - session_id
   - message (texte IA)
   - audio_url
6. Frontend affiche + joue audio
```

### Questions
```
1. Utilisateur tape question
2. Frontend envoie :
   POST /conversation/text
   {
     "session_id": "...",
     "message": "Question utilisateur",
     "artwork_context": { données de artworksData }
   }
3. Backend NLP :
   - Groq LLM génère réponse
   - Edge TTS crée audio
4. Frontend reçoit :
   - response (texte IA)
   - audio_url
5. Affichage + lecture
```

---

## 🔄 Pour Passer à une Base de Données

Si vous voulez utiliser une vraie base de données à l'avenir :

### 1. Modifier loadArtworks()

```javascript
async function loadArtworks() {
    // Option 1 : JSON local (actuel)
    const response = await fetch('./artworks.json');

    // Option 2 : Backend API (futur)
    // const response = await fetch(`${API_URL}/artworks`);

    const artworks = await response.json();
    artworksData = artworks;
    // ...
}
```

### 2. Backend Doit Retourner Format JSON

Le backend devrait retourner le même format :

```json
[
  {
    "id": "1",
    "title": "La Plaque en Bronze du Bénin",
    "artist": "Artisans Edo",
    "description": "...",
    "period": "16ème-17ème siècle",
    "style": "Bronze du Bénin",
    "collection": "Art d'Afrique de l'Ouest",
    "country": "Nigeria"
  }
]
```

---

## ✅ Vérification de la Configuration

### Checklist

- [ ] `index.html` ligne 642 : `USE_LOCAL_JSON = false`
- [ ] `index.html` ligne 643 : `ENABLE_VOICE_INPUT = false`
- [ ] `artworks.json` existe dans `nlp-module/frontend/`
- [ ] `artworks.json` contient 6 œuvres africaines en français
- [ ] Backend NLP sur port 8000
- [ ] Frontend sur port 3000
- [ ] `.env` avec `GROQ_API_KEY`

### Test Rapide

```bash
# Test 1 : Œuvres JSON chargent
curl http://localhost:3000/artworks.json

# Test 2 : Backend NLP répond
curl http://localhost:8000/

# Test 3 : Chatbot charge
# Ouvrir http://localhost:3000
# Vérifier 6 œuvres dans sidebar
```

---

## 🎉 Résumé

**Configuration actuelle :**
- ✅ Œuvres : JSON local (6 œuvres africaines)
- ✅ Réponses : Groq LLM (IA)
- ✅ Audio : Edge TTS
- ✅ Langue : Français
- ❌ Voix : Désactivée
- ❌ Base de données : Non requise

**Avantage principal :**
Vous avez le **meilleur des deux mondes** :
- Simplicité du JSON (pas de DB à gérer)
- Intelligence de l'IA (réponses Groq)
- Audio professionnel (Edge TTS)

**Pour activer la voix plus tard :**
`ENABLE_VOICE_INPUT = true`

---

**Votre chatbot est configuré pour une expérience optimale !** 🎨🤖✨
