const logger = require("../../../logger/winston-logger");
const {MongoDAOproductos, ProdModel} = require("./MongoDAOproductos")
const MemoryDAOproductos = require("./MemoryDAOproductos")
const FileDAOproductos = require("./FileDAOproductos")



class DAOFactoryProductos{
    constructor(PERSISTENCIA){
      if (DAOFactoryProductos._instance) {
        logger.log("error", "Singleton classes can't be instantiated more than once.")
        throw new Error("Singleton classes can't be instantiated more than once.")
      }
      DAOFactoryProductos._instance = this;
    
      this.PERSISTENCIA = PERSISTENCIA
      switch (this.PERSISTENCIA) {
        case "MEM":
          return new MemoryDAOproductos();
        case "FILE":
          return new FileDAOproductos("./models/DAOs/productos/productos.json");
        case "MONGO":
          return new MongoDAOproductos(ProdModel);
        default:
          return new MongoDAOproductos(ProdModel);
      }

    }
  }
 
  module.exports = DAOFactoryProductos