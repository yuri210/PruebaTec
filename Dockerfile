FROM php:8.3-fpm-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite \
    sqlite-dev \
    nodejs \
    npm

# Instalar extensiones PHP
RUN docker-php-ext-install pdo pdo_sqlite gd xml

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos de composer
COPY composer*.json ./

# Instalar dependencias
RUN composer install --no-scripts --no-autoloader

# Copiar código de la aplicación
COPY . .

# Generar autoloader
RUN composer dump-autoload --optimize

# Crear directorio de base de datos
RUN mkdir -p database && touch database/database.sqlite

# Establecer permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod 664 /var/www/html/database/database.sqlite

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000