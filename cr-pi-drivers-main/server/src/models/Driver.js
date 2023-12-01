const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
    sequelize.define(
       "Driver", 
       {

    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4

    },
    name: {
        type: DataTypes.STRING,
        llowNull: false

    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
                
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
                
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
                
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
                
    }
  }, { timestamps: false }
  );
};