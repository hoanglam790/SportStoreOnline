const express = require('express')
const auth = require('../middleware/auth')
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')

const categoryRouter = express.Router()

categoryRouter.get('/', getCategories)
categoryRouter.get('/getCateById', getCategoryById)
categoryRouter.post('/create-category', auth, createCategory)
categoryRouter.put('/update-category', auth, updateCategory)
categoryRouter.delete('/delete-category',auth, deleteCategory)

module.exports = categoryRouter