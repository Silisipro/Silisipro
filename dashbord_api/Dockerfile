# Étape 1: Utiliser l'image PHP avec PHP-FPM pour Laravel
FROM php:8.2-fpm

# Étape 2: Définir le répertoire de travail
WORKDIR /var/www

# Étape 3: Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    mariadb-client

# Étape 4: Installer les extensions PHP requises par Laravel
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Étape 5: Installer Composer (gestionnaire de dépendances PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Étape 6: Copier les fichiers de l'application Laravel dans le conteneur
COPY . .

# Étape 7: Installer les dépendances Composer de Laravel
RUN composer install --prefer-dist --no-dev --optimize-autoloader

# Étape 8: Donner les permissions nécessaires à Laravel
RUN chown -R www-data:www-data /var/www

# Étape 9: Exposer le port utilisé par PHP-FPM
EXPOSE 9000

# Étape 10: Lancer PHP-FPM pour servir Laravel
CMD ["php-fpm"]
