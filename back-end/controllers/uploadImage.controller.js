const uploadImageCloudinary = require('../utils/uploadImageByCloudinary')

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
            message: error.message || error
        })
    }
}

module.exports = uploadImageController