const express = require('express')
const router = express.Router()
const productRoute = require('./productRoute')
const formRoute = require('./formRoute')
const registerRoute = require('./registerRoute')
const loginRoute = require('./loginRoute')
const testmiddleware = require('../middlewares/test.middleware')

router.use('/product', testmiddleware, productRoute)
router.use('/form', testmiddleware, formRoute)
router.use('/register', testmiddleware, registerRoute)
router.use('/login', testmiddleware, loginRoute)




















module.exports = router