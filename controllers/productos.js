
const logger = require("../logger/winston-logger")
const {
    getAllProducts,
    filterByCategory,
    getProduct
  } = require ("../services/productos")
  


  const allProductsController = async (req, res)=>{
    const user = req.user;
    const id = user.carritoactual;
    //const idValido = mongoose.Types.ObjectId.isValid(id)
    //console.log("allProductsController", idValido)
    const todosProd = await getAllProducts()
    res.render("nuestros-productos", {data: {id}}) 
    logger.log("info", "/api/productos - GET  allProductsController")
  }

  const postCategoryController = async (req, res)=>{
    const {category} = req.body;
    res.redirect(`/api/productos/${category}`)
  }

  const filterByCategoryController = async (req, res)=>{
    const user = req.user;
    const id = user.carritoactual; 
    const {category} = req.params    
    const todosProd = await filterByCategory(category)
    res.render("nuestros-productos", {data:{ category, id, todosProd}})
    logger.log("info", "/api/productos/:category - GET  filterByCategoryController")
  }

  const postCategoryAndProdController = async (req, res)=>{
    const {idprod} = req.body;
    const {categoryname} = req.body;
    const category = categoryname
    logger.log("info", "/api/productos/:category - POST  postCategoryAndProdController")
    res.redirect(`/api/productos/${category}/${idprod}`)   
    }

    const getProductController = async (req, res)=>{
      
        const {id} = req.params;
        const prod = await getProduct(id)
        const idcarrito = req.user.carritoactual
        res.render("detalle-producto", {data:{idcarrito, prod}})
        logger.log("info", "/api/productos/:category/:id - GET  getProductController")
      }
    
    const keepShoppingController = async (req, res)=>{ 
        const user = req.user;
        const carrito = user.carritoactual; 
        if(carrito != "empty"){             
        res.redirect("/api/productos")
        logger.log("info", "/api/productos/seguir-comprando - GET  keepShoppingController")
        }
        else{
            res.redirect("/api/carrito")
        }
      }
    

module.exports = {
  allProductsController,
  postCategoryController,
  filterByCategoryController,
  postCategoryAndProdController,
  getProductController,
  keepShoppingController
}


