const User = require('../model/user')
const Unidade = require('../model/unidade')
const bcrypt = require('bcryptjs')

exports.getAddUser = (req, res, next) => {
    var erro = req.params.error
    if(erro == 1){
        erro = "Este nome de usuário já existe!"
    }
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
                user: req.session.user,
                erro: erro
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
    } else {
        os = os.toString()
    }
    User.findOne({where: {username: username}})
    .then(user => {
        if(!user && password == password2){
            return bcrypt
            .hash(password, 12)
            .then(senhaHashed => {
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
            res.redirect('/add-user?erro=1')
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
    var username = req.body.username;
    var is_admin = req.body.is_admin;
    var os = req.body.ex;
    console.log(`Primeiro: ${os}`)
    // Certifique-se de que "os" é um array em JavaScript
    if(!os) {
        os = null; // Ou algum valor padrão, se necessário
    }
    var userId = req.body.userId;
    User.findByPk(userId)
        .then(usuario => {
            console.log(`Segundo: ${os}`)
            usuario.username = username;
            usuario.is_admin = is_admin;
            usuario.os = os.toString();
            usuario.save()
        })
        .then(result => {
            res.redirect('/list-user');
        })
        .catch(err => {
            console.log(err)
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
    var erro = req.query.erro
    if(erro == 1){
        erro = 'Senha incorreta'
    }
    User.findByPk(req.session.user.id)
    .then(user => {
        res.render('user/mudar-senha', {
            pageTitle: 'Redefinir Senha',
            path: '/user/mudar-senha',
            user: user,
            erro: erro
        })
    })
}

exports.postMinhaConta = (req, res, next) => {
    var oldPassword = req.body.oldPassword;
    var password = req.body.password
    var newPassword = req.body.confirmPassword
    User.findByPk(req.session.user.id)
        .then(user => {
            return bcrypt.compare(oldPassword, user.password)
                .then(match => {
                    if (match) {
                        if(password == newPassword){
                           return bcrypt.hash(password, 12)
                           .then(senhaHashed => {
                                user.password = senhaHashed
                                user.save()
                                return res.redirect('/')
                           })
                        } else {
                            return res.redirect('/mudar-senha?erro=1');
                        }
                    } else {
                        return res.redirect('/mudar-senha?erro=1');
                    }
                });
        })
        .catch(err => {
            console.error(err);
            res.redirect('/mudar-senha?erro=1');
        });
};