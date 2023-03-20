const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const MsgSchema = new mongoose.Schema({
  fecha: { type: String, required: true },
  mensaje: { type: String, required: true }
})

const authorSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 100 },
  text: [MsgSchema]
});

const MsgModel = mongoose.model("mensajes", authorSchema);
module.exports = MsgModel;
/*
author = {
  email:username,
  text:[
    {
      fecha: fecha,
      mensaje: mensaje
    }, (...)
  ]

}

*/