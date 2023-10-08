module.exports = (req, res, next) => {
    if(!req.session.user.is_admin){
        var os = req.session.user.os
        os = os.split(",")
        var unidade = req.params.unidade
        if(os.includes(unidade)){
            next()
        } else {
            res.redirect('/')
        }
    } else {
        next()
    }
}