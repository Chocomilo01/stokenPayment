const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const authenticate = require('../middlewares/auth.middleware')




router.post('/',  productController.createProduct)
router.get('/:id', productController.fetchOneProduct)
router.patch('/:id', productController.updateProduct)
router.get('/', productController.fetchProducts)
router.delete('/:id', productController.deleteProduct)

module.exports = router