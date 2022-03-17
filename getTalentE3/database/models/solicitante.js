"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class solicitante extends Model {
    static associate(models) {
      solicitante.belongsTo(models.usuario, { as: "usuario", foreignKey: "id" });
      solicitante.belongsTo(models.direccion, { as: "direccion", foreignKey: "id" });
    }
  }
  solicitante.init(
    {
      nombre: DataTypes.STRING,
      ap_paterno: DataTypes.STRING,
      ap_materno: DataTypes.STRING,
      sexo: DataTypes.ENUM(['Femenino', 'Masculino','Prefiero No Decirlo']),
      fechaNacimiento: DataTypes.DATE,
      estadoCivil:DataTypes.STRING,
      edad:DataTypes.INTEGER,
      video:DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      id_usuario:DataTypes.INTEGER,
      id_direccion:DataTypes.INTEGER,

    },
    {
      sequelize,
      modelName: "solicitante",
      tableName: "solicitante"
    }
  );
  return solicitante;
};