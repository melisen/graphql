const express = require("express");
const {Router} = express;
const usuariosRouter = Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const {
    getLoginController,
    postLoginController,
    getFailloginController,
    getSignupController,
    postSignupController,
    getFailsignupController,
    getLogoutController

} = require("../controllers/usuarios")



 usuariosRouter.get("/login", getLoginController);

  usuariosRouter.post("/login",
  passport.authenticate("login", { failureRedirect: "/api/usuarios/faillogin" }), postLoginController);

usuariosRouter.get("/faillogin", getFailloginController);

usuariosRouter.get("/signup", getSignupController);

usuariosRouter.post("/signup", passport.authenticate("signup", { failureRedirect: "/api/usuarios/failsignup" }),
  postSignupController);

usuariosRouter.get("/failsignup", getFailsignupController);

usuariosRouter.get("/logout", getLogoutController);

module.exports = usuariosRouter