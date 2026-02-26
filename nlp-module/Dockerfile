# ──────────────────────────────────────────────────────────────────
# Stage 1 : Builder — installation des dépendances
# ──────────────────────────────────────────────────────────────────
FROM python:3.11-slim AS builder

# Dépendances système minimales pour compiler les paquets
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Copier requirements en premier (cache Docker optimisé)
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ──────────────────────────────────────────────────────────────────
# Stage 2 : Runtime — image finale légère
# ──────────────────────────────────────────────────────────────────
FROM python:3.11-slim AS runtime

# Dépendances runtime uniquement (ffmpeg suffit)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier les packages installés depuis le builder
COPY --from=builder /install /usr/local

# Copier le code source
COPY backend-app ./backend-app
COPY data ./data
COPY .env.example .env.example

# Variables d'environnement
ENV PYTHONPATH=/app/backend-app
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Créer les répertoires de données au runtime
RUN mkdir -p data/uploads data/tts_cache

# Exposer le port API
EXPOSE 8000

# Health check Docker natif
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" \
    || exit 1

# Lancer l'application
CMD ["python", "-m", "uvicorn", "backend-app.app.main:sio_app", "--host", "0.0.0.0", "--port", "8000"]
