'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Funcionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imgFunc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cep: {
        allowNull: true,
        type: Sequelize.STRING
      },
      rua: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Funcionarios');
  }
};