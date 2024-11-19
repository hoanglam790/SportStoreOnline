const express = require('express')
const auth = require('../middleware/auth')
const { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')

const categoryRouter = express.Router()

categoryRouter.get('/', getCategories)
categoryRouter.get('/:id', getCategoryByID)
categoryRouter.post('/create-category', auth, createCategory)
categoryRouter.put('/update-category', auth, updateCategory)
categoryRouter.delete('/:id', deleteCategory)

module.exports = categoryRouter