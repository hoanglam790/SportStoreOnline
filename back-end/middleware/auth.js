const jwt = require('jsonwebtoken')
require('dotenv').config()

// Middleware xác thực refresh token
const auth = async(req, res, next) => {
    try {
        const token = req?.body?.refreshToken || req?.cookies?.refreshToken 

        if (!token) {
            return res.status(401).json({
                success: false,
                error: true,
                //message: 'Không tìm thấy token hoặc token đã hết hạn'
                message: 'Vui lòng đăng nhập để thực hiện chức năng này'
            }) 
        }

        // Xác thực refresh token
        jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN, (error, decoded) => {
            if(error) {
                return res.status(403).json({
                    success: false,
                    error: true,
                    message: 'Refresh token không hợp lệ'
                }) 
            }

            // req.user chứa thông tin người dùng đã giải mã từ token JWT trong Middleware.
            // Lưu thông tin user từ token vào request object để sử dụng trong các bước tiếp theo.
            // 'decoded' chứa payload của token (thông tin người dùng) & Lưu thông tin người dùng vào req.user
            req.user = decoded  
            next()  // Tiến hành vào bước tiếp theo (route handler)
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        }) 
    }
}

const checkLogin = async(req, res, next) => {
    try {
        const token = req?.body?.refreshToken || req?.cookies?.refreshToken
        if(token){
            jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN, (error, decoded) => {
                if (error) {
                    return res.status(403).json({
                        success: false,
                        error: true,
                        message: 'Refresh token không hợp lệ'
                    }) 
                }   
                // req.user chứa thông tin người dùng đã giải mã từ token JWT trong Middleware.
                // Lưu thông tin user từ token vào request object để sử dụng trong các bước tiếp theo.
                // 'decoded' chứa payload của token (thông tin người dùng) & Lưu thông tin người dùng vào req.userId
                req.user = decoded
                return next()  // Tiến hành vào bước tiếp theo (route handler)
            })
        }
        else{
            next()
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message
        })
    }
}

module.exports = { auth, checkLogin } 