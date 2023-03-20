const dotenv = require('dotenv');
if (process.env.MODE != 'production'){
  dotenv.config()
}

const MODE = process.env.MODE;
const DATABASEURL = process.env.DATABASEURL;
const PORT = process.env.PORT;
let HOST = '0.0.0.0';
let PERSISTENCIA = process.argv[2];  //"MEM" //"FILE" //"MONGO"
PERSISTENCIAUSUARIOS = "MONGO"

module.exports = {
    DATABASEURL, PORT, HOST, PERSISTENCIA, PERSISTENCIAUSUARIOS
}