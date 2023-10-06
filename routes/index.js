const path = require('path');
const express = require('express');
const indexController = require('../controller/index')
const isAuth = require('../middleware/is-auth')
const checkUnidade = require('../middleware/checkUnidade')
const router = express.Router()

router.get('/', isAuth, indexController.getIndex)

router.get('/unidade/:unidade', isAuth, checkUnidade, indexController.getUnidade)

router.get('/estrutura/:estruturaId', isAuth, indexController.getEstrutura)

module.exports = router