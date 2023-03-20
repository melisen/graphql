const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  edad: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  telefono: { type: String, required: true, max: 100 },
  avatar: { type: String, required: true, max: 10000 },
  carritoactual:{ type: String, required: true}
});
const Usuarios = mongoose.model("usuarios", UsuarioSchema);


class MongoUsuarios{
    constructor(modelo){
      this.modelo = modelo;
    }

  async findByUsername(username){
    const user = await this.modelo.findOne({username: username})
    return user
  }

  async saveNew(obj){
    const newUser = await this.modelo.create(obj);
    return newUser
  }

  async findUserById(id){
    const user = await this.modelo.findById(id);
    return user
  }

  async addCartIdToUser(username, id){
    const usuario = await this.modelo.findOneAndUpdate(
      {username: username},
      { $set: {carritoactual: id}})
      return usuario
  }

  async updateSetEmptyCart(username){
    const emptyCart = await this.modelo.findOneAndUpdate(
      {username: username},
      { $set: {carritoactual: "empty"}})
  }


}

module.exports = {
  MongoUsuarios,
  Usuarios
}
