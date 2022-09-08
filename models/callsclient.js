'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CallsClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CallsClient.init({
    equipamento: DataTypes.STRING,
    description: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    funcId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CallsClient',
  });
  return CallsClient;
};