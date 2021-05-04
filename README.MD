# Back-end com MongoDB

Desenvolvimento de um aplicativo mobile para fazer o CRUD (cadastro, leitura, atualização e remoção) dos usuários por um nível determinado de acesso, utilizando como banco de dados o MongoDB.

- Nível sem acesso (0) - O usuário não tem acesso para entrar.
- Nível normal de acesso (1) - O usuário tem acesso em seu perfil, podendo fazer a modificação do mesmo.
- Nível administrativo (999) - O administrador tem acesso ao CRUD completo.

### Requisitos

 - Node.js
 
### Começando
```
$ git clone https://github.com/thiagoFernandesz/back-end-MongoDB
```
```
$ npm install
```
```
$ nodemon src/index.js
```

### Rotas para a utilização

```
http://localhost:3000/auth/login (Faz o login no sistema utilizando o Email ou CPF). [Método POST]
```
```
http://localhost:3000/auth/cadastro (Cadastrar uma conta no aplicativo utilizando o Nome, Cpf, E-mail e Senha). [Método POST]
```
```
http://localhost:3000/application/usuarios (O administrador com nível de acesso 999 pode buscar os usuários cadastrados). [Método GET]
```
```
http://localhost:3000/application/:idUser (O administrador com nível de acesso 999 pode listar um usuário específico). [Método GET]
```
```
http://localhost:3000/application/:idUser (O administrador com nível de acesso 999 pode atualizar as informações de um usuário específico). [Método PUT]
```
```
http://localhost:3000/application/desativa/:userId (O administrador com nível de acesso 999 pode setar o usuário como desativado, colocando o nível de acesso dele em 0). [Método PUT]
```
```
http://localhost:3000/application/ativa/:userId (O administrador com nível de acesso 999 pode setar o usuário como ativado, colocando o nível de acesso dele em 1). [Método PUT]
```

## Autores

* **Thiago Fernandes Rubio Tersariol**

## Licença
 
 - Nenhuma licença.

