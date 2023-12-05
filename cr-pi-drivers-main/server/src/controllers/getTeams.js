const axios = require("axios");
const { Team } = require("../db");
const { parseTeams } = require("../utils/parseTeams");

const getTeams = async (req, res) => { //Esta función maneja una solicitud para obtener información sobre equipos.
  try { //Se inicia un bloque try para manejar posibles errores que puedan ocurrir dentro del código.
    const { data } = await axios.get("http://localhost:5000/drivers"); // Se utiliza Axios para realizar una solicitud GET a la URL, y se extrae la propiedad data de la respuesta. Estos datos contienen información sobre conductores, especialmente los equipos a los que pertenecen.
    const array = [];
    for (let i = 0; i < data.length; i++) { //Se utiliza un bucle for para iterar sobre los datos obtenidos de la API y procesar la información sobre equipos.
      if (data[i].teams) {
        let t = parseTeams(data[i].teams); //Si un conductor tiene información sobre equipos (data[i].teams), se utiliza la función parseTeams para obtener un array de nombres de equipos.
        for (let j = 0; j < t.length; j++) { 
          await Team.findOrCreate({ where: { name: t[j] } }); //Se utiliza el método findOrCreate proporcionado por Sequelize para buscar un equipo en la base de datos por su nombre y, si no se encuentra, crearlo.

          if (!array.includes(t[j])) {
            array.push(t[j]); //Se verifica si el nombre del equipo ya está en el array array. Si no está presente, se agrega al array. Esto se hace para evitar duplicados en la lista final de nombres de equipos.
          }
        }
      }
    }

    return res.status(200).json(array); //Finalmente, se envía una respuesta con estado 200 (éxito) y el array que contiene los nombres únicos de los equipos.
  } catch (error) {
    return res.status(500).send(error.message); //Si ocurre algún error durante el proceso, se captura en el bloque catch y se envía una respuesta con estado 500 (error interno del servidor) junto con el mensaje de error.
  }
};

module.exports = {
  getTeams,
};