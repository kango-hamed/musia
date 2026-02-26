#!/bin/bash

echo "========================================"
echo " MUSIA CHATBOT - LOCAL MODE (No Backend)"
echo "========================================"
echo ""
echo "Starting chatbot with 6 African artworks..."
echo "No backend required - uses local JSON data"
echo ""

# Check if we're in the right directory
if [ ! -f "nlp-module/frontend/artworks.json" ]; then
    echo "ERROR: Please run this script from the musia project root directory"
    exit 1
fi

# Start frontend web server
echo "Starting Chatbot on port 3000..."
cd nlp-module/frontend
python -m http.server 3000 > ../../chatbot-local.log 2>&1 &
SERVER_PID=$!
cd ../..

# Wait for server to start
sleep 2

echo ""
echo "========================================"
echo " MUSIA CHATBOT - Ready!"
echo "========================================"
echo ""
echo "Chatbot:  http://localhost:3000"
echo "Mode:     LOCAL JSON (6 African Artworks)"
echo ""
echo "Process ID: $SERVER_PID"
echo "Log file:   chatbot-local.log"
echo ""
echo "Features:"
echo "  + Text chat with keyword-based responses"
echo "  + 6 curated African artworks"
echo "  + No backend or API required"
echo "  - Voice input disabled"
echo "  - No audio responses"
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
echo "   kill $SERVER_PID"
echo " Or:"
echo "   pkill -f 'http.server 3000'"
echo "========================================"
echo ""
