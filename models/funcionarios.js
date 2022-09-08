'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Funcionarios.init({
    id:DataTypes.INTERGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    imgFunc: DataTypes.STRING,
    cep: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    bairro: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Funcionarios',
  });
  return Funcionarios;
};