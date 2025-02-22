@echo off

set HOST=192.168.8.152
set PORT=3000

REM echo Changing directory to D:\Projects\administration-teatar-011
cd /d "D:\Projects\administration-teatar-011"
REM echo Current directory: %cd%

REM Install dependencies (if needed)
REM echo Running npm install...
REM call npm install
REM if errorlevel 1 (
REM   echo npm install failed!
REM   pause
REM   exit /b
REM )

REM Build the app
REM echo Running npm run build...
REM call npm run build
REM if errorlevel 1 (
REM   echo npm run build failed!
REM   pause
REM   exit /b
REM )

REM Start the app
REM echo Starting the app...
call npm run dev
REM if errorlevel 1 (
REM   echo npm run start failed!
REM   pause
REM   exit /b
REM )

REM Pause to keep the window open
REM pause