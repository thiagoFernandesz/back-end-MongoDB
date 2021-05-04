/* Os códigos de status das respostas HTTP indicam se uma requisição HTTP foi corretamente concluída. 
As respostas são agrupadas em cinco classes:
  1 - Respostas de informação (100-199),
  2 - Respostas de sucesso (200-299),
  3 - Redirecionamentos (300-399)
  4 - Erros do cliente (400-499)
  5 - Erros do servidor (500-599).*/
const HttpStatus = require('http-status')
// Criação de dados com assinatura opcional e/ou criptografia.
const jwt = require('jsonwebtoken')

const auth = require('../config/auth.json')

// Validações do token (Se existe, se está formatado corretamente, se é valido).
module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ error: 'Token não Informado!' })

  const partsToken = authHeader.split(' ')

  if (!partsToken.length === 2)
    return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Erro no Token!' })

  const [part, token] = partsToken

  if (!/^Bearer$/i.test(part))
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ error: 'Erro de Formação no Token' })

  jwt.verify(token, auth.secret, function (err, codeUser) {
    if (err)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Token invalido!' })

    req.userId = codeUser.id

    return next()
  })
}
