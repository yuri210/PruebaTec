#!/bin/bash

echo "🐳 Setting up Docker environment..."

# Create necessary directories
mkdir -p backend/storage/logs
mkdir -p backend/database

# Set permissions for Laravel
sudo chown -R $USER:$USER backend/storage
sudo chown -R $USER:$USER backend/bootstrap/cache
chmod -R 775 backend/storage
chmod -R 775 backend/bootstrap/cache

# Build and start containers
docker-compose up --build -d

echo "⏳ Waiting for containers to be ready..."
sleep 10

# Setup Laravel inside container
docker-compose exec backend bash -c "
    composer install
    cp .env.example .env
    php artisan key:generate
    touch database/database.sqlite
    php artisan migrate
    php artisan db:seed --class=LocationSeeder
    php artisan config:cache
    php artisan route:cache
"

echo "✅ Docker setup completed!"
echo "🌐 Backend: http://localhost:8000"
echo "🌐 Frontend: http://localhost:3000"
echo "📝 Update API_KEY in backend/.env and frontend/.env files"