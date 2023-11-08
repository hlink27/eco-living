exports.getAbout = (req, res, next) => {
    res.render('sobre/sobre', {
        pageTitle: 'Sobre',
        path: '/sobre/sobre',
        user: req.session.user
    });
}