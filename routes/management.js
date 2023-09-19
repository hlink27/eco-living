const path = require('path');
const express = require('express');
const mgmtController = require('../controller/management')
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')
const router = express.Router()

router.get('/add-unidade', isAuth, isAdmin, mgmtController.getAddUnidade)
router.post('/add-unidade', isAuth, isAdmin, mgmtController.postAddUnidade)

router.get('/add-tema/:unidadeId', isAuth, isAdmin, mgmtController.getAddTema)
router.post('/add-tema', isAuth, isAdmin, mgmtController.postAddTema)

router.get('/add-subtema/:temaId', isAuth, isAdmin, mgmtController.getAddSubtema)
router.post('/add-subtema', isAuth, isAdmin, mgmtController.postAddSubmeta)

module.exports = router