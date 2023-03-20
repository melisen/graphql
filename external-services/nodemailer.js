const logger = require("../Logger/winston-logger");

const mailADMIN = "melina.senorans@gmail.com"
//¿de donde viene la constante?

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: 'melina.senorans@gmail.com',
      pass: 'vrezoyzaszrufihs'
  }
});

const sendOrderMailToAdmin = async (productos, user)=>{
  const listaPedido = productos.map( (item) => (
    `<li> ${item.title}   $${item.price}   x   ${item.quantity} u.</li>`))
    const bodyPedido =  
    `<div>
    <p>Nuevo pedido de ${user.nombre} ( ${user.username} )</p>
    <p>Productos:</p>
    <ul>
    <ul>
        ${listaPedido}
    </ul>
    </div>`

    const mailOptionsNuevoPedido = {
      from: 'App Tienda',
      to: mailADMIN,
      subject:`Nuevo pedido de ${user.nombre} ( ${user.username} )`,
      html: bodyPedido
    }

    try {
      const info = await transporter.sendMail(mailOptionsNuevoPedido)
      logger.log("info", info)
   } catch (err) {
      logger.log("error", err)
   } 
}

const sendNewRegisterToAdmin = async (user)=>{
  const mailOptionsNuevoUsuario ={
    from: 'App Tienda',
    to: mailADMIN,
    subject: 'Nuevo registro',
    html: `<div>
          <p>Nuevo usuario registrado:</p>
            <ul>
              <li>Nombre: ${user.nombre} </li>
              <li>Apellido: ${user.apellido} </li>
              <li>>Email: ${user.username}</li> 
              <li>Edad: ${user.edad}</li>  
              <li>Dirección: ${user.direccion}</li>  
              <li>Teléfono: ${user.telefono}</li> 
              <li> <img src=" ${user.avatar}" alt=" ${user.nombre}" /> </li> 
            </ul>
            </div>`
  }
  try {
    const info = await transporter.sendMail(mailOptionsNuevoUsuario)
    logger.log("info", info)
 } catch (err) {
    logger.log("error", err)
 } 
}


module.exports = {sendOrderMailToAdmin, sendNewRegisterToAdmin, transporter}