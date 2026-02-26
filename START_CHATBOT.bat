@echo off
echo ========================================
echo  MUSIA CHATBOT - Starting...
echo ========================================
echo.

:: Check if we're in the right directory
if not exist "nlp-module\backend-app\run.py" (
    echo ERROR: Please run this script from the musia project root directory
    pause
    exit /b 1
)

:: Start NLP Backend in a new window
echo [1/2] Starting NLP Backend on port 8000...
start "Musia NLP Backend" cmd /k "cd nlp-module\backend-app && python run.py"

:: Wait a bit for backend to start
timeout /t 3 /nobreak > nul

:: Start frontend web server in a new window
echo [2/2] Starting Chatbot Frontend on port 3000...
start "Musia Chatbot Frontend" cmd /k "cd nlp-module\frontend && python -m http.server 3000"

:: Wait a bit for frontend to start
timeout /t 2 /nobreak > nul

:: Open browser
echo.
echo ========================================
echo  MUSIA CHATBOT - Ready!
echo ========================================
echo.
echo NLP Backend:  http://localhost:8000
echo Chatbot:      http://localhost:3000
echo.
echo Opening chatbot in browser...
echo.
timeout /t 2 /nobreak > nul
start http://localhost:3000

echo.
echo ========================================
echo  To stop: Close the terminal windows
echo ========================================
echo.
pause
