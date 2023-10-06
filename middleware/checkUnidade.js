module.exports = (req, res, next) => {
    var os = req.session.user.os
    os = os.split(",")
    var unidade = req.params.unidade
    if(os.includes(unidade)){
        next()
    } else {
        res.redirect('/')
    }
}