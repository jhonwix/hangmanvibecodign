@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    Hangman Game - Quick Start
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running. Please start Docker first.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Check if .env files exist
if not exist ".\backend\.env" (
    echo [INFO] Creating backend .env from example...
    copy ".\backend\.env.example" ".\backend\.env" >nul
)

if not exist ".\frontend\.env" (
    echo [INFO] Creating frontend .env from example...
    copy ".\frontend\.env.example" ".\frontend\.env" >nul
)

echo [OK] Environment files ready
echo.

REM Ask for environment
echo Select environment:
echo 1) Development (with hot reload)
echo 2) Production (optimized build)
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo.
    echo [INFO] Starting development environment...
    docker-compose up -d

    echo.
    echo [OK] Development environment started!
    echo.
    echo Services available at:
    echo   Frontend:  http://localhost:5173
    echo   Backend:   http://localhost:3000
    echo   Adminer:   http://localhost:8080
    echo.
    echo To view logs: docker-compose logs -f
    echo To stop:      docker-compose down
) else if "%choice%"=="2" (
    echo.
    echo [INFO] Building production images...
    docker-compose -f docker-compose.prod.yml build

    echo.
    echo [INFO] Starting production environment...
    docker-compose -f docker-compose.prod.yml up -d

    echo.
    echo [OK] Production environment started!
    echo.
    echo Services available at:
    echo   Application: http://localhost
    echo   Backend API: http://localhost:3000
    echo.
    echo To view logs: docker-compose -f docker-compose.prod.yml logs -f
    echo To stop:      docker-compose -f docker-compose.prod.yml down
) else (
    echo [ERROR] Invalid choice. Exiting.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Setup Complete! Happy Gaming!
echo ========================================
pause
