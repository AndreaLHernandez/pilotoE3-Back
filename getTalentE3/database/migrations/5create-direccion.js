"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("direccion", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pais: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      municipio: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        //allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        //allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("direccion");
  },
};
