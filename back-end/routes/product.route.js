const express = require('express')
const { auth } = require('../middleware/auth')
const { createNewProduct, 
        getAllProduct,
        getProductDetails,
        getProductByCategory,
        getProductByCateAndSubCate, 
        updateProduct,
        updateQuantityInStock,
        updateProductWarehouse,
        deleteProduct
    } = require('../controllers/product.controller')

const productRouter = express.Router()
// Lấy danh sách sản phẩm hiển thị trên giao diện website
productRouter.post('/', getAllProduct)
productRouter.post('/get-product-details', getProductDetails)
productRouter.post('/get-product-by-category', getProductByCategory)
productRouter.post('/get-product-by-cate-and-subcate', getProductByCateAndSubCate)

// Chức năng: thêm, sửa, xóa bên trang Admin
productRouter.post('/create-product', auth, createNewProduct)
productRouter.put('/update-product', auth, updateProduct)
productRouter.put('/update-quantity-in-stock', auth, updateQuantityInStock)
productRouter.put('/update-product-warehouse', auth, updateProductWarehouse)
productRouter.delete('/delete-product', auth, deleteProduct)

module.exports = productRouter