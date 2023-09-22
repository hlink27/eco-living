const User = require('../model/user')
const Unidade = require('../model/unidade')
const bcrypt = require('bcryptjs')

exports.getAddUser = (req, res, next) => {
    Unidade.findAll()
    .then(unidade => {
        res.render('user/add-user', {
            pageTitle: 'Adicionar Usuário',
            path: '/user/add-user',
            unidade: unidade,
            edit: false,
            user: req.session.user
        });
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