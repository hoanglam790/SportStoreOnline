const express = require('express')
const { auth } = require('../middleware/auth')
const { addSubCategoryController,
        getSubCategoryController,
        updateSubCategoryController,
        deleteSubCategoryController } = require('../controllers/subCategory.controller')

const subCategoryRouter = express.Router()

subCategoryRouter.get('/', getSubCategoryController)
subCategoryRouter.post('/create-sub-category', auth, addSubCategoryController)
subCategoryRouter.put('/update-sub-category', auth, updateSubCategoryController)
subCategoryRouter.delete('/delete-sub-category', auth, deleteSubCategoryController)

module.exports = subCategoryRouter