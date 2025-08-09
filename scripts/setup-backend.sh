#!/bin/bash

echo "🚀 Setting up Laravel backend..."

cd backend

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Environment file created"
fi

# Install dependencies
composer install

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed --class=LocationSeeder

# Clear and cache configurations
php artisan config:cache
php artisan route:cache

echo "✅ Backend setup completed!"
echo "📝 Don't forget to update your API_KEY in .env file"
echo "🔧 Run 'php artisan serve' to start the development server"