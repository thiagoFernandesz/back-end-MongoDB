//Fornece uma solução direta e baseada em Schema para modelar os dados do seu aplicativo.
const mongoose = require('mongoose')

// String de conexão do banco de dados do MongoDB.
mongoose
  .connect(
    'mongodb+srv://new-user:2S6fBoz3ex0E3BC0@cluster0.ggpuu.mongodb.net/usuarios?retryWrites=true&w=majority',
    //senha: 2S6fBoz3ex0E3BC0
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(function () {
    console.log('Conectou!')
  })
  .catch(function (err) {
    console.log(err)
  })

mongoose.Promise = global.Promise

module.exports = mongoose
