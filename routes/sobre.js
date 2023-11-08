const path = require('path');
const express = require('express');
const abtController = require('../controller/about')
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')
const router = express.Router()

router.get('/sobre', isAuth, abtController.getAbout)

module.exports = router