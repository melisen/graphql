const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

const ProductoAlCarrito = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true, max: 10000 },
  quantity: { type: Number, required: true }
});

const CarritoSchema = new mongoose.Schema({
    productos: [ProductoAlCarrito],
},
{ timestamps: true });

const CarritoModel = mongoose.model("carritos", CarritoSchema);


/*const childSchema = new Schema({ name: 'string' });
const parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments
  child: childSchema
});
*/

class MongoDAOcarrito{
  constructor(modelCarrito){
    this.modelCarrito = modelCarrito;
  }

async saveNew(){
  const nuevoCarrito = new this.modelCarrito({
    productos: []
  });
  const objCarrito = await nuevoCarrito.save()
  const id =  objCarrito._id
  return id
}

async getAll(){
  const todos = await this.modelCarrito.find({})
  return todos
}

async getProductList(id){
  const carrito = await this.modelCarrito.findOne({_id: id});
  if(carrito){
    const productos = carrito.productos;
    const productosMap = productos.map( (item) => (
      {
        _id: item._id,
        title:item.title,
        price:item.price,
        thumbnail:item.thumbnail,
        quantity:item.quantity,
      }
    ))
    return productosMap 
  }else{
    return false
  }
}

async findById(_id){
  const element = await this.modelCarrito.findOne({_id: _id});
return element
}

async AddProdToCart(objetoProd, id){
  const carritoActualizado = await this.modelCarrito.findOneAndUpdate(
    {_id: id},
    { $push: {productos: objetoProd}},
    { new: true}) 
    return carritoActualizado
}

async deleteById(id){
  let carritoEliminado = await this.modelCarrito.deleteOne({ _id: id })
}

async findProdInCart(idcarrito, idProd){
  const carrito = await this.modelCarrito.findOne({_id: idcarrito})
  const arrProductos = carrito.productos;   
  const estaProducto = arrProductos.find(element => element._id == idProd)
  return estaProducto
}

async addRepeatedProd(idProd, cantPrevia, cantSumar, idcarrito){
  const nuevaCant = cantPrevia + cantSumar;
  const carrito = await this.modelCarrito.findOne({_id: idcarrito})
  const arrProductos = carrito.productos;   
    arrProductos.find(element => element._id == idProd).quantity = nuevaCant
    const cantActualizada = await this.modelCarrito.findOneAndUpdate(
      {_id: idcarrito},
      { $set: {productos: arrProductos}},
      { new: true}) 
      //const importeTotal = arrProductos.reduce((acc, elemento) => acc + elemento.price*elemento.quantity, 0)
  
}

async deleteProd(id, idprod){
  const carrito = await this.modelCarrito.findOne({_id: id})
  const arrProductos = carrito.productos;
  try{
    const nuevoArr = arrProductos.filter(element => element._id != idprod)
    const carritoActualizado = await this.modelCarrito.findOneAndUpdate(
      {_id: id},
      { $set: {productos: nuevoArr}},
      { new: true}) 
  }        
    catch(err){
      logger.log("error", "no se pudo eliminar producto del carrito ")
    }
}
}

module.exports = {MongoDAOcarrito, CarritoModel}
