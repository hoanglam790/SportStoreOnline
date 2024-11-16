const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const resendEmail = require('../config/resendEmail')
const verifyEmail = require('../utils/verifyEmail')
const generateAccessToken = require('../utils/generateToken')
const generateRefreshAccessToken = require('../utils/generateRefreshToken')
const UploadImage = require('../utils/uploadImage')
const generateOtp = require('../utils/generateOTP')
const forgotPasswordTemp = require('../utils/forgotPasswordTemp')
require('dotenv').config()


// Đăng ký tài khoản
const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body
        
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ thông tin ở các trường dữ liệu.'
            })
        }
        
        const user = await UserModel.findOne({ email })
        if(user) {
            return res.json({
                success: false,
                error: true,
                message: 'Địa chỉ email này đã được đăng ký. Vui lòng cung cấp email khác.'
            })
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password,salt)
        
        // Lưu lại mật khẩu đã được mã hóa
        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
        const verify_Email = await resendEmail({
            sendTo: email,
            subject: 'Xác nhận email từ Hoàng Lâm',
            html: verifyEmail(name, verifyEmailUrl)
        })

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Đăng ký tài khoản thành công',
            data: save
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}

// Xác thực tài khoản
const verifyEmailUser = async (req,res) => {
    try {
        const { code } = req.body

        const user = await UserModel.findOne({ _id: code })
        if(!user){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Mã code không đúng.'
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code },{
            verify_email: true
        })

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Tài khoản đã được xác thực thành công.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}

// Đăng nhập
const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body

        // Kiểm tra người dùng có nhập vào tài khoản và mật khẩu chưa?
        // Nếu chưa thì hiển thị thông báo
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ thông tin ở các trường dữ liệu.'
            })
        }

        // Kiểm tra địa chỉ email đã tồn tại hay chưa?
        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Tài khoản này chưa được đăng ký'
            })
        }

        // Kiểm tra tình trạng hoạt động của tài khoản: Active - cho phép đăng nhập, Inactive + Suspended - từ chối
        if(user.status != 'Active'){
            return res.status(402).json({
                success: false,
                error: true,
                message: 'Tài khoản hiện tại không thể đăng nhập. Vui lòng liên hệ Admin để được hỗ trợ'
            })
        }

        // Kiểm tra mật khẩu trước khi đăng nhập
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Sai mật khẩu. Vui lòng kiểm tra lại'
            })
        }


        // Tạo token
        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshAccessToken(user._id)

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        res.cookie('accessToken', accessToken, cookieOption)
        res.cookie('refreshToken', refreshToken, cookieOption)

        // Cập nhật ngày đăng nhập gần nhất
        await UserModel.findOneAndUpdate(user._id, {
            last_login: Date.now()
        })

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Đăng nhập thành công',
            data: {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}


// Đăng xuất tài khoản
const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id  // Lấy userId từ thông tin người dùng đã xác thực từ Token trong Middleware.

        // Cấu hình cookie options
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        } 

        // Xóa cookie refresh token và access token
        res.clearCookie('accessToken', cookieOption) 
        res.clearCookie('refreshToken', cookieOption) 

        // Cập nhật cơ sở dữ liệu để xóa refresh token của người dùng
        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: ''
        }) 

        if (!removeRefreshToken) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Không tìm thấy người dùng'
            }) 
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Đăng xuất thành công'
        }) 

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        }) 
    }
} 

// Đăng tải hình ảnh lên Cloudinary
const uploadImageUser = async (req,res) => {
    try {
        const userId = req.user.id
        const image = req.file

        const uploadImg = await UploadImage(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: uploadImg.url
        })

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Tải hình ảnh thành công',
            data: {
                _id: userId,
                avatar: uploadImg.url
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}


// Cập nhật người dùng
const updateUser = async (req, res) => {
    try {
        const userID = req.user.id // Middleware auth
        const { name, email, password, phone_number } = req.body
        
        let hashPassword = ''
        if(password){
            const salt = await bcrypt.genSaltSync(10)
            hashPassword = await bcrypt.hashSync(password,salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userID }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(password && { password: hashPassword }),
            ...(phone_number && { phone_number: phone_number })
        })

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Cập nhật người dùng thành công',
            data: updateUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}

// Quên mật khẩu
const forgotPassword = async (req,res) => {
    try {
        const { email } = req.body

        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Người dùng không tồn tại'
            })
        }

        const otpPass = await generateOtp()
        const expireTime = new Date(Date.now() + 30 * 60 * 1000) // Cộng thêm 30 phút vào thời gian hiện tại = Hết hạn: 30 phút

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otpPass,
            forgot_password_expire: new Date(expireTime).toISOString()
        })

        // Gửi email xác nhận
        await resendEmail({
            sendTo: email,
            subject: 'Quên mật khẩu từ Hoang Lam',
            html: forgotPasswordTemp({
                name: user.name,
                otp: otpPass
            })
        })

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Hãy kiểm tra email của bạn'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: false,
            message: 'Lỗi server'
        })
    }
}

const verifyForgotPasswordByOTP = async (req,res) => {
    try {
        const { email, otp } = req.body
        if(!email || !otp){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
            })
        }

        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Không tìm thấy email người dùng'
            })
        }

        // Kiểm tra hiệu lực của mã OTP
        const expireTime = new Date(user.forgot_password_expire)
        const currentTime = new Date().toISOString()
        if(expireTime < currentTime){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Mã OTP bạn vừa nhập đã hết hạn'
            })
        }

        // Kiểm tra mã OTP do người dùng nhập
        if(user.forgot_password_otp !== otp){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Mã OTP bạn vừa nhập không đúng'
            })
        }

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Mã OTP hợp lệ. Bạn đã xác thực thành công'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}

// Khôi phục mật khẩu
const resetPassword = async (req,res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body
        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ các trường dữ liệu'
            })
        }

        // Kiểm tra email có tồn tại hay chưa?
        const emailUser = await UserModel.findOne({ email })
        if(!emailUser){
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Email không tồn tại'
            })
        }

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có trùng với nhau hay không?
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Mật khẩu không trùng khớp với nhau. Vui lòng thử lại...'
            })
        }

        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(newPassword,salt)

        // Cập nhật vào cơ sở dữ liệu
        await UserModel.findOneAndUpdate(emailUser._id, {
            password: hashPassword
        })

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Cập nhật dữ liệu thành công.'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}

// Refresh token API
const refreshTokenAPI = async (req,res) => {
    try {
        const refreshToken = req.body.refreshToken || req.cookies.refreshToken
        if(!refreshToken){
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Không tìm thấy token hoặc token không hợp lệ'
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verifyToken){
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Token đã hết hạn'
            })
        }

        //console.log('verifyToken', verifyToken)
        const userID = verifyToken?._id
        const newToken = await generateAccessToken(userID)

        // Cấu hình cookie options
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        res.cookie('accessToken', newToken, cookieOption)

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Access Token mới đã được tạo.',
            data: {
                accessToken: newToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Lỗi server'
        })
    }
}

module.exports = { registerUser, verifyEmailUser, loginUser, logoutUser, uploadImageUser, 
    updateUser, forgotPassword, verifyForgotPasswordByOTP, resetPassword, refreshTokenAPI }