const Unidade = require('../model/unidade')
const Tema = require('../model/tema')
const Subtema = require('../model/subtema')
const Estrutura = require('../model/estrutura')

/* Unidade */
exports.getAddUnidade = (req, res, next) => {
    res.render('management/add-unidade', {
        pageTitle: 'Adicionar Unidade',
        path: '/management/add-unidade',
        unidadeBool: true,
        temaBool: false,
        subtemaBool: false,
        edit: false,
        user: req.session.user
    });
}

exports.postAddUnidade = (req, res, next) => {
    var nome = req.body.nome
    var img = req.file
    if(img){
        img = img.path.replace('public', '')
    }
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

exports.getEditUnidade = (req, res, next) => {
    var unidadeId = req.params.unidadeId
    Unidade.findByPk(unidadeId)
    .then(unidade => {
        res.render('management/add-unidade', {
            pageTitle: 'Editar Tema',
            path: '/management/add-unidade',
            unidade: unidade,
            unidadeBool: true,
            temaBool: false,
            subtemaBool: false,
            edit: true,
            user: req.session.user
        });
    })
}

exports.postEditUnidade = (req, res, next) => {
    var nome = req.body.nome
    var img = req.file
    var unidadeId = req.body.unidadeId
    Unidade.findByPk(unidadeId)
    .then(unidade => {
        unidade.nome = nome
        if(img){
            unidade.img = img.path.replace('public', '')
        }
        unidade.save()
    })
    .then(result => {
        res.redirect(`/unidade/${unidadeId}`)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postDeleteUnidade = (req, res, next) => {
    var unidadeId = req.body.unidadeId
    Unidade.findByPk(unidadeId)
    .then(unidadeId => {
        unidadeId.destroy()
    })
    .then(result => {
        res.redirect(`/`)
    })
}

exports.getAddTema = (req, res, next) => {
    const estruturaId = req.params.estruturaId
    Estrutura.findByPk(estruturaId)
    .then(estrutura => {
        res.render('management/add-unidade', {
            pageTitle: 'Adicionar Tema',
            path: '/management/add-unidade',
            subtema: '',
            estrutura: estrutura.id,
            unidadeBool: false,
            temaBool: true,
            subtemaBool: false,
            edit: false, 
            user: req.session.user
        });
    })
}

exports.postAddTema = (req, res, next) => {
    var nome = req.body.nome
    var estruturaId = req.body.estruturaId
    var progresso = req.body.progressbar
    progresso ? progresso = 1 : progresso = 0
    Tema.create({
        nome: nome,
        estrutura_id: estruturaId,
        progresso: progresso
    })
    .then(result => {
        res.redirect(`/estrutura/${estruturaId}`)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getEditTema = (req, res, next) => {
    var temaId = req.params.temaId
    Tema.findByPk(temaId, {include: {model: Estrutura}})
    .then(tema => {
        res.render('management/add-unidade', {
            pageTitle: 'Editar Tema',
            path: '/management/add-unidade',
            tema: tema,
            unidadeBool: false,
            temaBool: true,
            subtemaBool: false,
            edit: true,
            estrutura: tema.estrutura.id,
            user: req.session.user
        });
    })
}

exports.postEditTema = (req, res, next) => {
    var nome = req.body.nome
    var progresso = req.body.progressbar
    progresso ? progresso = 1 : progresso = 0
    var temaId = req.body.temaId
    var estruturaId = req.body.estruturaId
    Tema.findByPk(temaId)
    .then(tema => {
        tema.nome = nome,
        tema.progresso = progresso
        tema.save()
    })
    .then(result => {
        res.redirect(`/estrutura/${estruturaId}`)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postDeleteTema = (req, res, next) => {
    var temaId = req.body.temaId
    var estruturaId = req.body.estruturaId
    Tema.findByPk(temaId)
    .then(tema => {
        tema.destroy()
    })
    .then(result => {
        res.redirect(`/estrutura/${estruturaId}`)
    })
}

exports.getAddSubtema = (req, res, next) => {
    var temaId = req.params.temaId
    Tema.findByPk(temaId)
    .then(tema => {
        res.render('management/add-unidade', {
            pageTitle: 'Adicionar Subtema',
            path: '/management/add-unidade',
            estrutura: tema.estrutura_id,
            subtema: '',
            tema: tema,
            unidadeBool: false,
            temaBool: false,
            subtemaBool: true,
            edit: false,
            user: req.session.user
        });
    })
}

exports.postAddSubmeta = (req, res, next) => {
    var nome = req.body.nome
    var sts = req.body.sts
    var temaId = req.body.temaId
    var estruturaId = req.body.estruturaId
    Subtema.create({
        nome: nome,
        sts: sts,
        tema_id: temaId
    })
    .then(result => {
        res.redirect(`/estrutura/${estruturaId}`)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getEditSubtema = (req, res, next) => {
    var subtemaId = req.params.subtemaId
    Subtema.findByPk(subtemaId, 
        { include: [{
            model: Tema,
            include: [{
            model: Estrutura,
            }]
        }]}
    )
    .then(subtema => {
        res.render('management/add-unidade', {
            pageTitle: 'Editar Subtema',
            path: '/management/add-unidade',
            subtema: subtema,
            unidadeBool: false,
            temaBool: false,
            subtemaBool: true,
            edit: true,
            estrutura: subtema.tema.estrutura.id,
            user: req.session.user
        });
    })
}

exports.postEditSubtema = (req, res, next) => {
    var nome = req.body.nome
    var sts = req.body.sts
    var subtema = req.body.subtemaId
    var estrutura = req.body.estruturaId
    Subtema.findByPk(subtema)
    .then(subtema => {
        subtema.nome = nome,
        subtema.sts = sts,
        subtema.save()
    })
    .then(result => {
        res.redirect(`/estrutura/${estrutura}`)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.postDeleteSubtema = (req, res, next) => {
    var subtemaId = req.body.subtemaId
    var unidade = req.body.unidadeId
    Subtema.findByPk(subtemaId)
    .then(subtema => {
        subtema.destroy()
    })
    .then(result => {
        res.redirect(`/unidade/${unidade}`)
    })
}