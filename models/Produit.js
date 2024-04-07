const { Model, DataTypes } = require('sequelize');

function initialProduitModel(sequelize) {
  class Produit extends Model {}
  
  Produit.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prix: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // L'image peut être facultative
    }
  }, {
    sequelize,
    modelName: 'Produit',
    tableName: 'produits',
  });

  return Produit;
}

module.exports = { initialProduitModel };
