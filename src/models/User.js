const mongoose = require('../database/index')

//Schema para modelar os dados do seu aplicativo.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, 
  },
  level: {
    type: Number,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
