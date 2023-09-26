const path = require('path');
const express = require('express');
const userController= require('../controller/user')
const isAdmin = require('../middleware/is-admin')
const isAuth = require('../middleware/is-auth')
const router = express.Router()

router.get('/add-user', isAuth, isAdmin, userController.getAddUser)
router.post('/add-user', isAuth, isAdmin, userController.postAddUser)

router.get('/list-user', isAuth, isAdmin, userController.getListUser)

module.exports = router