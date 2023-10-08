const express = require('express')
const productController = require('../controllers/productController')

const productRouter = express.Router()

productRouter.get('', productController.getAll)
productRouter.get('/:id', productController.getById)
productRouter.post('/search', productController.getByType)
productRouter.post('/sale', productController.getBySale)
productRouter.post('/searchCategory', productController.search)
productRouter.post('', productController.post)
productRouter.put('/:id', productController.put)
productRouter.delete('/:id', productController.delete)

module.exports = productRouter 