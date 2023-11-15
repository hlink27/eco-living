const bcrypt = require('bcryptjs')
const User = require('../model/user')
const fs = require('fs');

exports.getLogin = (req, res, next) => {
    var erro = req.query.erro
    if(erro){
        erro = 'Usuário ou senha incorreta'
    } else {
        erro = false
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        erro: erro
    })
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username
    const senha = req.body.senha
    User.findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                return res.redirect('/login?erro=true')
            }
            bcrypt
                .compare(senha, user.password)
                .then(result => {
                    if (result) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            console.log(err)
                            res.redirect('/')
                        })
                    }
                    res.redirect('/login?erro=true')
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/login')
                })
            })
        .catch(err => console.log(err))
}

exports.postLogOut = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
}
