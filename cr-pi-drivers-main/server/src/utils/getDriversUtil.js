const { default: axios } = require("axios");
const { parseTeams } = require("./parseTeams");
const { Driver, Team } = require("../db");


async function getAllDrivers(){

    let drivers = []; // el array vacio se utiliza para almacenar la información de los conductores
    const { data } = await axios.get("http://localhost:5000/drivers"); // Se utiliza Axios para realizar una solicitud GET a la URL y se extrae la propiedad data de la respuesta. La información obtenida se utilizará para construir objetos de conductor.

    for (let i = 0; i < data.length; i++) { //Se utiliza un bucle for para iterar sobre los datos obtenidos de la API y se construye un objeto de conductor para cada elemento.
      const driver = {
        id: data[i].id,
        name: `${data[i].name.forename} ${data[i].name.surname}`,
        image: data[i].image,
        dob: data[i].dob,
        nationality: data[i].nationality,
        teams: data[i].teams ? parseTeams(data[i].teams) : [],
        description: data[i].description,
      };

      if (!driver.image.url.length) { //Aquí se realizan algunas manipulaciones en los datos del conductor y se manejan las imágenes faltantes asignando una URL y una fuente por defecto si no hay una imagen disponible.
        driver.image.url =
          "https://cdn-images.motor.es/image/m/694w.webp/fotos-noticias/2020/03/que-coche-es-rayo-mcqueen-202066150-1585635516_1.jpg";
        driver.image.imageby = "By Cars cambiadoo";
      }
      drivers.push(driver);
    }
    const driverDataBase = await Driver.findAll({ // Se utiliza Sequelize (un ORM para Node.js) para realizar una consulta a la base de datos local. Luego, se procesan los resultados para obtener un formato específico y se devuelve un array de objetos de conductor.
      include: { model: Team}
    }).then((drivers) => {
      // Procesa los resultados para obtener un array de nombres
      return drivers.map((driver) => {
        const teamNames = driver.Teams.map((team) => team.name);
        return {
          id:driver.id,
          name:driver.name,
          description:driver.description,
          image:driver.image,
          nationality: driver.nationality,
          dob: driver.dob,
          teams: teamNames, // Aquí está el array de nombres de los equipos
        }
      })
    })

    return [...drivers, ...driverDataBase] //La función devuelve una matriz que combina los objetos de conductor obtenidos de la API y los de la base de datos.
} 

module.exports = getAllDrivers