#!/bin/bash

echo "🚀 Configurando PruebaTec en tu PC local..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar pasos
step() {
    echo -e "${BLUE}📋 $1${NC}"
}

# Función para mostrar éxito
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar advertencia
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Función para mostrar error
error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Verificar requisitos
step "Verificando requisitos del sistema..."

# Verificar PHP
if ! command -v php &> /dev/null; then
    error "PHP no está instalado. Instala PHP 8.2+ desde https://www.php.net/downloads.php"
fi

PHP_VERSION=$(php -r "echo PHP_VERSION;")
echo "PHP versión: $PHP_VERSION"

# Verificar Composer
if ! command -v composer &> /dev/null; then
    error "Composer no está instalado. Instala desde https://getcomposer.org/download/"
fi

COMPOSER_VERSION=$(composer --version)
echo "Composer: $COMPOSER_VERSION"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    error "Node.js no está instalado. Instala desde https://nodejs.org/"
fi

NODE_VERSION=$(node --version)
echo "Node.js: $NODE_VERSION"

# Verificar npm
if ! command -v npm &> /dev/null; then
    error "npm no está instalado. Viene con Node.js"
fi

NPM_VERSION=$(npm --version)
echo "npm: $NPM_VERSION"

success "Todos los requisitos están instalados"

# Configurar Backend
step "Configurando Backend Laravel..."

cd backend || error "No se encontró la carpeta backend"

# Instalar dependencias
composer install || error "Error instalando dependencias de Composer"

# Configurar entorno
if [ ! -f .env ]; then
    cp .env.example .env
    success "Archivo .env creado"
else
    warning "Archivo .env ya existe"
fi

# Generar clave
php artisan key:generate || error "Error generando clave de aplicación"

# Crear base de datos
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    success "Base de datos SQLite creada"
else
    warning "Base de datos ya existe"
fi

# Ejecutar migraciones
php artisan migrate --seed || error "Error ejecutando migraciones"

# Limpiar cache
php artisan config:cache
php artisan route:cache

success "Backend configurado correctamente"

# Volver a la raíz
cd ..

# Configurar Frontend
step "Configurando Frontend React..."

cd frontend || error "No se encontró la carpeta frontend"

# Instalar dependencias
npm install || error "Error instalando dependencias de npm"

# Configurar entorno
if [ ! -f .env ]; then
    cp .env.example .env
    success "Archivo .env del frontend creado"
else
    warning "Archivo .env del frontend ya existe"
fi

success "Frontend configurado correctamente"

# Volver a la raíz
cd ..

# Configurar Git
step "Configurando Git..."

if [ ! -d .git ]; then
    git init
    success "Repositorio Git inicializado"
else
    warning "Repositorio Git ya existe"
fi

# Configurar template de commits
if [ ! -f .gitmessage ]; then
    git config commit.template .gitmessage
    success "Template de commits configurado"
fi

# Mostrar instrucciones finales
echo ""
echo -e "${GREEN}🎉 ¡Configuración completada!${NC}"
echo ""
echo -e "${BLUE}📋 Próximos pasos:${NC}"
echo ""
echo "1. Iniciar el backend:"
echo "   cd backend && php artisan serve"
echo ""
echo "2. Iniciar el frontend (en otra terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Probar la API:"
echo "   curl -H \"X-API-Key: esto-es-pruebas-yuri\" http://127.0.0.1:8000/api/v1/locations"
echo ""
echo "4. Abrir el frontend:"
echo "   http://localhost:3000"
echo ""
echo "5. Ejecutar tests:"
echo "   cd backend && composer test"
echo "   cd frontend && npm run test:ci"
echo ""
echo -e "${YELLOW}📝 URLs importantes:${NC}"
echo "   Backend API: http://127.0.0.1:8000"
echo "   Frontend: http://localhost:3000"
echo "   API Key: esto-es-pruebas-yuri"
echo ""
echo -e "${GREEN}¡Tu proyecto PruebaTec está listo! 🚀${NC}"