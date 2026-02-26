#!/bin/bash

echo "========================================"
echo " MUSIA CHATBOT - AI Mode (No Voice)"
echo "========================================"
echo ""
echo "Starting chatbot with full AI capabilities..."
echo "Voice input: DISABLED"
echo "Text-to-speech: ENABLED"
echo ""

# Check if we're in the right directory
if [ ! -f "nlp-module/backend-app/run.py" ]; then
    echo "ERROR: Please run this script from the musia project root directory"
    exit 1
fi

# Start NLP Backend in background
echo "[1/2] Starting NLP Backend on port 8000..."
cd nlp-module/backend-app
python run.py > ../../nlp-backend.log 2>&1 &
NLP_PID=$!
cd ../..

# Wait for backend to start
sleep 3

# Start frontend web server in background
echo "[2/2] Starting Chatbot Frontend on port 3000..."
cd nlp-module/frontend
python -m http.server 3000 > ../../chatbot-frontend.log 2>&1 &
FRONTEND_PID=$!
cd ../..

# Wait for frontend to start
sleep 2

echo ""
echo "========================================"
echo " MUSIA CHATBOT - Ready!"
echo "========================================"
echo ""
echo "NLP Backend:  http://localhost:8000"
echo "Chatbot:      http://localhost:3000"
echo ""
echo "Mode:         AI-Powered (Backend)"
echo "Features:"
echo "  + Full AI responses (Groq LLM)"
echo "  + Text-to-speech audio"
echo "  + All artworks from database"
echo "  - Voice input DISABLED"
echo ""
echo "Configuration:"
echo "  USE_LOCAL_JSON = false"
echo "  ENABLE_VOICE_INPUT = false"
echo ""
echo "Process IDs:"
echo "  NLP Backend:  $NLP_PID"
echo "  Frontend:     $FRONTEND_PID"
echo ""
echo "Logs:"
echo "  NLP:      nlp-backend.log"
echo "  Frontend: chatbot-frontend.log"
echo ""

# Open browser
if command -v xdg-open > /dev/null; then
    echo "Opening chatbot in browser..."
    xdg-open http://localhost:3000
elif command -v open > /dev/null; then
    echo "Opening chatbot in browser..."
    open http://localhost:3000
fi

echo ""
echo "========================================"
echo " To stop:"
echo "   kill $NLP_PID $FRONTEND_PID"
echo " Or:"
echo "   pkill -f 'python run.py'"
echo "   pkill -f 'http.server 3000'"
echo "========================================"
echo ""
