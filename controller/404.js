exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Erro 404',
        path: '/404',
        user: req.session.user
    })
}