const { Sequelize } = require('sequelize');
const {initialClientModel}=require('../models/Client')
const {initialCommandeModel}=require('../models/Commande')
const {initialProduitModel}=require('../models/Produit')
const {initialLigneCommandeModel}=require('../models/LigneCommande')
const database = process.env.DATABASE;
const username = process.env.USERNAME_APP;
const password = process.env.PASSWORD;
const dialect = process.env.DIALECT;
const port = process.env.PORTDATABASE;
const host = process.env.HOST;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect,
    define: {
        timestamps: true
    }
})
const Client=initialClientModel(sequelize)
const Commande=initialCommandeModel(sequelize)
const Produit=initialProduitModel(sequelize)
const LigneCommande=initialLigneCommandeModel(sequelize)
module.exports = { sequelize ,LigneCommande, Produit, Client,Commande};
