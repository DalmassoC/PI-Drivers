function parseTeams(string)  {
    let array = string.split(","); // La cadena de texto se divide en un array utilizando la función split con la coma como separador. Esto significa que si la cadena original contiene comas, se dividirá en elementos separados en el array.
  
    if (array.length) { //Se verifica si el array resultante tiene algún elemento
      let nuevoArray = array.map((e) => e.trim()); //Se utiliza la función map para aplicar la función trim a cada elemento del array. La función trim elimina los espacios en blanco al principio y al final de una cadena.
  
      return nuevoArray; //La función devuelve el nuevo array resultante después de haber eliminado los espacios en blanco alrededor de cada elemento.
    } else return []; //Si la cadena original estaba vacía, la función devuelve un array vacío.
  };
  
  module.exports = {parseTeams}