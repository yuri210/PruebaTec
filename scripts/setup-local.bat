@echo off
echo 🚀 Configurando PruebaTec en tu PC local...

REM Verificar PHP
php --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PHP no está instalado. Instala PHP 8.2+ desde https://www.php.net/downloads.php
    pause
    exit /b 1
)

REM Verificar Composer
composer --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Composer no está instalado. Instala desde https://getcomposer.org/download/
    pause
    exit /b 1
)

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Instala desde https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Todos los requisitos están instalados

REM Configurar Backend
echo 📋 Configurando Backend Laravel...
cd backend

REM Instalar dependencias
composer install
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias de Composer
    pause
    exit /b 1
)

REM Configurar entorno
if not exist .env (
    copy .env.example .env
    echo ✅ Archivo .env creado
) else (
    echo ⚠️ Archivo .env ya existe
)

REM Generar clave
php artisan key:generate

REM Crear base de datos
if not exist database\database.sqlite (
    echo. > database\database.sqlite
    echo ✅ Base de datos SQLite creada
) else (
    echo ⚠️ Base de datos ya existe
)

REM Ejecutar migraciones
php artisan migrate --seed

REM Limpiar cache
php artisan config:cache
php artisan route:cache

echo ✅ Backend configurado correctamente

REM Volver a la raíz
cd ..

REM Configurar Frontend
echo 📋 Configurando Frontend React...
cd frontend

REM Instalar dependencias
npm install
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias de npm
    pause
    exit /b 1
)

REM Configurar entorno
if not exist .env (
    copy .env.example .env
    echo ✅ Archivo .env del frontend creado
) else (
    echo ⚠️ Archivo .env del frontend ya existe
)

echo ✅ Frontend configurado correctamente

REM Volver a la raíz
cd ..

REM Configurar Git
echo 📋 Configurando Git...
if not exist .git (
    git init
    echo ✅ Repositorio Git inicializado
) else (
    echo ⚠️ Repositorio Git ya existe
)

REM Mostrar instrucciones finales
echo.
echo 🎉 ¡Configuración completada!
echo.
echo 📋 Próximos pasos:
echo.
echo 1. Iniciar el backend:
echo    cd backend ^&^& php artisan serve
echo.
echo 2. Iniciar el frontend (en otra terminal):
echo    cd frontend ^&^& npm run dev
echo.
echo 3. Probar la API:
echo    curl -H "X-API-Key: esto-es-pruebas-yuri" http://127.0.0.1:8000/api/v1/locations
echo.
echo 4. Abrir el frontend:
echo    http://localhost:3000
echo.
echo 📝 URLs importantes:
echo    Backend API: http://127.0.0.1:8000
echo    Frontend: http://localhost:3000
echo    API Key: esto-es-pruebas-yuri
echo.
echo ¡Tu proyecto PruebaTec está listo! 🚀
pause