const path = require('path');
const express = require('express');
const mgmtController = require('../controller/management')
/* const isAuth = require('../middleware/is-auth') */
const router = express.Router()

router.get('/add-unidade', mgmtController.getAddUnidade)

module.exports = router