'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Calls.init({
    equipamento: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    funcId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Calls',
  });
  return Calls;
};