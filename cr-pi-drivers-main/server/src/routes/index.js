const { Router } = require("express");
const { getTeams } = require("../controllers/getTeams");
const  {getDrivers}  = require("../controllers/getDrivers");
const {getDriverById} = require("../controllers/getDriverById"); 
const { getDriverByName } = require("../controllers/getDriverByName");
const { postDriver } = require("../controllers/postDriver");
const { deleteDriver } = require("../controllers/deleteDriver"); //Se importan los módulos necesarios de Express (Router) y los controladores que manejan las lógicas específicas de cada endpoint.
const router = Router(); //Se crea un objeto de router usando el método Router proporcionado por Express.

router.get("/drivers", getDrivers) //Define una ruta de tipo GET ("/drivers") que invocará la función getDrivers del controlador cuando se realice una solicitud a esa ruta.

router.get("/drivers/name/", getDriverByName)

router.get("/drivers/:idDriver", getDriverById) // El :idDriver indica un parámetro de ruta, que puede ser accedido desde req.params.idDriver en el controlador.

router.post("/drivers", postDriver)

router.delete("/drivers/:idDriver", deleteDriver)

router.get("/teams", getTeams)

module.exports = router; //Exporta el objeto de router para que pueda ser utilizado en otros archivos, generalmente en el archivo principal de la aplicación donde se configura y se inicia el servidor.

