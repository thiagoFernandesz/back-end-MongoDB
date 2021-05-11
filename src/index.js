//Framework para aplicações web para Node.js, feito para otimizar a construção de aplicações web e API's.
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
    //console.log('Acessou o Middleware!');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(express.urlencoded({ extended: false }))

require('./controllers/authController')(app)
require('./controllers/userController')(app)

//Usada para vincular e ouvir as conexões no host e na porta especificados.
app.listen(3000, () => {
    console.log('apiOn');
}) 
