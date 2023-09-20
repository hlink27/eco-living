const Unidade = require('../model/unidade')
const Tema = require('../model/tema')
const Subtema = require('../model/subtema')

exports.getIndex = (req, res, next) => {
    const user = req.session.user
    if(!user.is_admin){
        var os = user.os
        var search = os.split(',')
        Unidade.findAll({
            where: {
                id: search
            }})
        .then(unidade => {
            res.render('index', {
                pageTitle: 'Início',
                path: '/',
                unidade: unidade,
                user: user
            });
        })
    } else {
        Unidade.findAll()
        .then(unidade => {
            res.render('index', {
                pageTitle: 'Início',
                path: '/',
                unidade: unidade,
                user: user
            });
        })
    }
}

exports.getUnidade = (req, res, next) => {
    const unidade = req.params.unidade
    Unidade.findOne({where: {id: unidade}})
    .then(unidade => {
        Tema.findAll({where: {unidade_id: unidade}})
        .then(tema => {
            const temaIds = new Set()
            tema.forEach(tema => {
                temaIds.add(tema.id)
            })
            const subtemasId = Array.from(temaIds)
            Subtema.findAll({where: {tema_id: subtemasId}})
            .then(subtema => {
                console.log(tema)
                console.log(subtema)
                res.render('unidade/index', {
                    pageTitle: unidade.nome,
                    path: '/unidade/index',
                    unidade: unidade,
                    tema: tema,
                    subtema: subtema,
                    user: req.session.user
                });
            })
        })
    })
}