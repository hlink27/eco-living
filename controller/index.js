const Unidade = require('../model/unidade')
const Tema = require('../model/tema')
const Subtema = require('../model/subtema')

exports.getIndex = (req, res, next) => {
    Unidade.findAll()
    .then(unidade => {
        Tema.findAll({where: {unidade_id: unidade[0].id}})
        .then(tema => {
            Subtema.findAll()
            .then(subtema => {
                res.render('index', {
                    pageTitle: 'Início',
                    path: '/',
                    unidade: unidade,
                    tema: tema,
                    subtema: subtema,
                    user: req.session.user
                });
            })
        })
    })
}