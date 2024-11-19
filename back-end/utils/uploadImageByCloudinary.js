const cloudinary = require('cloudinary').v2
require('../config/cloudinaryConfig')

const uploadImageCloudinary = async (image) => {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'Images' },(error, uploadResult) => {
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadImage
}

module.exports = uploadImageCloudinary