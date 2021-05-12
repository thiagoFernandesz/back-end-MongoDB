// Framework para aplicações web para Node.js, feito para otimizar a construção de aplicações web e API's.
const express = require('express')
/* Os códigos de status das respostas HTTP indicam se uma requisição HTTP foi corretamente concluída. 
As respostas são agrupadas em cinco classes:
  1 - Respostas de informação (100-199),
  2 - Respostas de sucesso (200-299),
  3 - Redirecionamentos (300-399)
  4 - Erros do cliente (400-499)
  5 - Erros do servidor (500-599).*/
const HttpStatus = require('http-status')
// Framework para aplicações web para Node.js, feito para otimizar a construção de aplicações web e API's.
const bcrypt = require('bcrypt')

const authMiddleware = require('../middlewares/auth')
const User = require('../models/User')

const router = express.Router()
router.use(authMiddleware)

// Rota para listar os usuários.
router.get('/usuarios', async function (req, res) {
  try {
    const admin = await User.findById(req.userId)

    if (admin.level !== 999)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Usuário não autorizado' })

    const users = await User.find()

    return res.send( users )
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao listar usuários' })
  }
})

// Rota para listar um usuário específico.
router.get('/:idUser', async function (req, res) {
  try {
    const usuario = await User.findById(req.params.idUser)

    return res.send({ usuario })
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao listar usuário' })
  }
})

// Rota para editar um usuário.
router.put('/alter/:idUser', async function (req, res) {
  try {
    const newData = req.body

    if (newData.password)
      newData.password = await bcrypt.hashSync(req.body.password, 10)

    const usuario = await User.findByIdAndUpdate(req.params.idUser, newData, {
      new: true,
    })

    await usuario.save()
    return res.send({ usuario })
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao atualizar usuário!' })
  }
})

// Rota para desativar um usuário: level 0.
router.put('/desativa/:userId', async function (req, res) {
  try {
    const admin = await User.findById(req.userId)

    if (admin.level !== 999)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Sem autorização de exclusão!' })

    await User.findByIdAndUpdate(req.params.userId, {level:0})
  
    await usuario.save()

    return res.send({message: 'excluido com sucesso!'})
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao deletar usuário!' })
  }
})

// Rota para ativar um usuário: level 1.
router.put('/ativa/:userId', async function (req, res) {
  try {
    const admin = await User.findById(req.userId)

    if (admin.level !== 999)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Sem autorização de exclusão!' })

    await User.findByIdAndUpdate(req.params.userId, {level:1})

    await usuario.save()

    return res.send({message: 'excluido com sucesso!'})
  } catch (err) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ error: 'Erro ao deletar usuário!' })
  }
})

// Exportação da rota "mestra", EX: ...../application/usuarios...
module.exports = (app) => app.use('/application', router)
