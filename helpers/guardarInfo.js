const fs = require("fs");

const guardarInfo = ( data ) => {
  const parsedInfo = JSON.stringify(data);

  fs.writeFile('./data/database.json',parsedInfo,(err) => {
    if(err) throw 'Error al escribir en la base de datos';

  })
}



module.exports = {guardarInfo}