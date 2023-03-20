const logger = require("../Logger/winston-logger");
const twilio = require("twilio")
const accountSid = process.env.ACCOUNTSIDTWILIO
const authToken = process.env.AUTHTOKENTWILIO
const client = twilio(accountSid, authToken)

//TWILIO WHATSAPP
const whatsappADMIN = 'whatsapp:+5491127204753'
//¿de dónde saleel admin?
const numeroSandbox = 'whatsapp:+14155238886'


const SendOrderWhatsappToAdmin = async (user)=>{
  const whatsappBody = `Nuevo pedido de ${user.nombre} ( ${user.username} )`
  try {
    const message = await client.messages.create({ 
      body: whatsappBody, 
      from: numeroSandbox,       
      to: whatsappADMIN
    })
    logger.log("info", message)
 } catch (error) {
   logger.log("error", error)
 }
}

//TWILIO SMS
const sendOrderSMSToUser = async (user, carritoID)=>{
const telUSER = user.telefono;
    try {
        const message = await client.messages.create({
          body: `Su pedido ${carritoID} ha sido recibido y se encuentra en proceso`,
          from: '+12707137190',
          to: telUSER
        })
        logger.log("info", message)
     } catch (error) {
       logger.log("error", error)
     }
}

module.exports = {SendOrderWhatsappToAdmin, sendOrderSMSToUser}



