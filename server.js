
const express = require("express")
const session = require("express-session");
const handlebars = require('express-handlebars');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const logger = require("./logger/winston-logger");
const config = require("./configuration/config")


const app = express()

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 const schema = buildSchema(`
  type Producto {
    id: ID!
    title: String,
    price: Int,
    thumbnail: String,
    category: String
  }
  input ProductoInput {
    title: String,
    price: Int,
    thumbnail: String,
    category: String
  }
  type Query {
    getProducto(id: ID!): Producto,
    getProductos(campo: String, valor: String): [Producto], 
  }
  type Mutation {
    createProducto(datos: ProductoInput): Producto  
    updateProducto(id: ID!, datos: ProductoInput): Producto, 
    deleteProducto(id: ID!): Producto,  
  }
`)
//funciones importadas de la capa de servicios del administrador del catálogo de productos:
const {
  allProductsAdmin,
  saveProd,
  getProductAdmin,
  updateProd,
  deleteProdAdmin    
} = require("./services/admin")

const getProducto = async ({id})=>{
  const producto = await getProductAdmin(id);
  return producto
}

const getProductos = async ({campo, valor})=>{

  const todosProductos = await allProductsAdmin();7
  if (campo && valor) {
    const listafiltrada = todosProductos.filter((p) => p[campo] == valor);
    console.log(listafiltrada)
    return listafiltrada
  } else {
    return todosProductos;    
  }
}

const createProducto = async ({datos})=>{
const objetoProd = {
  title: datos.title,
  price: datos.price,
  thumbnail: datos.thumbnail,
  category: datos.category}
const prodGuardado = await saveProd(objetoProd);
return prodGuardado
}

const updateProducto = async ({id, datos})=>{
  
  const title = datos.title;
  const price = datos.price;
  const thumbnail = datos.thumbnail;
  const category = datos.category;
const updatedProd = await updateProd(id, title, price, thumbnail, category);
return updatedProd
}

const deleteProducto = async ({id})=>{
const deleteProd = await deleteProdAdmin(id);
const idprod = {id:deleteProd}
console.log(idprod)
return idprod
}

app.use(express.urlencoded({extended: true}))
app.use(express.json());
//app.use(express.static((__dirname,'views')));
app.use("/graphql", 
  graphqlHTTP({
    schema:schema,
    rootValue: {
      getProducto,
      getProductos,
      createProducto,
      updateProducto,
      deleteProducto
    },
    graphiql:true
  })
)
const PORT = 8080
app.listen( PORT,  ()=>{
  console.log(`app listening on port ${config.PORT}`)
})

/*
app.set('views', './views/')
 const hbs = handlebars.engine({
  defaultLayout: "index.hbs",
   extname: "hbs",
   layoutsDir: "./views/layouts/",
   partialsDir: "./views/partials"
 });
 app.engine("hbs", hbs);
 app.set("view engine", "hbs");






//SESSION
const MongoStore = require("connect-mongo");
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.DATABASEURL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      socket: {
        port: config.PORT,
        host: config.HOST,
      },
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000, //10 min
      }
  }),
  secret: "secreto",
  resave: false,
  saveUninitialized: false
  })
);


const  {mongoose}  = require("mongoose");
mongoose
  .connect(config.DATABASEURL)
  .then(() => logger.log("info", "Connected to DB"))
  .catch((e) => {
    console.error(e);
    throw "cannot connect to DB";
  });


 
 
  const {Usuarios} = require("./models/DAOs/usuarios/MongoDAOusuarios");


  function auth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      logger.log("error", "error en auth")
      res.redirect("/login");
    }
  }

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          logger.log("error", "Error in SignUp ");
          return done(err);
        }

        if (user) {
          logger.log("error", "User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          edad: req.body.edad,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          avatar: req.body.avatar,
          carritoactual: "empty"
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            logger.log("error", "Error in Saving user in Usuarios ");
            return done(err);
          }

          logger.log("info", user);
          logger.log("info", "User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

app.use(passport.initialize());
app.use(passport.session());


//RUTAS

const rootRouter = require("./routes/root")
app.use('/', rootRouter);

const usuariosRouter = require("./routes/usuarios")
app.use('/api/usuarios', usuariosRouter);

const carritoRouter = require('./routes/carrito.js');
app.use('/api/carrito', carritoRouter);

const productosRouter = require('./routes/productos.js');
app.use('/api/productos', productosRouter);

const adminRouter = require('./routes/admin.js');
app.use('/api/admin', adminRouter);
*/






