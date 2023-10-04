const path = require('path');
const express = require('express');
const userController= require('../controller/user')
const isAdmin = require('../middleware/is-admin')
const isAuth = require('../middleware/is-auth')
const router = express.Router()

router.get('/add-user', isAuth, isAdmin, userController.getAddUser)
router.post('/add-user', isAuth, isAdmin, userController.postAddUser)

router.get('/delete-user/:userId', isAuth, isAdmin, userController.postDelete)

router.get('/list-user', isAuth, isAdmin, userController.getListUser)

router.get('/edit-user/:userId', isAuth, isAdmin, userController.getEditUser)
router.post('/edit-user', isAuth, isAdmin, userController.postEditUser)

router.get('/reset-senha/:userId', isAuth, isAdmin, userController.resetPassword)

module.exports = router