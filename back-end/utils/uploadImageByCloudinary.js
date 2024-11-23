const cloudinary = require('cloudinary').v2
require('../config/cloudinaryConfig')

const uploadImageCloudinary = async (image) => {
    // Lấy tên file từ ảnh
    const fileName = image?.originalname || 'default_name'
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    // Sử dụng tên file làm public_id khi upload lên Cloudinary
    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
        {   
            folder: 'Images', // Thư mục chứa hình ảnh
            public_id: fileName.split('.')[0], // Lấy tên ảnh làm public_id trước dấu .
            resource_type: 'image' // Chỉ cho phép tải file có đuôi định dạng là hình ảnh, ví dụ: jpeg, jpg, png,...
        },           
        (error, uploadResult) => {
            if(error){
                return reject(error)
            }
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadImage
}

module.exports = uploadImageCloudinary