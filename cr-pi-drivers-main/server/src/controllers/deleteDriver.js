const axios = require("axios");
const { Driver } = require("../db");
const getAllDrivers = require("../utils/getDriversUtil");


const deleteDriver = async(req, res) => { // Esta función maneja una solicitud para eliminar un conductor.
    
    const { idDriver } = req.params //Se obtiene el parámetro idDriver de los parámetros de la ruta (de la URL).
    const data = await Driver.findOne({where: {id:idDriver}}) //Se utiliza Driver.findOne para buscar la información del conductor que se va a eliminar antes de llevar a cabo la eliminación. Esto permite devolver esa información en la respuesta después de la eliminación.
    console.log(idDriver);
    try { //Se inicia un bloque try para manejar posibles errores que puedan ocurrir dentro del código.
     Driver.destroy({ //Se utiliza Driver.destroy para eliminar el conductor de la base de datos, utilizando el ID proporcionado en los parámetros de la ruta.
        where:{id: idDriver}
      })

      return res.status(200).json(data) //Se devuelve una respuesta con estado 200 (éxito) y la información del conductor que ha sido eliminado.
    } catch (error) { // Si ocurre algún error durante el proceso, se captura en el bloque catch y se devuelve una respuesta con estado 400 (solicitud incorrecta) junto con el mensaje de error.
        return res.status(400).send(error.message)
    }
    
}

module.exports = { //deleteDriver se exporta para que pueda ser utilizada en otros archivos
    deleteDriver,
  };