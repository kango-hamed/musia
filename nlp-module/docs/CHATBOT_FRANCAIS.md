# 🇫🇷 Chatbot Musia - Version Française

Le chatbot Musia parle maintenant **entièrement en français** ! Toutes les œuvres d'art et les réponses sont en français.

---

## ✅ Ce qui a été traduit

### 1. Fichier de Données (artworks.json)

Toutes les 6 œuvres d'art africaines ont été traduites en français :

| Titre Original | Titre Français |
|----------------|----------------|
| The Benin Bronze Plaque | La Plaque en Bronze du Bénin |
| Nok Terracotta Head | Tête en Terre Cuite Nok |
| Makonde Body Mask | Masque Corporel Makonde |
| Ashanti Gold Weight | Poids à Or Ashanti |
| Great Zimbabwe Bird | Oiseau du Grand Zimbabwe |
| Kuba Royal Mask | Masque Royal Kuba |

**Tous les champs traduits :**
- ✅ `title` - Titres des œuvres
- ✅ `artist` - Noms des artistes
- ✅ `description` - Descriptions complètes
- ✅ `period` - Périodes historiques
- ✅ `style` - Styles artistiques
- ✅ `collection` - Noms des collections
- ✅ `country` - Noms des pays

### 2. Interface du Chatbot (index.html)

Toutes les réponses sont maintenant en français :

**Message de bienvenue :**
```
Bienvenue ! Je suis Musia, votre guide muséal AI.
Vous avez sélectionné "La Plaque en Bronze du Bénin" par Artisans Edo.
[Description...] N'hésitez pas à me poser des questions sur cette
fascinante pièce de la collection Art d'Afrique de l'Ouest !
```

**Types de réponses :**
- ✅ Questions sur l'artiste → Français
- ✅ Questions sur la période → Français
- ✅ Questions sur l'origine → Français
- ✅ Questions sur les matériaux → Français
- ✅ Questions sur le style → Français
- ✅ Questions sur la signification → Français
- ✅ Salutations → Français
- ✅ Remerciements → Français
- ✅ Réponse par défaut → Français

**Messages système :**
- ✅ Chargement : `"6 œuvres d'art africaines chargées"`
- ✅ Démarrage : `"Démarrage de la conversation..."`
- ✅ Réflexion : `"Réflexion..."`
- ✅ Erreurs : `"Échec du chargement"`, `"Erreur de connexion"`
- ✅ Voix désactivée : `"L'entrée vocale nécessite une connexion au serveur"`

### 3. Support Bilingue

Le chatbot **comprend les deux langues** mais **répond toujours en français** :

**Questions acceptées :**
- 🇫🇷 Français : "Qui a créé cela ?", "Quand ?", "D'où ça vient ?"
- 🇬🇧 Anglais : "Who made this?", "When?", "Where is it from?"

**Réponses :**
- ✅ Toujours en français, quelle que soit la langue de la question !

---

## 🚀 Démarrage Rapide

### Étape 1 : Lancer le serveur
```bash
cd nlp-module/frontend
python -m http.server 3000
```

### Étape 2 : Ouvrir le navigateur
Visitez : **http://localhost:3000**

### Étape 3 : Commencer à discuter
1. Cliquez sur une œuvre dans la barre latérale
2. Attendez le message de bienvenue en français
3. Posez vos questions en français (ou en anglais)
4. Recevez des réponses en français !

---

## 💬 Exemples de Conversations

### Exemple 1 : À propos de l'artiste

**Vous :** "Qui a créé cette œuvre ?"

**Musia :** "La Plaque en Bronze du Bénin" a été créée par Artisans Edo. Artisans Edo étaient des artisans renommés du Nigeria, actifs pendant la période 16ème-17ème siècle.

---

### Exemple 2 : À propos de la période

**Vous :** "Quand cela a-t-il été fait ?"

**Musia :** Cette œuvre date de la période 16ème-17ème siècle. Elle représente une période importante de l'histoire de l'art africain du Nigeria.

---

### Exemple 3 : À propos de l'origine

**Vous :** "D'où vient cette œuvre ?"

**Musia :** "La Plaque en Bronze du Bénin" provient du Nigeria. Elle fait partie de notre collection Art d'Afrique de l'Ouest.

---

### Exemple 4 : À propos des matériaux

**Vous :** "En quoi est-ce fait ?"

**Musia :** Cette pièce est fabriquée en bronze. La technique bronze du bénin était très sophistiquée, démontrant des compétences métallurgiques et artistiques avancées.

---

### Exemple 5 : Informations complètes

**Vous :** "Dis-moi plus"

**Musia :** Une magnifique plaque en bronze du Royaume du Bénin, représentant des scènes de cour royale et des guerriers. Ces plaques ornaient les murs du palais royal et représentent certains des plus beaux travaux de métallurgie de l'histoire de l'art africain. Créée durant la période 16ème-17ème siècle, cette œuvre représente le summum de l'art bronze du bénin. Elle fait partie de notre collection Art d'Afrique de l'Ouest et offre une fenêtre sur les traditions artistiques sophistiquées du Nigeria.

---

## 🎨 Les 6 Œuvres en Français

### 1. 🏛️ La Plaque en Bronze du Bénin
- **Artiste :** Artisans Edo
- **Période :** 16ème-17ème siècle
- **Pays :** Nigeria
- **Collection :** Art d'Afrique de l'Ouest

### 2. 🗿 Tête en Terre Cuite Nok
- **Artiste :** Artisans de la Culture Nok
- **Période :** 500 av. J.-C. - 200 ap. J.-C.
- **Pays :** Nigeria
- **Collection :** Art Africain Ancien

### 3. 🎭 Masque Corporel Makonde
- **Artiste :** Maîtres Sculpteurs Makonde
- **Période :** 19ème-20ème siècle
- **Pays :** Tanzanie/Mozambique
- **Collection :** Art d'Afrique de l'Est

### 4. ⚖️ Poids à Or Ashanti
- **Artiste :** Orfèvres Ashanti
- **Période :** 18ème-19ème siècle
- **Pays :** Ghana
- **Collection :** Art d'Afrique de l'Ouest

### 5. 🦅 Oiseau du Grand Zimbabwe
- **Artiste :** Sculpteurs sur Pierre Shona
- **Période :** 13ème-15ème siècle
- **Pays :** Zimbabwe
- **Collection :** Art d'Afrique Australe

### 6. 👑 Masque Royal Kuba
- **Artiste :** Artisans du Royaume Kuba
- **Période :** 19ème-20ème siècle
- **Pays :** République Démocratique du Congo
- **Collection :** Art d'Afrique Centrale

---

## 📚 Questions Fréquentes

### Le chatbot comprend-il l'anglais ?

**Oui !** Le chatbot détecte les mots-clés en français **ET** en anglais :
- "Qui" ou "Who" → Information sur l'artiste
- "Quand" ou "When" → Information sur la période
- "Où" ou "Where" → Information sur l'origine

**Mais** : Les réponses sont **toujours en français** !

### Puis-je changer la langue ?

Pour revenir à l'anglais, vous devrez modifier :
1. Le fichier `artworks.json` (traduire en anglais)
2. La fonction `generateLocalResponse()` dans `index.html`

### Le mode backend est-il aussi en français ?

**Non**, le mode backend (avec IA Groq) utilise l'anglais par défaut.

Pour des réponses IA en français, vous devrez :
1. Configurer le backend pour répondre en français
2. Ajuster les prompts système du LLM

---

## 🔧 Fichiers Modifiés

### Fichiers principaux
- ✅ **artworks.json** - Toutes les données traduites en français
- ✅ **index.html** - Toutes les réponses en français

### Documentation mise à jour
- ✅ **QUESTIONS_FRANCAIS.md** - Guide des questions en français
- ✅ **LOCAL_MODE.md** - Titres des œuvres mis à jour
- ✅ **CHATBOT_FRANCAIS.md** - Ce fichier (récapitulatif)

---

## 🎯 Mots-Clés Détectés

Le chatbot reconnaît ces mots-clés **en français et en anglais** :

### Questions sur l'artiste
🇫🇷 `qui`, `artiste`, `créé`, `fait`
🇬🇧 `who`, `artist`, `create`, `made`

### Questions sur la période
🇫🇷 `quand`, `période`, `date`, `âge`
🇬🇧 `when`, `period`, `date`, `old`

### Questions sur l'origine
🇫🇷 `où`, `origine`, `provenance`
🇬🇧 `where`, `origin`, `from`

### Questions sur les matériaux
🇫🇷 `matériau`, `composé`
🇬🇧 `material`, `made of`, `medium`

### Questions sur le style
🇫🇷 `style`, `technique`
🇬🇧 `style`, `technique`

### Questions sur la signification
🇫🇷 `signifie`, `signification`, `symbole`, `représente`
🇬🇧 `mean`, `symbol`, `represent`

### Salutations
🇫🇷 `bonjour`, `salut`
🇬🇧 `hello`, `hi`, `hey`

### Remerciements
🇫🇷 `merci`
🇬🇧 `thank`

### Demande d'info complète
🇫🇷 `dis-moi`, `décris`, `explique`
🇬🇧 `tell me more`, `describe`, `explain`

---

## ✨ Avantages de la Version Française

1. ✅ **Accessibilité** - Public francophone peut utiliser le chatbot
2. ✅ **Précision culturelle** - Noms français pour les périodes historiques
3. ✅ **Expérience cohérente** - Tout est en français de bout en bout
4. ✅ **Support bilingue** - Comprend aussi l'anglais pour la flexibilité
5. ✅ **Facile à tester** - Aucune configuration backend nécessaire

---

## 🚀 Prochaines Étapes Possibles

### Améliorations suggérées
- [ ] Ajouter plus de variantes de questions en français
- [ ] Améliorer les descriptions des œuvres
- [ ] Ajouter des images des œuvres
- [ ] Créer une version multilingue (français/anglais/autres)
- [ ] Intégrer le TTS français pour les réponses audio

### Pour le mode backend
- [ ] Configurer Groq LLM pour répondre en français
- [ ] Traduire les prompts système
- [ ] Ajouter Edge TTS avec voix française

---

## 📞 Ressources

- **Guide des questions :** [QUESTIONS_FRANCAIS.md](QUESTIONS_FRANCAIS.md)
- **Guide du mode local :** [LOCAL_MODE.md](LOCAL_MODE.md)
- **Documentation complète :** [README.md](README.md)
- **Démarrage rapide :** [QUICKSTART.md](QUICKSTART.md)

---

**Profitez de votre chatbot Musia en français !** 🎨🇫🇷✨
