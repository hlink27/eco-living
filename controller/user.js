const User = require('../model/user')
const Unidade = require('../model/unidade')
const bcrypt = require('bcryptjs')

exports.getAddUser = (req, res, next) => {
    Unidade.findAll()
    .then(unidade => {
        User.findAll()
        .then(usuario => {
            res.render('user/add-user', {
                pageTitle: 'Adicionar Usuário',
                path: '/user/add-user',
                unidade: unidade,
                edit: false,
                usuario: usuario,
                user: req.session.user
            });
        })
    })
}

exports.postAddUser = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    var password2 = req.body.password2
    var is_admin = req.body.is_admin
    var os = req.body.ex
    if(!os){
        os = null
    }
    User.findOne({where: {username: username}})
    .then(user => {
        if(!user && password == password2){
            return bcrypt
            .hash(password, 12)
            .then(senhaHashed => {
                os = os.toString()
                const user = new User({
                    username: username,
                    password: senhaHashed,
                    is_admin: is_admin,
                    os: os
                })
                return user.save()
            })
            .then(result => {
                res.redirect('/')
            })
        } else {
            res.redirect('/add-user')
        }
    })
}

exports.getListUser = (req, res, next) => {
    User.findAll()
    .then(usuario => {
        res.render('user/list-user', {
            pageTitle: 'Listar Usuário',
            path: '/user/list-user',
            usuario: usuario,
            user: req.session.user
        });
    })
}

exports.postDelete = (req, res, next) => {
    const userId = req.params.userId
    User.findByPk(userId)
    .then(userId => {
        return userId.destroy()
    })
    .then(result => {
        res.redirect('/list-user')
    })
}

exports.getEditUser = (req, res, next) => {
    const userId = req.params.userId
    User.findByPk(userId)
    .then(usuario => {
        Unidade.findAll()
        .then(unidade => {
            res.render('user/add-user', {
                pageTitle: 'Editar Usuário',
                path: '/user/add-user',
                usuario: usuario,
                user: req.session.user,
                unidade: unidade,
                edit: true
            })
        })
    })
}

exports.postEditUser = (req, res, next) => {
    var username = req.body.username
    var is_admin = req.body.is_admin
    var os = req.body.ex
    var userId = req.body.userId
    User.findOne({where: {username: username}})
    .then(user => {
        if(!user){
            User.findByPk(userId)
            .then(usuario => {
                os = os.toString()
                usuario.username = username
                usuario.is_admin = is_admin
                usuario.os = os
                usuario.save()
                res.redirect('/list-user')
            })
        } else {
            res.redirect('/list-user')
        }
    })
}