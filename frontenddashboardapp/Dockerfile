# Étape 1: Utiliser l'image officielle de Node.js
FROM node:16 AS build-stage

# Étape 2: Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3: Copier les fichiers de configuration pour installer les dépendances
COPY package*.json ./

# Étape 4: Installer les dépendances Node.js
RUN npm install

# Étape 5: Copier le reste des fichiers de l'application React
COPY . .

# Étape 6: Construire l'application React pour la production
RUN npm run build

# Étape 7: Exposer le port utilisé par le serveur
EXPOSE 3000

# Étape 8: Lancer le serveur pour servir l'application React
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
