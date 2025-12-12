FROM python:3.10-slim

# Install system dependencies
# ffmpeg is required for audio processing (Whisper/Edge-TTS)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY backend ./backend
COPY frontend ./frontend
COPY data ./data

# Set environment variables
ENV PYTHONPATH=/app/backend
ENV PYTHONUNBUFFERED=1

# Create directories for data persistence
RUN mkdir -p data/uploads data/tts_cache

# Expose API port
EXPOSE 8000

# Run the server
CMD ["python", "backend/run.py"]
