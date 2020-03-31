const router = require('express').Router()
const user = require('../controller/userController')

router.post('/googleSign', user.googleSign)

module.exports = router