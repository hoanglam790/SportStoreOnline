const express = require('express')
const { registerUser, sendVerifyEmailOtp, verifyEmailUser, loginUser, logoutUser, uploadImageUser, 
        updateUser, forgotPassword, verifyForgotPasswordByOTP, resetPassword, 
        refreshTokenAPI, getUserToDisplay, getAllUsersToDisplay } = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', auth, logoutUser)
userRouter.post('/send-verify-otp', sendVerifyEmailOtp)
userRouter.post('/verify-email', verifyEmailUser)
userRouter.put('/upload-image', auth, upload.single('avatar'), uploadImageUser)
userRouter.put('/update-user', auth, updateUser)
userRouter.put('/forgot-password', forgotPassword)
userRouter.put('/verify-forgot-password', verifyForgotPasswordByOTP)
userRouter.put('/reset-password', resetPassword)
userRouter.post('/refresh-token', refreshTokenAPI)
userRouter.get('/get-user', auth, getUserToDisplay)
userRouter.get('/get-all-users', auth, getAllUsersToDisplay)

module.exports = userRouter