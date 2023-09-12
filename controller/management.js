const Unidade = require('../model/unidade')
const Tema = require('../model/tema')
const Subtema = require('../model/subtema')

exports.getAddUnidade = (req, res, next) => {
    res.render('management/add-unidade', {
        pageTitle: 'Adicionar Unidade',
        path: '/management/add-unidade',
        unidadeBool: true,
        temaBool: false,
        subtemaBool: false,
        user: req.session.user
    });
}

exports.postAddUnidade = (req, res, next) => {
    var nome = req.body.nome
    var img = req.file.path
    img = img.replace('public', '')
    Unidade
        .create({
            nome: nome,
            img: img
        })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getAddTema = (req, res, next) => {
    const unidadeId = req.params.unidadeId
    Unidade.findByPk(unidadeId)
    .then(unidade => {
        res.render('management/add-unidade', {
            pageTitle: 'Adicionar Tema',
            path: '/management/add-unidade',
            unidade: unidade,
            unidadeBool: false,
            temaBool: true,
            subtemaBool: false,
            user: req.session.user
        });
    })
}

exports.postAddTema = (req, res, next) => {
    var nome = req.body.nome
    var unidadeId = req.body.unidadeId
    var progresso = req.body.progressbar
    progresso ? progresso = 1 : progresso = 0
    Tema.create({
        nome: nome,
        unidade_id: unidadeId,
        progresso: progresso
    })
    .then(result => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getAddSubtema = (req, res, next) => {
    var temaId = req.params.temaId
    Tema.findByPk(temaId)
    .then(tema => {
        res.render('management/add-unidade', {
            pageTitle: 'Adicionar Tema',
            path: '/management/add-unidade',
            tema: tema,
            unidadeBool: false,
            temaBool: false,
            subtemaBool: true,
            user: req.session.user
        });
    })
}

exports.postAddSubmeta = (req, res, next) => {
    var nome = req.body.nome
    var sts = req.body.sts
    var temaId = req.body.temaId
    Subtema.create({
        nome: nome,
        sts: sts,
        tema_id: temaId
    })
    .then(result => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
}