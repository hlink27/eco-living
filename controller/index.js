const Unidade = require('../model/unidade')
const Tema = require('../model/tema')
const Subtema = require('../model/subtema')
const Estrutura = require('../model/estrutura')

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
        Estrutura.findAll({where: {unidade_id: unidade.id}})
        .then(estrutura => {
            const estruturaIds = new Set()
            estrutura.forEach(est => {
                estruturaIds.add(est.id)
            })
            const temasId = Array.from(estruturaIds)
            Tema.findAll({where: {estrutura_id: temasId}})
            .then(tema => {
                res.render('unidade/index', {
                    pageTitle: unidade.nome,
                    path: '/unidade/index',
                    unidade: unidade,
                    tema: tema,
                    estrutura: estrutura,
                    user: req.session.user
                });
            })
        })
    })
}

exports.getEstrutura = (req, res, next) => {
    const estruturaId = req.params.estruturaId
    Estrutura.findOne({where: {id: estruturaId}, include: { model: Unidade, as: 'unidade' }})
    .then(estrutura => {
        console.log(estrutura)
        Tema.findAll({where: {estrutura_id: estrutura.id}})
        .then(tema => {
            const temaIds = new Set()
            tema.forEach(tema => {
                temaIds.add(tema.id)
            })
            const subtemasId = Array.from(temaIds)
            Subtema.findAll({where: {tema_id: subtemasId}})
            .then(subtema => {
                res.render('estrutura/index', {
                    pageTitle: estrutura.nome,
                    path: '/estrutura/index',
                    estrutura: estrutura,
                    tema: tema,
                    subtema: subtema,
                    user: req.session.user
                });
            })
        })
    })
}