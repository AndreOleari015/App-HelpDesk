'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    cnpj: DataTypes.STRING,
    senha: DataTypes.STRING,
    imgUser: DataTypes.STRING,
    cep: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    bairro: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};