const logger = require("../../../logger/winston-logger")
const mongoose = require("mongoose");

mongoose.set('strictQuery', false)

const ProductoSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 10000 },
  category:{ type: String, required: true, max: 100 }
});

const ProdModel = mongoose.model("productos", ProductoSchema);


class MongoDAOproductos{  
  constructor(modeloProd){
    this.modeloProd = modeloProd;
  }

async getAll(){
  const productos = await  this.modeloProd.find({});
  const todosProd = productos.map( (item) => (
      {
        _id: item._id,
        title:item.title,
        price:item.price,
        thumbnail:item.thumbnail,
        category:item.category
      }
    ))
  return todosProd
}

async listCategory(categorySelect){
  const categoryProductos = await  this.modeloProd.find({category: categorySelect}).exec()
  return categoryProductos
}

async findById(id){
  const prod =  this.modeloProd.findOne({_id:id})
  return prod
}
async saveNew(objProd){
  const nuevoProd = new this.modeloProd({
    title: objProd.title,
    price: objProd.price,
    thumbnail: objProd.thumbnail,
    category:objProd.category
  });
    const prodGuardado = await nuevoProd.save()
    logger.log("info", "nuevo producto guardado")
    return nuevoProd
    
}

async findProdUpdate(idprod, newTitle, newPrice, newThumbnail, newCategory){
  const modificarProdDB =  this.modeloProd.findOneAndUpdate(
    {_id: idprod},
    {
      title: newTitle,
      price: newPrice,
      thumbnail:newThumbnail,
      category: newCategory
    })
    return modificarProdDB
  
}

async deleteById(idprod){
  const delProd = await  this.modeloProd.deleteOne({_id: idprod})
  const respuesta = `producto eliminado ${idprod}`
  return respuesta
}
}


module.exports = {MongoDAOproductos, ProdModel}