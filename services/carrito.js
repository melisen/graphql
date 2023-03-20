const logger = require("../logger/winston-logger");
const config = require("../configuration/config")
const PERSISTENCIA = config.PERSISTENCIA;
const DAOFactoryCarrito = require("../models/DAOs/carrito/DAOfactory-carrito")
const DAOcarrito = new DAOFactoryCarrito(PERSISTENCIA)

const {saveCartIdInUser, updateEmptyCartInUser, findUser} = require("./usuarios")
const {SendOrderWhatsappToAdmin, sendOrderSMSToUser} = require("../external-services/twilio")
const {sendOrderMailToAdmin, transporter} = require("../external-services/nodemailer");



const createCart = async (username)=>{
    try{
        const id = await DAOcarrito.saveNew()
        const userWithCart = await saveCartIdInUser(username, id)                
        }
    catch(err){
        logger.log("error", err)
    }
}

const addProductToCart = async (objetoProd, idcarrito)=>{
    const idProd = objetoProd._id;
    const isProd = await DAOcarrito.findProdInCart(idcarrito, idProd);
    if(isProd){
        logger.log("info", `isProd ${isProd}`)
        let cantPrevia = parseInt(isProd.quantity);
        let cantSumar = parseInt(objetoProd.quantity)
        await DAOcarrito.addRepeatedProd(idProd, cantPrevia, cantSumar, idcarrito)
    }else{
        try{
            await DAOcarrito.AddProdToCart(objetoProd, idcarrito)
        }
        catch(err){
            logger.log("error", "no se pudo agregar producto al carrito")
          }
    }    
} 

const getProducts = async (id)=>{
    const productList = await DAOcarrito.getProductList(id)  
    if(productList){
        return  productList
    }else{
        return false
    }
    
}


const deleteCart = async (idcarrito, username)=>{
    const eliminarCarrito = await DAOcarrito.deleteById(idcarrito)    
    const carritoVacio = await updateEmptyCartInUser(username) 
}



const deleteProdFromCart = async (id, idprod)=>{
    const delProd = await DAOcarrito.deleteProd(id, idprod)
    return "prod eliminado"
}

const confirmOrder = async (username, carritoID)=>{
    const user = await findUser(username)
    const productos = await DAOcarrito.getProductList(carritoID);
    const sendEmail = await sendOrderMailToAdmin(productos, user)
    const sendWhatsapp = await SendOrderWhatsappToAdmin(user)
    const sendSMS = await sendOrderSMSToUser(user, carritoID)
}
        
       module.exports = {
        createCart,
        deleteCart,
        getProducts,
        deleteProdFromCart,
        addProductToCart,
        confirmOrder

      }
      