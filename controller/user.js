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

const gerarSenha = (n) => {
    if(n > 1){
        var caracter = 'ab0cde1f2ghi3jk4lm5no67pq8rst9uvwxyz';
        var novaSenha = "";
        for(var x = 1; x <= n; x++){
            var select = Math.floor(Math.random() * caracter.length);
            novaSenha += caracter.charAt(select)
        }
        return novaSenha
    }
}
exports.resetPassword = (req, res, next) => {
    var userId = req.params.userId
    User.findByPk(userId)
    .then(usuario => {
        var newPassword = gerarSenha(12)
        return bcrypt
        .hash(newPassword, 12)
        .then(senhaHashed => {
            usuario.password = senhaHashed
            usuario.save()
        })
        .then(result => {
            res.render('user/password-reset', {
                pageTitle: 'Senha Redefinida',
                path: '/user/password-reset',
                usuario: usuario,
                user: req.session.user,
                newPassword: newPassword
            })
        })
    })
}

exports.getMinhaConta = (req, res, next) => {
    User.findByPk(req.session.user.id)
    .then(user => {
        res.render('user/mudar-senha', {
            pageTitle: 'Redefinir Senha',
            path: '/user/mudar-senha',
            user: user
        })
    })
}

exports.postMinhaConta = (req, res, next) => {
    var oldPassword = req.body.oldPassword
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword
    User.findByPk(req.session.user.id)
    .then(user => {
        bcrypt
        .hash(oldPassword, 12)
        .then(senhaVelha => {
            bcrypt
            .compare(senhaVelha, user.password)
            .then(result => {
                console.log(result) //console.log
                if(result){
                    if(password == confirmPassword){
                        bcrypt
                        .hash(password, 12)
                        .then(novaSenha => {
                            user.password = novaSenha
                            user.save()
                            return res.redirect('/')
                        })
                    }
                }
                return res.redirect('/mudar-senha')
            })
        })
    })
}