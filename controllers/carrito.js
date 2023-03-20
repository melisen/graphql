 const logger = require("../logger/winston-logger")
 const {
    createCart,
    deleteCart,
    getProducts,
    addProductToCart,
    deleteProdFromCart,
    confirmOrder
 } = require("../services/carrito")



  const createCartController = async (req, res)=>{
    const {username} = req.user;
    await createCart(username)
    res.redirect("/api/productos") 
    logger.log("info", "/api/carrito - POST")
  }

  const addProductToCartController = async (req, res)=>{
    const objetoProd = {
      _id:req.body.idprod,
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      quantity: req.body.unidades
      }
    const {id} = req.params;
    const idcarrito = id;
    await addProductToCart(objetoProd, idcarrito)
    res.redirect(`/api/carrito/${idcarrito}/productos/`)
    logger.log("info", "/api/carrito/:id/productos - POST")  
}

const getProductsController = async (req, res)=>{
  try{
    const user = req.user;
    const username = user.username;
    const id = user.carritoactual;
    if(id!="empty"){
      const productosMap = await getProducts(id)
      if(productosMap){
       res.render("carrito", {productosMap, id, username});
       logger.log("info", "/api/carrito/:id/productos - GET")
      }else{
       logger.log("error", "no se puedo acceder a lista de productos")
      }
    }else{
      const msgEmptyCart = "El carrito aún no tiene productos"
      res.render("carrito", {msgEmptyCart})
    }
      


  }catch(err){
  logger.log("error", "no se puedo acceder a lista de productos o no existe el carrito en el user")
  }

 
}

  const deleteCartController = async (req, res)=>{
      const {id} = req.body;
      const {username} = req.user;
      const carritoEliminado = await deleteCart(id, username)
      logger.log("info", "/api/carrito/delcart - POST  eliminar carrito")
      res.redirect("/api/usuarios/login")
  }

  const deleteProdFromCartController = async (req, res)=>{
    const {prod} = req.body;
    const user = req.user;
    const id = user.carritoactual;
    const eliminarProd = await deleteProdFromCart(id, prod)
    res.redirect(`/api/carrito/${id}/productos`)    
    logger.log("info", "/api/carrito/productos - POST")
  }

  const confirmOrderController = async (req, res)=>{
        const {username} = req.body;
        const {id} = req.body; 
        const enviarMensajes = await confirmOrder(username, id)  
        res.render("pedido-exitoso")
        logger.log("info", "/api/carrito/confirmar-pedido - POST")
  }
  

    module.exports = {
    createCartController,
    deleteCartController,
    getProductsController,
    addProductToCartController,
    deleteProdFromCartController,
    confirmOrderController
  }