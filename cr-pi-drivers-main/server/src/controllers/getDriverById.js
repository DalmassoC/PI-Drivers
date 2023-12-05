const axios = require("axios");
const { Driver } = require("../db");
const getAllDrivers = require("../utils/getDriversUtil");

const getDriverById = async (req, res) => { //Esta función maneja una solicitud para obtener información sobre un conductor por su ID.
  
  const { idDriver } = req.params; //Se obtiene el parámetro idDriver de los parámetros de la ruta (normalmente de la URL).
  try { // manejador de posibles errores que puedan surgir
    const data = await getAllDrivers() //Se llama a la función getAllDrivers de forma asíncrona para obtener la información de todos los conductores.

    const findData = data.find((e) => { //Se utiliza la función find para buscar un conductor en el array de datos cuyo ID coincida con el ID proporcionado en la solicitud
      return e.id == idDriver;
    });
    if (findData) {
      return res.status(200).json(findData); //Si se encuentra un conductor con el ID proporcionado, se devuelve una respuesta con estado 200 (éxito) y la información del conductor en formato JSON.
    } else {
      return res //Si no se encuentra un conductor con el ID proporcionado, se devuelve una respuesta con estado 200 y un mensaje indicando que no se encontraron corredores con el ID especificado.
        .status(200)
        .send("No se encontraron corredores con el id indicado");
    }
} catch (error) { //Si ocurre algún error durante el proceso, se captura en el bloque catch y se envía una respuesta con estado 500 (error interno del servidor) junto con el mensaje de error.
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDriverById,
};