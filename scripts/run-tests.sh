#!/bin/bash

echo "🧪 Ejecutando todas las pruebas del proyecto..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar resultados
show_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2 - EXITOSO${NC}"
    else
        echo -e "${RED}❌ $2 - ERROR${NC}"
        exit 1
    fi
}

echo ""
echo "📋 BACKEND - Laravel 12"
cd backend

echo "🔍 Code Style (Laravel Pint)..."
composer lint
show_result $? "Laravel Pint"

echo "🔬 Análisis Estático (PHPStan)..."
composer analyse
show_result $? "PHPStan"

echo "🧪 Tests Unitarios (PHPUnit)..."
composer test
show_result $? "PHPUnit"

cd ..

echo ""
echo "📋 FRONTEND - React + TypeScript"
cd frontend

echo "🔍 Code Style (ESLint)..."
npm run lint
show_result $? "ESLint"

echo "🧪 Tests Unitarios (Jest)..."
npm run test:ci
show_result $? "Jest"

cd ..

echo ""
echo -e "${GREEN}🎉 ¡TODAS LAS PRUEBAS EXITOSAS!${NC}"
echo ""
echo "📊 Reportes de cobertura:"
echo "   • Backend: ./backend/coverage/index.html"
echo "   • Frontend: ./frontend/coverage/lcov-report/index.html"
echo ""