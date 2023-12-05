const axios = require("axios"); // axios se utiliza para realizar solicitudes HTTP
const { Driver } = require("../db");
const getAllDrivers = require("../utils/getDriversUtil");

const getDriverByName = async (req, res) => { //Esta función maneja una solicitud para obtener información sobre conductores por nombre.
  let { name } = req.query;
  name = name.toLowerCase(); // Se obtiene el parámetro name de la consulta y se formatea para asegurarse de que la primera letra sea mayúscula y el resto en minúsculas.
  name = name[0].toUpperCase() + name.slice(1, name.length);
  try { //Se inicia un bloque try para manejar posibles errores que puedan ocurrir dentro del código.
    const data = await getAllDrivers() //Se llama a la función getAllDrivers de forma asíncrona para obtener la información de todos los conductores.

    // console.log(data);

    const filterData = data.filter((e) => { //Se utiliza la función filterData para obtener un array de conductores cuyo primer nombre coincida con el nombre proporcionado en la consulta. El nombre se obtiene dividiendo el nombre completo del conductor en un array y comparando el primer elemento.
      let arrayName = e.name.split(" ");

      return arrayName[0] === name;
    });

    if(!filterData.length) { //Si no se encuentra ningún conductor con el nombre proporcionado, se envía una respuesta indicando que no se encontraron conductores con ese nombre.
      console.log("aca");
      return res.status(200).send("No se encontraron drivers con ese nombre")
    }
    if (filterData.length > 16) { //Si hay más de 16 conductores con el nombre proporcionado, se devuelve solo los primeros 15 conductores.
      let firstDrivers = filterData.slice(0, 15);
      return res.status(200).json(firstDrivers);
    } else { // En otros casos, se devuelve el array completo de conductores encontrados.
      return res.status(200).json(filterData);
    }
 
  } catch (error) { //Si ocurre algún error durante el proceso, se captura en el bloque catch y se envía una respuesta con estado 500 (error interno del servidor) junto con el mensaje de error.
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDriverByName,
};