const path = require('path');
const express = require('express');
const mgmtController = require('../controller/management')
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')
const router = express.Router()

router.get('/add-unidade', isAuth, isAdmin, mgmtController.getAddUnidade)
router.post('/add-unidade', isAuth, isAdmin, mgmtController.postAddUnidade)
router.get('/edit-unidade/:unidadeId', isAuth, isAdmin, mgmtController.getEditUnidade)
router.post('/edit-unidade', isAuth, isAdmin, mgmtController.postEditUnidade)
router.post('/delete-unidade', isAuth, isAdmin, mgmtController.postDeleteUnidade)

router.get('/add-tema/:unidadeId', isAuth, isAdmin, mgmtController.getAddTema)
router.post('/add-tema', isAuth, isAdmin, mgmtController.postAddTema)
router.get('/edit-tema/:temaId', isAuth, isAdmin, mgmtController.getEditTema)
router.post('/edit-tema', isAuth, isAdmin, mgmtController.postEditTema)
router.post('/delete-tema', isAuth, isAdmin, mgmtController.postDeleteTema)

router.get('/add-subtema/:temaId', isAuth, isAdmin, mgmtController.getAddSubtema)
router.post('/add-subtema', isAuth, isAdmin, mgmtController.postAddSubmeta)
router.get('/edit-subtema/:subtemaId', isAuth, isAdmin, mgmtController.getEditSubtema)
router.post('/edit-subtema', isAuth, isAdmin, mgmtController.postEditSubtema)
router.post('/delete-subtema', isAuth, isAdmin, mgmtController.postDeleteSubtema)

module.exports = router