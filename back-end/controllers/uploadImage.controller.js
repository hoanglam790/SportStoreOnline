const uploadImageCloudinary = require('../utils/uploadImageByCloudinary')
const axios = require('axios')
require('dotenv').config()

const uploadImageController = async(req,res) => {
    try {
        const file = req.file
        
        const uploadImg = await uploadImageCloudinary(file)
        return res.status(201).json({
            success: true,
            error: false,
            message: "Tải hình ảnh thành công",
            data: uploadImg
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

{/** Kiểm tra ảnh trên Cloudinary */}
const checkImageCloudinaryController = async(req,res) => {
    const { public_id } = req.query  // Lấy public_id từ query string

    try {
        const cloudinaryApiUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload`

        const response = await axios.get(cloudinaryApiUrl, {
            params: { public_id },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64')}`
            }
        })

        if (response.data.resources && response.data.resources.length > 0) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Hình ảnh đã tồn tại trên Cloudinary",
                data: response.data.resources[0] // Trả về thông tin ảnh
            })
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Không tìm thấy ảnh với public_id này"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            exists: false,
            message: error.message
        })
    }
}

module.exports = { uploadImageController, checkImageCloudinaryController } 