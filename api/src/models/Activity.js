const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
       // (Entre 1 y 5)
       type: DataTypes.INTEGER,
       validate:{
           min: 1,
           max: 5,
       },
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    season: {
      type: DataTypes.ENUM("Verano"," Otoño", "Invierno", "Primavera"),
      allowNull: false,
    },
  });
};