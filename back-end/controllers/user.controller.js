const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const resendEmail = require('../config/resendEmail')
const verifyEmail = require('../utils/verifyEmail')
const generateAccessToken = require('../utils/generateToken')
const generateRefreshAccessToken = require('../utils/generateRefreshToken')
const UploadImage = require('../utils/uploadImageByCloudinary')
const generateOtp = require('../utils/generateOTP')
const forgotPasswordTemp = require('../utils/forgotPasswordTemp')
require('dotenv').config()


{/** Đăng ký tài khoản mới */}
const registerUser = async (req,res) => {
    try {
        // req.body: chứa dữ liệu được gửi lên từ Client trong body của HTTP
        // Trích xuất các thuộc tính vào đối tượng req.body và gắn vào các biến riêng biệt
        const { name, email, password } = req.body
        
        // Kiểm tra dữ liệu đầu vào
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Vui lòng cung cấp đầy đủ thông tin ở các trường dữ liệu.'
            })
        }
        
        // Tìm email
        // Nếu email đã có trong cơ sở dữ liệu thì không cho đăng ký
        const user = await UserModel.findOne({ email })
        if(user) {
            return res.json({
                success: false,
                error: true,
                message: 'Địa chỉ email này đã được đăng ký. Vui lòng cung cấp email khác.'
            })
        }

        // Mã hóa mật khẩu bằng Bcrypt
        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password,salt)
        
        // Lưu lại mật khẩu đã được mã hóa
        const newUser = new UserModel({
            name,
            email,
            password: hashPassword
        })

        // Lưu vào cơ sở dữ liệu
        const save = await newUser.save()

        // Xác nhận email
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
        const verify_Email = await resendEmail({
            sendTo: email,
            subject: 'Xác nhận email từ Hoàng Lâm',
            html: verifyEmail(name, verifyEmailUrl)
        })

        // Thông báo lưu thành công
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
            message: error.message || error
        })
    }
}

{/** Xác thực tài khoản */}
const verifyEmailUser = async (req,res) => {
    try {
        const { code } = req.body

        // Kiểm tra mã code khi người dùng nhập vào
        const user = await UserModel.findOne({ _id: code })
        if(!user){
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Mã code không đúng.'
            })
        }

        // Cập nhật vào cơ sở dữ liệu
        const updateUser = await UserModel.updateOne({ _id: code },{
            verify_email: true
        })

        // Thông báo khi xác thực thành công
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Tài khoản đã được xác thực thành công.',
            data: updateUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Đăng nhập tài khoản vào hệ thống */}
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
                message: 'Mật khẩu bạn vừa nhập không đúng. Vui lòng kiểm tra lại'
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
            message: error.message || error
        })
    }
}

{/** Đăng xuất tài khoản khỏi hệ thống */}
const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id  // Lấy userId từ thông tin người dùng đã xác thực từ Token trong Middleware

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

        // Thông báo không tìm thấy dữ liệu
        if (!removeRefreshToken) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Không tìm thấy người dùng'
            }) 
        }

        // Thông báo khi đăng xuất thành công
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Đăng xuất thành công'
        }) 

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        }) 
    }
} 

{/** Đăng tải hình ảnh lên Cloudinary */}
const uploadImageUser = async (req,res) => {
    try {
        const userId = req.user.id // Middleware
        const image = req.file

        // Gọi hàm cập nhật hình ảnh
        const uploadImg = await UploadImage(image)

        // Nếu tìm thấy id thì thực hiện cập nhật hình ảnh vào cơ sở dữ liệu
        await UserModel.findByIdAndUpdate(userId, {
            avatar: uploadImg.url
        })

        // Thông báo lưu dữ liệu thành công
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
            message: error.message || error
        })
    }
}

{/** Cập nhật tài khoản */}
const updateUser = async (req, res) => {
    try {
        // const userId = req.user.id // Middleware auth
        const { _id, name, email, password, phone_number, role } = req.body
               
        let hashPassword = ''

        // Mã hóa mật khẩu
        if(password){
            const salt = await bcrypt.genSaltSync(10)
            hashPassword = await bcrypt.hashSync(password,salt)
        }

        // Thực hiện cập nhật vào dữ liệu
        const updateUser = await UserModel.updateOne({ _id: _id}, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(password && { password: hashPassword }),
            ...(phone_number && { phone_number: phone_number }),
            ...(role && { role: role })
        })

        // Thông báo khi cập nhật thành công
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Cập nhật tài khoản thành công',
            data: updateUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Quên mật khẩu */}
const forgotPassword = async (req,res) => {
    try {
        const { email } = req.body

        // Kiểm tra email có tồn tại hay không?
        // Thông báo lỗi khi không tìm thấy
        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Người dùng không tồn tại'
            })
        }

        // Tạo mã OTP và thời gian hiệu lực tương ứng
        const otpPass = await generateOtp()
        const expireTime = new Date(Date.now() + 30 * 60 * 1000) // Cộng thêm 30 phút vào thời gian hiện tại = Hết hạn: 30 phút

        // Thực hiện cập nhật dữ liệu dựa vào id
        await UserModel.findByIdAndUpdate(user._id, {
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

        // Gửi thông báo kiểm tra email cho người dùng khi xác thực đúng email
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Hãy kiểm tra email của bạn'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: false,
            message: error.message || error
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

        // Cập nhật vào cơ sở dữ liệu
        // Xác thực thành công => Reset mã OTP và hiệu lực về trạng thái ban đầu
        await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: '',
            forgot_password_expire: ''
        })

        return res.status(201).json({
            success: true,
            error: false,
            message: 'Mã OTP hợp lệ. Bạn đã xác thực thành công'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Khôi phục mật khẩu */}
const resetPassword = async (req,res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body

        // Kiểm tra dữ liệu đầu vào
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

        // Mã hóa mật khẩu bằng Bcrypt
        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(newPassword,salt)

        // Cập nhật vào cơ sở dữ liệu
        await UserModel.findOneAndUpdate(emailUser._id, {
            password: hashPassword
        })

        // Thông báo khi cập nhật dữ liệu thành công
        return res.status(201).json({
            success: true,
            error: false,
            message: 'Cập nhật dữ liệu thành công.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Tạo token API mới */}
const refreshTokenAPI = async (req,res) => {
    try {
        const refreshToken = req.body.refreshToken || req.cookies.refreshToken

        // Kiểm tra token
        if(!refreshToken){
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Không tìm thấy token hoặc token không hợp lệ'
            })
        }

        // Xác thực token
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

        // Tạo cookie
        res.cookie('accessToken', newToken, cookieOption)

        // Thông báo khi tạo mới token thành công
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
            message: error.message || error
        })
    }
}

{/** Hiển thị dữ liệu 1 tài khoản */}
const getUserToDisplay = async (req,res) => {
    try {
        // req.user.id (req.user: decoded at Middleware)
        // console.log('decoded', decoded) => decoded { id: '6736137ab916eaa4457a0f1c', iat: 1732157732, exp: 1734749732 }
        const userId = req.user.id // Dữ liệu lấy từ Middleware

        // Thông báo khi tìm thành công
        const getUser = await UserModel.findById(userId)
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lấy dữ liệu thành công',
            data: getUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

{/** Lấy dữ liệu tất cả các tài khoản hiện có - Admin */}
const getAllUsersToDisplay = async (req,res) => {
    try {
        // Tìm dữ liệu trong cơ sở dữ liệu
        const getAllUsers = await UserModel.find()

        // Thông báo khi tìm thấy
        return res.status(200).json({
            success: true,
            error: false,
            message: 'Lấy tất cả dữ liệu tài khoản thành công',
            data: getAllUsers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { registerUser, verifyEmailUser, loginUser, logoutUser, uploadImageUser, 
    updateUser, forgotPassword, verifyForgotPasswordByOTP, resetPassword, refreshTokenAPI, getUserToDisplay, getAllUsersToDisplay }