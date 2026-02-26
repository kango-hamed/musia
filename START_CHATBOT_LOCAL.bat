@echo off
echo ========================================
echo  MUSIA CHATBOT - LOCAL MODE (No Backend)
echo ========================================
echo.
echo Starting chatbot with 6 African artworks...
echo No backend required - uses local JSON data
echo.

:: Check if we're in the right directory
if not exist "nlp-module\frontend\artworks.json" (
    echo ERROR: Please run this script from the musia project root directory
    pause
    exit /b 1
)

:: Start frontend web server
echo Starting Chatbot on port 3000...
cd nlp-module\frontend
start "Musia Chatbot - Local Mode" cmd /k "python -m http.server 3000"

:: Wait a bit for server to start
timeout /t 2 /nobreak > nul

:: Open browser
echo.
echo ========================================
echo  MUSIA CHATBOT - Ready!
echo ========================================
echo.
echo Chatbot:  http://localhost:3000
echo Mode:     LOCAL JSON (6 African Artworks)
echo.
echo Features:
echo   + Text chat with keyword-based responses
echo   + 6 curated African artworks
echo   + No backend or API required
echo   - Voice input disabled
echo   - No audio responses
echo.
echo Opening chatbot in browser...
echo.
timeout /t 1 /nobreak > nul
start http://localhost:3000

echo.
echo ========================================
echo  To stop: Close the terminal window
echo ========================================
echo.
pause
