# Guide de Setup Développement

## Prérequis
- Node.js 18+
- Python 3.10+
- PostgreSQL 15+
- Redis 7+
- Git

## Setup initial

### 1. Cloner le repository
```bash
git clone https://github.com/your-org/robot-guide-museum.git
cd robot-guide-museum
```

### 2. Configuration environnement
```bash
cp .env.example .env
# Éditer .env avec vos configurations locales
```

### 3. Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Frontend
```bash
cd frontend
npm install
npm start
```

### 5. NLP Module
```bash
cd nlp-module
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/main.py
```

## Vérification

- Backend : http://localhost:3001/health
- Frontend : http://localhost:3000
- NLP : http://localhost:8000/docs

## Troubleshooting

[Solutions aux problèmes courants]
