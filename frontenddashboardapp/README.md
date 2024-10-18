# Projet d'Activation de Services Google et Externes

Ce projet est une application React qui permet d'activer divers services Google ainsi que d'autres services externes, tels que la météo, les taux de change, etc. L'application est également connectée à une API Laravel qui gère l'inscription des utilisateurs et l'activation des services.

## Services disponibles

Voici les services disponibles dans l'application :

- **Home** : Accueil du tableau de bord
- **Weather** : Service météo
- **Google Drive** : Intégration de Google Drive
- **Calendar** : Intégration du calendrier
- **Youtube** : Intégration de YouTube
- **Mail** : Service de messagerie
- **Favorite Team** : Gestion des équipes favorites
- **Exchange rate** : Taux de change
- **Astronomy** : Informations sur l'astronomie
- **Space** : Exploration spatiale
- **User Management** : Gestion des utilisateurs

## Commandes disponibles

Dans le répertoire du projet, vous pouvez exécuter les commandes suivantes :

### `npm start`

Lance l'application en mode développement.  
Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir dans votre navigateur.

### `npm run build`

Construit l'application pour la production dans le dossier `build`.  
Le projet est prêt à être déployé.

## API Backend

Le backend de ce projet est construit avec Laravel. L'API permet de gérer l'inscription des utilisateurs et l'activation des services. L'interaction entre le frontend (React) et le backend (Laravel) est entièrement gérée via des requêtes API.

## Dépendances principales

- **React** : Framework JavaScript pour la création d'UI.
- **Laravel** : Framework PHP pour la gestion du backend et de l'API.


## Installation

1. Clonez ce dépôt.
2. Allez dans dossier frontenddashboardapp 
3. Installez les dépendances avec `npm install`.
4. Lancez l'application en utilisant `npm start` 
5. Allez dans dossier dashbord_api
6. Installez les dépendances avec `composer install`.
7. Configurer le fichier d'environnement .env `cp .env.example .env`
8. Générer la clé d'application `php artisan key:generate` 
9. Configurer la base de données `php artisan migrate` 
10. Lancez aussi l'api avec `php artisan serve` 


## Activation de Google API
Pour permettre l'inscription via Google et activer les services Google (comme Google Drive), vous devez configurer votre projet sur la Google Developer Console.

Étapes pour configurer Google API :
1. Créer un projet sur la Google Developer Console.
2. Activer les APIs nécessaires (Google Drive, Calendar, etc.).
3. Configurer les informations d'authentification : Créez des identifiants OAuth 2.0 (ID client et secret) pour application.
4. Ajouter les URLs de redirection autorisées : Indiquez l'URL de l'application (http://localhost:3000 en développement).
5. Télécharger les fichiers de configuration (credentials.json ou autre) et les intégrer dans le projet pour gérer l'authentification avec goolgle


## Auteur
Sylvestre HONFO
