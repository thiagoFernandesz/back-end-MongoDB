//Framework para aplicações web para Node.js, feito para otimizar a construção de aplicações web e API's.
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./controllers/authController')(app)
require('./controllers/userController')(app)

//Usada para vincular e ouvir as conexões no host e na porta especificados.
app.listen(3000, () => {
    console.log('apiOn');
}) 
