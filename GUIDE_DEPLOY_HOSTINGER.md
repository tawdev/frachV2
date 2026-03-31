# 🚀 Guide de Déploiement Hostinger VPS

Ce projet a été optimisé pour un hébergement facile sur votre VPS Hostinger. Suivez ces étapes pour mettre votre application en ligne.

## 1. Préparation de l'environnement

Assurez-vous que **Node.js (v18+)** et **PM2** sont installés sur votre VPS.
```bash
# Installer PM2 globalement si ce n'est pas déjà fait
npm install -g pm2
```

## 2. Configuration des Variables d'Environnement

Créez les fichiers `.env` nécessaires :

### Backend (`backend/.env`)
```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/meubles_db"
PORT=3001
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL="http://VOTRE_IP_OU_DOMAINE:3001"
```

## 3. Installation et Build (Depuis la racine)

Utilisez le nouveau système de scripts à la racine du projet :

```bash
# 1. Installer toutes les dépendances
npm run install:all

# 2. Générer le client Prisma (Backend)
npm run prisma:generate

# 3. Builder les deux projets (NestJS + Next.js)
npm run build:all
```

## 4. Lancement avec PM2

Le projet inclut maintenant un fichier `ecosystem.config.js` pour gérer les deux processus simultanément.

```bash
# Lancer Backend et Frontend en même temps depuis la racine
pm2 start ecosystem.config.js

# Vérifier le statut
pm2 status

# Sauvegarder pour le redémarrage automatique du serveur
pm2 save
```

## 5. Pourquoi ces changements ?

- **Prisma simplifié** : Suppression des "driver adapters" qui causaient des erreurs 500.
- **Frontend Dynamique** : Les URLs hardcodées `localhost:3001` ont été remplacées par `process.env.NEXT_PUBLIC_API_URL`.
- **Gestionnaire racine** : Ajout d'un `package.json` et `ecosystem.config.js` à la racine pour simplifier la commande.
