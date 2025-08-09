# 🏢 PruebaTec - Sistema de Gestión de Ubicaciones

**Prueba técnica Full Stack 2025** con **Laravel 12 + React + TypeScript + Docker + CI/CD**

🔗 **Repositorio:** https://github.com/yuri210/PruebaTec.git

---

## 🚀 Instalación Rápida

### Con Docker (Recomendado)
```bash
# 1. Clonar repositorio
git clone https://github.com/yuri210/PruebaTec.git
cd PruebaTec

# 2. Levantar todo con Docker
docker-compose up --build -d

# 3. Configurar Laravel (solo primera vez)
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan migrate --seed

# 4. ¡Listo! Abrir en navegador:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api/v1/locations
```

### Sin Docker
```bash
# Backend
cd backend
composer install && cp .env.example .env
php artisan key:generate && touch database/database.sqlite
php artisan migrate --seed && php artisan serve

# Frontend (nueva terminal)
cd frontend
npm install && cp .env.example .env && npm run dev
```

---

## 🔑 Credenciales

- **API Key:** `esto-es-pruebas-yuri`
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/v1/locations

---

## 🧪 Probar la API

```bash
curl -H "X-API-Key: esto-es-pruebas-yuri" \
     http://localhost:8000/api/v1/locations
```

**Respuesta esperada:**
```json
{
  "data": [
    {
      "id": 1,
      "code": "NYC001",
      "name": "New York Office 2025",
      "image": "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg"
    }
  ]
}
```

---

## 🛠️ Tecnologías

### Backend
- **Laravel 12** - Framework PHP moderno
- **SQLite** - Base de datos ligera
- **PHPUnit** - Tests unitarios (≥80% cobertura)
- **Laravel Pint** - Code style automático
- **PHPStan** - Análisis estático

### Frontend
- **React 18** - Biblioteca UI moderna
- **TypeScript** - Tipado estático
- **Material UI** - Componentes profesionales
- **Vite** - Build tool rápido
- **Zod** - Validación de esquemas
- **Jest** - Tests unitarios (≥80% cobertura)

### DevOps
- **Docker** - Containerización
- **GitHub Actions** - CI/CD automático
- **Conventional Commits** - Estándar de commits
- **Semantic Versioning** - Versionado automático

---

## 📋 Funcionalidades

### ✅ Implementadas
- **CRUD completo** de ubicaciones
- **Filtros avanzados** por nombre y código
- **Paginación** automática
- **Validaciones** con Zod y Form Requests
- **API Key authentication**
- **Rate limiting** (60 req/min)
- **Tests unitarios** con ≥80% cobertura
- **Pipeline CI/CD** automático
- **Docker** configuración completa
- **Responsive design** con Material UI

### 🔄 Pipeline CI/CD Automático
- **Linting:** `composer lint` + `npm run lint`
- **Tests:** `composer test` + `npm test`
- **Build:** Docker automático
- **Deploy:** Preparado para producción

---

## 🧪 Comandos de Pruebas

```bash
# Backend - Laravel
cd backend
composer install           # Instalar dependencias
composer lint             # Laravel Pint (code style)
composer analyse          # PHPStan (análisis estático)
composer test             # PHPUnit con cobertura ≥80%

# Frontend - React + TypeScript
cd frontend
npm install               # Instalar dependencias
npm run lint             # ESLint (code style)
npm test                 # Jest interactivo
npm run test:ci          # Jest con cobertura ≥80%

# Script completo (ejecuta todo)
./scripts/run-tests.sh
```

---

## 📝 Git Workflow Simple

```bash
# Workflow simple con master
git checkout master
git add .
git commit -m "descripción del cambio"
git push origin master
```

---

## 📁 Estructura del Proyecto

```
PruebaTec/
├── backend/                 # Laravel 12 API
│   ├── app/Http/Controllers/Api/V1/
│   ├── app/Models/
│   ├── app/Services/
│   ├── database/migrations/
│   ├── tests/Unit/
│   └── tests/Feature/
├── frontend/                # React + TypeScript
│   ├── src/components/
│   ├── src/services/
│   ├── src/types/
│   └── src/tests/
├── .github/workflows/       # CI/CD Pipeline
├── scripts/                 # Scripts de utilidad
├── docs/                    # Documentación
└── docker-compose.yml       # Docker setup
```

---

## 🐛 Solución de Problemas

### Puerto ocupado
```bash
# Cambiar puertos en docker-compose.yml
# Backend: "8001:8000"
# Frontend: "3001:3000"
```

### Permisos (Mac/Linux)
```bash
chmod -R 775 backend/storage
```

### API Key inválida
- Verificar `.env` backend: `API_KEY=esto-es-pruebas-yuri`
- Verificar `.env` frontend: `VITE_API_KEY=esto-es-pruebas-yuri`

### Base de datos corrupta
```bash
cd backend && php artisan migrate:fresh --seed
```

---

## 📊 Métricas de Calidad

- ✅ **Cobertura de tests:** ≥80% (backend y frontend)
- ✅ **Code style:** Laravel Pint + ESLint
- ✅ **Análisis estático:** PHPStan nivel 5
- ✅ **Validaciones:** Zod + Form Requests
- ✅ **Seguridad:** API Key + Rate limiting
- ✅ **Performance:** Paginación + Filtros optimizados

---

## 🚀 Comandos Útiles

```bash
# Desarrollo diario
docker-compose up -d              # Iniciar servicios
docker-compose logs -f            # Ver logs
docker-compose down               # Parar servicios

# Sin Docker
cd backend && php artisan serve   # Backend
cd frontend && npm run dev        # Frontend

# Tests y calidad
./scripts/run-tests.sh           # Suite completa
composer lint && npm run lint    # Solo linting
```

---

## 📞 Información del Desarrollador

- **Repositorio:** https://github.com/yuri210/PruebaTec.git
- **Rama principal:** `master`
- **Versión:** 1.0.0
- **Licencia:** MIT

