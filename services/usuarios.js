const logger = require("../logger/winston-logger");

const config = require("../configuration/config")
const PERSISTENCIAUSUARIOS = config.PERSISTENCIAUSUARIOS;
const DAOFactoryUsuarios = require("../models/DAOs/usuarios/DAOfactory-usuarios")
const DAOusuarios = new DAOFactoryUsuarios(PERSISTENCIAUSUARIOS)

const {sendNewRegisterToAdmin} = require("../external-services/nodemailer")

const createUser = async(obj)=>{
  const newUser = await  DAOusuarios.saveNew(obj)
  return newUser
}

const findUser = async (username)=>{
  const usuario = await DAOusuarios.findByUsername(username)
  const user = {
    username:usuario.username,
    password:usuario.password, 
    telefono:usuario.telefono, 
    nombre:usuario.nombre, 
    apellido:usuario.apellido, 
    avatar:usuario.avatar, 
    edad:usuario.edad, 
    direccion:usuario.direccion,
    carritoactual: usuario.carritoactual
  }
  return user
}

const findUserById = async (id)=>{
  const usuario = await DAOusuarios.findById(id);
  return usuario
}

const postLogin = async (username)=>{
  const user = await findUser(username)
  return user
}

const postSignup = async (user)=>{
  const emailRegister = await sendNewRegisterToAdmin(user)
}

const saveCartIdInUser = async (username, id)=>{
const usuario = await DAOusuarios.addCartIdToUser(username, id)
}

const updateEmptyCartInUser = async (username)=>{
  const quitarCarrito = await DAOusuarios.updateSetEmptyCart(username)
}


module.exports = {
  createUser,
    postLogin,
    postSignup,
    saveCartIdInUser,
    updateEmptyCartInUser,
    findUser,
    findUserById
}
