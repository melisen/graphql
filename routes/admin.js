const express = require('express');
const {Router} = express;
const adminRouter = Router();
const {    
    allProductsAdminController,
    addProductAdminController,
    prodToUpdateAdminController,
    UpdateProductAdminController,
    deleteProdAdminController
} = require("../controllers/admin")

adminRouter.get("/",  allProductsAdminController)

adminRouter.post("/", addProductAdminController);

adminRouter.post("/update",  prodToUpdateAdminController)

adminRouter.post("/update-prod",  UpdateProductAdminController)

adminRouter.post("/delete",  deleteProdAdminController)



module.exports = adminRouter