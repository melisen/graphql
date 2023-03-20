const express = require('express');
const {Router} = express;
const productosRouter = Router();
const {
    allProductsController,
    postCategoryController,
    filterByCategoryController,
    postCategoryAndProdController,
    getProductController,
    keepShoppingController,
} = require("../controllers/productos")


productosRouter.get('/', allProductsController)

productosRouter.post("/", postCategoryController)

productosRouter.get('/:category', filterByCategoryController)

productosRouter.post("/:category", postCategoryAndProdController)

productosRouter.get("/:category/:id", getProductController)

productosRouter.get("/seguir-comprando", keepShoppingController)

module.exports = productosRouter