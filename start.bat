@echo off
REM Navigate to your app’s directory
REM cd /d "C:\path\to\your\nextjs-app"

REM Install dependencies (only needed if you update packages)
npm install

REM Build the app (compile TypeScript)
npm run build

REM Start the production server
npm run start