const { Model, DataTypes } = require('sequelize');
function initialClientModel(sequelize) {
  class Client extends Model {}
  
  Client.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Assure que chaque email est unique
      allowNull: false,
      validate: {
        isEmail: true // Assure que la valeur est un email valide
      }
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
  });

  return Client;
}

module.exports = {  initialClientModel };
