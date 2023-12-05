const axios = require("axios");
const { Driver, Team } = require("../db");
const { parseTeams } = require("../utils/parseTeams.js");
const getAllDrivers = require("../utils/getDriversUtil");

const getDrivers = async (req, res) => { //  Esta función maneja una solicitud para obtener información sobre los conductores.
  try { // Se inicia un bloque try para manejar posibles errores que puedan ocurrir dentro del código. 
 
    const data = await getAllDrivers() // Se llama a la función getAllDrivers de forma asíncrona para obtener la información de los conductores desde fuentes externas y locales (desde utils)
    // console.log(JSON.stringify(driverDataBase));

    return res.status(200).json(data); //Si la obtención de datos es exitosa, se envía una respuesta con estado 200 (éxito) y se devuelve la información de los conductores en formato JSON.
  } catch (error) {
    return res.status(500).send(error.message); //Si ocurre algún error durante la obtención de datos, se captura en el bloque catch y se envía una respuesta con estado 500 (error interno del servidor) junto con el mensaje de error.
  }
};

//  'https://picsum.photos/700/400?random%27}; imagen ramdon

module.exports = { //La función getDrivers se exporta para que pueda ser utilizada en otros archivos. 
  getDrivers,
};
