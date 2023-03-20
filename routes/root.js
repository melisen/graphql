
const express = require("express");
const {Router} = express;
const rootRouter = Router();

const {getRootController, 
    //failRouteController
} = require("../controllers/root")

rootRouter.get("/", getRootController)

//rootRouter.get("*", failRouteController);

module.exports =  rootRouter