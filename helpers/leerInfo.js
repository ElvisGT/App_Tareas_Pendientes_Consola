const fs = require("fs");
const archivo = './data/database.json';

const leerInfo = () => {

  if(!fs.existsSync(archivo)){
    return null;
  }

  const info = fs.readFileSync(archivo,{encoding:"utf-8"});
  const data = JSON.parse(info);

  return data;
}


module.exports = {leerInfo};