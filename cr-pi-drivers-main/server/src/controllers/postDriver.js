const axios = require("axios"); //axios se utiliza para realizar solicitudes HTTP
const { Driver, Team } = require("../db");


const postDriver = async(req, res) => { //  Esta función maneja una solicitud para crear un nuevo conductor.
    try { //Se inicia un bloque try para manejar posibles errores que puedan ocurrir dentro del código.
        const { name, surname, description, image, nationality, dob, team } = req.body; // Se obtienen los datos necesarios para crear un nuevo conductor desde el cuerpo de la solicitud.
        if( !name || !surname || !description || !image || !nationality|| !dob || !team || !team.length) {
          console.log(req.body);
            return res.status(200).json({status:"faltan datos"}) //Se verifica que todos los datos obligatorios estén presentes. Si falta alguno, se devuelve una respuesta indicando que faltan datos.
        }
        console.log(team);
        let comprobarDriver = await Driver.count({where: {name:`${name} ${surname}`, nationality:nationality, dob: dob}}) //Se utiliza Driver.count para contar cuántos conductores ya existen en la base de datos con el mismo nombre, nacionalidad y fecha de nacimiento.
        console.log("esto",comprobarDriver);
        
        console.log();
        if(comprobarDriver> 0) { //Si ya existe un conductor con los mismos datos, se devuelve una respuesta indicando que el usuario ya está repetido.
          return res.status(200).json({status:  "usuario_repetido"})
        } 


        //Si el conductor no existe, se crea un nuevo conductor en la base de datos con los datos proporcionados. Luego, se asocian los equipos proporcionados al nuevo conductor.
          let driver = await Driver.create({name:`${name} ${surname}`, description, image, nationality, dob})
          team.map( async(e) => {
            foundTeam = await Team.findAll({where: {name:e}})
            await driver.addTeam(foundTeam)
          })
          return res.status(200).json({...driver.dataValues, team: team}) //Se devuelve una respuesta con estado 200 (éxito) y la información del conductor recién creado, incluyendo los equipos asociados.
    } catch (error) { //Si ocurre algún error durante el proceso, se captura en el bloque catch y se devuelve una respuesta con estado 500 (error interno del servidor) junto con el mensaje de error.
      console.log(error);
      return  res.status(500).json(error.message)
    }
   
  };
  
  module.exports = {
  
    postDriver,
  
  };