const logger = require("../../../logger/winston-logger");
const {MongoDAOcarrito, CarritoModel} = require("./MongoDAOcarrito")
const MemoryDAOcarrito = require("./MemoryDAOcarrito")
const FileDAOcarrito = require("./FileDAOcarrito")


class DAOFactoryCarrito{
    constructor(PERSISTENCIA){
      if (DAOFactoryCarrito._instance) {
        logger.log("error", "Singleton classes can't be instantiated more than once.")
        throw new Error("Singleton classes can't be instantiated more than once.")
      }
      DAOFactoryCarrito._instance = this;

      this.PERSISTENCIA = PERSISTENCIA
      switch (this.PERSISTENCIA) {
        case "MEM":
          return new MemoryDAOcarrito();
        case "FILE":
          return new FileDAOcarrito("./models/DAOs/carrito/carrito.json");
        case "MONGO":
          return new MongoDAOcarrito(CarritoModel);
        default:
          return new MongoDAOcarrito(CarritoModel);
      }
    }
  }
 
  module.exports = DAOFactoryCarrito;