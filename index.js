require('dotenv').config();
const express = require('express');
const { sequelize } = require('./config/sequelize');
const router = require('./routes/route');
const cors = require('cors');
const path = require('path');
const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': '####yourclientid######',
  'client_secret': '####yourclientsecret#####'
});
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Utilisation de CORS pour permettre les requêtes provenant de http://localhost:3000
app.use(cors({
  origin: process.env.FRONT_URL
}));

// Utilisation de bodyParser pour analyser les corps de requête JSON et URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/uploads',express.static('./uploads'))
app.use(express.static(path.join(__dirname, 'uploads'))); // Utilisé pour servir des fichiers statiques, tels que des images, HTML, CSS, etc.
// Utilisation des routes définies dans le fichier route.js
app.use('/', router);

// Connexion à la base de données et synchronisation avec sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
    await sequelize.sync({force:false}); // Supprimer { force: true } si vous ne voulez pas forcer la synchronisation
    console.log('Synchronisation effectuée..');
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  }
})();

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur est prêt à écouter les requêtes sur le port ${PORT}`);
})
