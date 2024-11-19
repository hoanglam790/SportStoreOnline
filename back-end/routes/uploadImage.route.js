const express = require('express')
const auth = require('../middleware/auth')
const uploadImageController = require('../controllers/uploadImage.controller')
const upload = require('../middleware/multer')

const uploadImageRouter = express.Router()

uploadImageRouter.post('/upload-image', auth, upload.single('image'), uploadImageController)

module.exports = uploadImageRouter