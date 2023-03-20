const express = require("express")
const logger = require("../logger/winston-logger")

const getRootController = (req, res)=>{
    res.render("index", {});
    logger.log("info", "/ - GET")
}

//const failRouteController = (req, res)=>{ res.status(404).render("routing-error", {}); }

module.exports = {
    getRootController,
    //failRouteController
}