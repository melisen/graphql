const logger = require("../logger/winston-logger");
const { findUser} = require("./usuarios")
const config = require("../configuration/config")
const PERSISTENCIA = config.PERSISTENCIA;
const DAOFactoryProductos = require("../models/DAOs/productos/DAOfactory-productos")
const DAOproductos = new DAOFactoryProductos(PERSISTENCIA)



const getAllProducts = async()=>{
  try{
    const todos = await DAOproductos.getAll()
    return todos
  } 
  catch(err){
    logger.log("error", "error getAllProducts")
  }    
}

const filterByCategory = async (category)=>{
  try{           
      if(category=="todos"){
        const productos = await DAOproductos.getAll();
        const todosProd = productos.map( (item) => (
          {
            id: item.id,
            title:item.title,
            price:item.price,
            thumbnail:item.thumbnail,
            category:item.category
          }
        ))
        return todosProd
      } else{
        const productos = await DAOproductos.listCategory(category);
        const todosProd = productos.map( (item) => (
          {
            id: item.id,
            title:item.title,
            price:item.price,
            thumbnail:item.thumbnail,
            category:item.category
          }
        ))
        return todosProd            
      }
    }
    catch(err){
      logger.log("error", "/api/productos/:category -  GET  - error al mostrar catálogo por categoría")
    }
}

const getProduct = async (id)=>{
    const producto = await DAOproductos.findById(id);
    const prod = {
    title: producto.title,
    thumbnail: producto.thumbnail,
    price: producto.price,
    id: id,
    category:producto.category
    }
    return prod
}

const saveNewProd = async(objProd)=>{
  const saveInDB = await DAOproductos.saveNew(objProd)
  return saveInDB
}

const findProductAndUpdate = async (idprod, newTitle, newPrice, newThumbnail, newCategory)=>{
  const modifProd = await DAOproductos.findProdUpdate(idprod, newTitle, newPrice, newThumbnail, newCategory)
  return modifProd
}

const deleteProdFromDB = async (idprod)=>{
  const productoEliminado = await DAOproductos.deleteById(idprod)
  return productoEliminado
}

module.exports = {
    getAllProducts,
    filterByCategory,
    getProduct,
    saveNewProd,
    findProductAndUpdate,
    deleteProdFromDB    
}
