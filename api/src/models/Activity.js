const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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
      allowNull: false,
    },
    duration: {
        type: DataTypes.FLOAT,
      allowNull: false,
    },
    season: {
        type: DataTypes.ENUM("verano"," otoño", "invierno", "primavera"),
      allowNull: false,//()
    },
  });
};