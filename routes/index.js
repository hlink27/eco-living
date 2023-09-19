const path = require('path');
const express = require('express');
const indexController = require('../controller/index')
const isAuth = require('../middleware/is-auth')
const router = express.Router()

router.get('/', isAuth, indexController.getIndex)

module.exports = router