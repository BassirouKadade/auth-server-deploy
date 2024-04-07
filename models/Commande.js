const { Model, DataTypes } = require('sequelize');

function initialCommandeModel(sequelize) {
  class Commande extends Model {}
  
  Commande.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients", // Le nom de la table référencée
        key: "id" // La clé primaire de la table référencée
      },
      onDelete:"CASCADE"
    }
  }, {
    sequelize, // Passer l'instance de Sequelize
    modelName: 'Commande', // Nom du modèle
    tableName: 'commandes', // Nom de la table dans la base de données
  });

  return Commande;
}

module.exports={initialCommandeModel}
