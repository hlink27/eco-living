const path = require('path');
const express = require('express');
const mgmtController = require('../controller/management')
/* const isAuth = require('../middleware/is-auth') */
const router = express.Router()

router.get('/add-unidade', mgmtController.getAddUnidade)
router.post('/add-unidade', mgmtController.postAddUnidade)

router.get('/add-tema', mgmtController.getAddTema)
router.post('/add-tema', mgmtController.postAddTema)

module.exports = router