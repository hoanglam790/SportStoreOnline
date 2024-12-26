const express = require('express')
const { auth } = require('../middleware/auth')
const { getCategoryController, 
        getCategoryByIdController, 
        createCategoryController, 
        updateCategoryController, 
        deleteCategoryController } = require('../controllers/category.controller')

const categoryRouter = express.Router()

categoryRouter.get('/', getCategoryController)
categoryRouter.get('/get-category-by-id', getCategoryByIdController)
categoryRouter.post('/create-category', auth, createCategoryController)
categoryRouter.put('/update-category', auth, updateCategoryController)
categoryRouter.delete('/delete-category',auth, deleteCategoryController)

module.exports = categoryRouter