/* Os códigos de status das respostas HTTP indicam se uma requisição HTTP foi corretamente concluída. 
As respostas são agrupadas em cinco classes:
  1 - Respostas de informação (100-199),
  2 - Respostas de sucesso (200-299),
  3 - Redirecionamentos (300-399)
  4 - Erros do cliente (400-499)
  5 - Erros do servidor (500-599).*/
const HttpStatus = require('http-status')
// Método de criptografia do tipo hash para senhas.
const bcrypt = require('bcrypt')
// Framework para aplicações web para Node.js, feito para otimizar a construção de aplicações web e API's.
const express = require('express')
// Criação de dados com assinatura opcional e/ou criptografia.
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')
const User = require('../models/User')
const router = express.Router()

// Gera um token com jwt (criptografia) usando o secret gerado no auth.json.
function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

// Rota de cadastro de um novo usuário.
router.post('/cadastro', async function (req, res) {
  try {
    const { email } = req.body
    const { cpf } = req.body

    if (await User.findOne({ email }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Email já existente' })

    if (await User.findOne({ cpf }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'CPF já existente' })

    const newUser = new User({
      name: req.body.name,
      cpf: req.body.cpf,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      level: 1,
    })

    await newUser.save()

    newUser.password = undefined

    return res
      .status(HttpStatus.CREATED)
      .send({ newUser, token: gerarToken({ id: newUser.id }) })
  } catch (err) {
    console.log(err);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Usuário não pode ser cadastrado!' })
  }
})

// Rota de login do usuário.
router.post('/login', async function (req, res) {
  const { password } = req.body
  const { usuario } = req.body

  var user = await User.findOne({ email: usuario }).select('+password')
  if (!user) {
    user = await User.findOne({ cpf: usuario }).select('+password')

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Usuário não encontrado!' })
    }
  }

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Senha invalida!' })

  if (user.level === 0) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Esse Usuário foi desativado!' })
  }

  user.password = undefined

  res.send({ user, token: gerarToken({ id: user.id }) })
})

// Exportação da rota "mestra", EX: ...../auth/login...
module.exports = (app) => app.use('/auth', router)
