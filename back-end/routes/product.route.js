const express = require('express')
const auth = require('../middleware/auth')
const { createNewProduct, 
        getAllProduct,
        getProductDetails,
        getProductByCategory,
        getProductByCateAndSubCate, 
        updateProduct,
        deleteProduct
    } = require('../controllers/product.controller')

const productRouter = express.Router()

productRouter.post('/', getAllProduct)
productRouter.post('/get-product-details', getProductDetails)
productRouter.post('/get-product-by-category', getProductByCategory)
productRouter.post('/get-product-by-cate-and-subcate', getProductByCateAndSubCate)

productRouter.post('/create-product', auth, createNewProduct)
productRouter.put('/update-product', auth, updateProduct)
productRouter.delete('/delete-product', auth, deleteProduct)

module.exports = productRouter