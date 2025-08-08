# Prueba Técnica Full Stack - Laravel 12 + React

Sistema de gestión de ubicaciones con API REST.

## Requisitos

- PHP 8.4+
- Node.js 18+
- Docker (opcional)

## Configuración

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Con Docker
```bash
docker-compose up -d
```

## API

Base URL: `http://localhost:8000/api/v1`

Header requerido: `X-API-Key: tu-api-key`

### Endpoints

- `GET /locations` - Lista paginada con filtros (name, code)
- `POST /locations` - Crear ubicación

## Tests

```bash
# Backend
cd backend && composer test

# Frontend  
cd frontend && npm test
```

## Configuración API Key

Backend `.env`:
```
API_KEY=mi-clave-secreta
```

Frontend `.env`:
```
VITE_API_KEY=mi-clave-secreta
VITE_API_BASE_URL=http://localhost:8000
```