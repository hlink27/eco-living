const path = require('path');
const express = require('express');
const mgmtController = require('../controller/management')
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')
const router = express.Router()

//CRUD Unidade
router.get('/add-unidade', isAuth, isAdmin, mgmtController.getAddUnidade)
router.post('/add-unidade', isAuth, isAdmin, mgmtController.postAddUnidade)
router.get('/edit-unidade/:unidadeId', isAuth, isAdmin, mgmtController.getEditUnidade)
router.post('/edit-unidade', isAuth, isAdmin, mgmtController.postEditUnidade)
router.post('/delete-unidade', isAuth, isAdmin, mgmtController.postDeleteUnidade)

//CRUD Estrutura
router.get('/add-estrutura/:unidadeId', isAuth, isAdmin, mgmtController.getAddEstrutura)
router.post('/add-estrutura', isAuth, isAdmin, mgmtController.postAddEstrutura)
router.get('/edit-estrutura/:estruturaId', isAuth, isAdmin, mgmtController.getEditEstrutura)
router.post('/edit-estrutura', isAuth, isAdmin, mgmtController.postEditEstrutura)
router.post('/delete-estrutura', isAuth, isAdmin, mgmtController.postDeleteEstrutura)

//CRUD Tema
router.get('/add-tema/:estruturaId', isAuth, isAdmin, mgmtController.getAddTema)
router.post('/add-tema', isAuth, isAdmin, mgmtController.postAddTema)
router.get('/edit-tema/:temaId', isAuth, isAdmin, mgmtController.getEditTema)
router.post('/edit-tema', isAuth, isAdmin, mgmtController.postEditTema)
router.post('/delete-tema', isAuth, isAdmin, mgmtController.postDeleteTema)

//CRUD Subtema
router.get('/add-subtema/:temaId', isAuth, isAdmin, mgmtController.getAddSubtema)
router.post('/add-subtema', isAuth, isAdmin, mgmtController.postAddSubmeta)
router.get('/edit-subtema/:subtemaId', isAuth, isAdmin, mgmtController.getEditSubtema)
router.post('/edit-subtema', isAuth, isAdmin, mgmtController.postEditSubtema)
router.post('/delete-subtema', isAuth, isAdmin, mgmtController.postDeleteSubtema)

module.exports = router