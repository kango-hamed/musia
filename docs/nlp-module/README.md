# Module NLP et Interaction Visiteur

## Vue d'ensemble

Le module NLP constitue "l'intelligence" du robot, permettant:

- Comprendre les questions des visiteurs
- Générer des réponses adaptées
- Guider les visites de manière engageante
- Gérer des conversations naturelles

## Architecture du Moteur NLP

\`\`\`
Microphones → VAD → STT (Whisper) → Classification (Claude)
↓
Extraction entités
↓
Base de connaissances
↓
Génération réponse (Claude)
↓
TTS (Google/ElevenLabs)
↓
Haut-parleurs + Écran
\`\`\`

## Composants Principaux

### 1. Speech-to-Text (STT)

**Solution**: OpenAI Whisper API

- Excellente précision en français
- Robuste au bruit ambiant
- Latence cible: < 1 seconde

### 2. Compréhension (NLP)

**Solution**: Claude 3.5 Sonnet (Anthropic)

**Classification d'intentions**:

- Questions factuelles ("Qui a peint ce tableau?")
- Questions temporelles ("Quand a été créée cette œuvre?")
- Questions techniques ("Quelle technique?")
- Questions contextuelles ("Pourquoi est-elle célèbre?")
- Comparaisons ("Différence avec l'œuvre précédente?")
- Demandes d'anecdotes
- Commandes navigation
- Informations pratiques musée

### 3. Base de Connaissances

Structure JSON par œuvre:
\`\`\`json
{
"artwork_id": "uuid",
"facts": {
"title": "La Joconde",
"artist": "Léonard de Vinci",
"year": "1503-1519"
},
"narratives": {
"short": "...",
"detailed": "...",
"duration": 120
},
"faq": [
{
"question": "Pourquoi sourit-elle ?",
"answer": "...",
"keywords": ["sourire", "expression"]
}
]
}
\`\`\`

### 4. Génération de Réponses

**Pipeline**:

1. Recherche dans FAQ (réponses pré-écrites)
2. Si pas de match → Génération via LLM
3. Post-traitement (longueur, formulation)
4. Conversion TTS

**Paramètres LLM**:

- Température: 0.7
- Max tokens: 300 (≈ 150 mots)
- Timeout: 5 secondes

### 5. Text-to-Speech (TTS)

**Options**:

- Google Cloud TTS (recommandé - coût/qualité)
- ElevenLabs (voix plus naturelles)

Configuration:

- Voix française naturelle
- Vitesse: 0.95x (légèrement ralenti)
- Cache audio pour contenus fréquents

## Gestion des Conversations

### États conversationnels

- **IDLE**: Repos, disponible
- **LISTENING**: Écoute active
- **PROCESSING**: Traitement question
- **SPEAKING**: Diffusion réponse
- **WAITING_FOLLOWUP**: Attente question suivi (10s)
- **PRESENTING**: Présentation œuvre

### Contexte conversationnel

\`\`\`python
conversation_context = {
"current_artwork": "uuid",
"previous_artworks": ["uuid1", "uuid2"],
"last_mentioned_artist": "Léonard de Vinci",
"conversation_history": [...]
}
\`\`\`

## Objectifs de Performance

| Composant      | Latence cible | Max acceptable |
| -------------- | ------------- | -------------- |
| STT            | < 800ms       | 1.5s           |
| Classification | < 300ms       | 500ms          |
| Génération LLM | < 1.5s        | 3s             |
| TTS            | < 500ms       | 1s             |
| **TOTAL**      | **< 3s**      | **5s**         |

## Optimisations

### 1. Cache multi-niveaux

- Mémoire (Redis): Réponses ultra-fréquentes
- DB (PostgreSQL): FAQ pré-écrites
- TTS: Audio segments cachés

### 2. Pré-chargement

Au début d'une visite:

- Charger tous les contenus du trajet
- Pré-générer TTS des présentations
- Charger top 10 FAQ par œuvre

### 3. Streaming

- TTS en streaming (lecture pendant génération)
- Réduire latence perçue

## Cas d'Usage

### Scénario 1: Présentation standard

\`\`\`

1. Robot se positionne devant œuvre
2. "Nous voici devant [titre]"
3. Présentation narrative (2 min)
4. "Avez-vous des questions?"
5. Attente 10s
   → Questions → Répondre
   → Silence → "Passons à la suite"
   \`\`\`

### Scénario 2: Interruption

\`\`\`

1. Présentation en cours
2. Visiteur: "Excuse-moi, robot!"
3. Robot pause
4. "Oui, je vous écoute"
5. Traitement question
6. Réponse
7. "Souhaitez-vous que je reprenne?"
   \`\`\`

### Scénario 3: Information manquante

\`\`\`
Robot: "Excellente question ! Malheureusement,
je n'ai pas cette information.
Je vous invite à vous renseigner auprès
du personnel du musée."
\`\`\`

## Sécurité et Vie Privée

- ❌ Pas de reconnaissance faciale
- ❌ Pas d'enregistrement vidéo visiteurs
- ✅ Audio temporaire (7 jours max)
- ✅ Anonymisation logs après 30 jours
- ✅ RGPD compliant

## API Configuration

### Whisper (STT)

\`\`\`python
openai.Audio.transcribe(
model="whisper-1",
file=audio_file,
language="fr",
temperature=0.2
)
\`\`\`

### Claude (NLP)

\`\`\`python
client.messages.create(
model="claude-sonnet-4-20250514",
max_tokens=300,
temperature=0.7,
system=PROMPT,
messages=[...]
)
\`\`\`

### Google TTS

\`\`\`python
texttospeech.VoiceSelectionParams(
language_code="fr-FR",
name="fr-FR-Neural2-A"
)
\`\`\`

## Voir aussi

- [Base de données](../database-schema.md)
- [Architecture technique](../architecture-technique.md)
- [Interface admin](../admin-interface/)
