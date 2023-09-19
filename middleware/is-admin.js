module.exports = (req, res, next) => {
    if(req.session.user.is_admin === 1){
        next()
    } else {
        res.redirect('/')
    }   
}