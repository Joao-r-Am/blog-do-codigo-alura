const postsControlador = require('./posts-controlador')
const { middlewaresAutenticacao } = require('../usuarios')
const autorizacao = require('../middlewares/autorizacao')
const tentarAutenticar = require('../middlewares/tentarAutenticar')
const tentarAutorizar = require('../middlewares/tentarAutorizar')
const usuariosControlador = require('../usuarios/usuarios-controlador')

module.exports = app => {
  app
    .route('/usuario/trocar-senha')
    .post(usuariosControlador.trocarSenha)

  app
    .route('/post')
    .get(
      [tentarAutenticar, tentarAutorizar('post', 'ler')],
      postsControlador.lista
    )
    .post(
      [middlewaresAutenticacao.bearer, autorizacao('post', 'criar')],
      postsControlador.adiciona
    )

  app.route('/post/:id')
    .get(
      [middlewaresAutenticacao.bearer, autorizacao('post', 'ler')],
      postsControlador.obterDetalhes
    )
    .delete(
      [middlewaresAutenticacao.bearer, middlewaresAutenticacao.local, autorizacao('post', 'remover')],
      postsControlador.remover
    )
}
