const Unidade = require('../model/unidade')
const Tema = require('../model/tema')
const Subtema = require('../model/subtema')

exports.getIndex = (req, res, next) => {
    Unidade.findAll()
    .then(unidade => {
        res.render('index', {
            pageTitle: 'Início',
            path: '/',
            unidade: unidade,
            user: req.session.user
        });
    })
}