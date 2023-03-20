const logger = require("../../../logger/winston-logger");
const {MongoUsuarios, Usuarios} = require("./MongoDAOusuarios");



class DAOFactoryUsuarios{
    constructor(PERSISTENCIA){
      if (DAOFactoryUsuarios._instance) {
        logger.log("error", "Singleton classes can't be instantiated more than once.")
        throw new Error("Singleton classes can't be instantiated more than once.")
      }
      DAOFactoryUsuarios._instance = this;

      this.PERSISTENCIA = PERSISTENCIA    
      switch (this.PERSISTENCIA) {
        case "MONGO":
          return new MongoUsuarios(Usuarios);
        default:
          return new MongoUsuarios(Usuarios);
      }
    }
  }

module.exports = DAOFactoryUsuarios