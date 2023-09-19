const path = require('path');
const express = require('express');
const authController = require('../controller/auth')
const isAdmin = require('../middleware/is-admin')
const isAuth = require('../middleware/is-auth')
const router = express.Router()

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

router.post('/logout', isAuth, authController.postLogOut)

module.exports = router