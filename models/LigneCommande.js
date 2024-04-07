const {Model,DataTypes}=require('sequelize')
function initialLigneCommandeModel(sequelize) {
  class LigneCommande extends Model {}
  
  LigneCommande.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_Commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "commandes",
        key: "id"
      },
      onDelete: 'CASCADE'
    },
    ID_Produit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "produits",
        key: "id"
      },
      onDelete: 'CASCADE'
    },
    Quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'LigneCommande',
    tableName: 'LigneCommandes',
  });

  return LigneCommande;
}

module.exports = {initialLigneCommandeModel };