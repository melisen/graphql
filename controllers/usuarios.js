const logger = require("../logger/winston-logger")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  postLogin,
  postSignup
} = require("../services/usuarios")


const getLoginController = (req, res)=>{
    logger.log("info", "/login - GET")
    if (req.isAuthenticated()) {
        const { username, password, telefono, nombre, apellido, avatar, edad, direccion, carritoactual  } = req.user;
        const user = { username, password, telefono, nombre, apellido, avatar, edad, direccion, carritoactual  };
        res.render("profileUser", { user });
        console.log(user.carritoactual)
      } else {
        res.render("login");
      }
  }

  const postLoginController = async (req, res)=>{
  const { username, password } = req.user;
  const user = await postLogin(username)
  res.render("profileUser", { user});
  logger.log("info", "/login - POST - render profileUser")
}

const getFailloginController = (req, res)=>{
  logger.log("info", "/faillogin - GET")
  res.render("faillogin")
}

const getSignupController = (req, res)=>{
  logger.log("info", "/signup - GET")
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { user });
  } else {
    res.render("signup");
  }
}

const getFailsignupController = (req, res)=>{
  logger.log("info", "/failsignup - GET")
  res.render("signup-error");
}

const postSignupController = async (req, res)=>{
  logger.log("info", "/signup - POST")
  const {  username, password, nombre, apellido, direccion, edad, telefono, avatar } = req.user;
  const user = {  username, password, nombre, apellido, direccion, edad, telefono, avatar };
  await postSignup(user)
  res.render("profileUser", { user });
}

const getLogoutController = (req, res)=>{
  logger.log("info", "/logout - GET")
  const { username, password } = req.user;
  const user = { username, password };
    req.session.destroy((err) => {
      if (err) {        
        logger.log("error", err)
            res.send("no se pudo deslogear");
      } else {        
            res.render("logout", {user} );        
        }
    });
}

module.exports = {
    getLoginController,
    postLoginController,
    getFailloginController,
    getSignupController,
    postSignupController,
    getFailsignupController,
    getLogoutController
}

