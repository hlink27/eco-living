const path = require('path');
const express = require('express');
const mgmtController = require('../controller/management')
/* const isAuth = require('../middleware/is-auth') */
const router = express.Router()

router.get('/add-unidade', mgmtController.getAddUnidade)
router.post('/add-unidade', mgmtController.postAddUnidade)

router.get('/add-tema/:unidadeId', mgmtController.getAddTema)
router.post('/add-tema', mgmtController.postAddTema)

router.get('/add-subtema/:temaId', mgmtController.getAddSubtema)
router.post('/add-subtema', mgmtController.postAddSubmeta)

module.exports = router