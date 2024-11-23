const express = require('express')
const auth = require('../middleware/auth')
const { uploadImageController, checkImageCloudinaryController } = require('../controllers/uploadImage.controller')
const upload = require('../middleware/multer')

const uploadImageRouter = express.Router()

uploadImageRouter.post('/upload-image', auth, upload.single('image'), uploadImageController)
uploadImageRouter.get('/check-image', auth, checkImageCloudinaryController)

module.exports = uploadImageRouter