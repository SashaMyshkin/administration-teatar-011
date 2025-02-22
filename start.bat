@echo off
REM Navigate to your app’s directory
REM cd /d "C:\path\to\your\nextjs-app"

set HOST=192.168.8.152
set PORT=3030

echo Changing directory to D:\Projects\administration-teatar-011
cd /d "D:\Projects\administration-teatar-011"
echo Current directory: %cd%

REM Install dependencies (if needed)
echo Running npm install...
call npm install
if errorlevel 1 (
  echo npm install failed!
  pause
  exit /b
)

REM Build the app
echo Running npm run build...
call npm run build
if errorlevel 1 (
  echo npm run build failed!
  pause
  exit /b
)

REM Start the app
echo Starting the app...
call npm run start
if errorlevel 1 (
  echo npm run start failed!
  pause
  exit /b
)

REM Pause to keep the window open
pause