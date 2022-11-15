const mongoose = require("mongoose") ;

const chatSchema = new mongoose.Schema({
  mail: { type: String, require: true, max: 200 },
  type: { type: String, require: true, max: 200 },
  tiempochat:{ type: String, required: true },
  message:{ type: String, require: true},
})

const Chats = mongoose.model ("mensajes", chatSchema)

module.exports = Chats

