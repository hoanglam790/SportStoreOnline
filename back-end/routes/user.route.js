const express = require('express')
const { registerUser, verifyEmailUser, loginUser, logoutUser, uploadImageUser, 
        updateUser, forgotPassword, verifyForgotPasswordByOTP, resetPassword, 
        refreshTokenAPI, getUserToDisplay } = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/verify-email', verifyEmailUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', auth, logoutUser)
userRouter.put('/upload-image', auth, upload.single('avatar'), uploadImageUser)
userRouter.put('/update-user', auth, updateUser)
userRouter.put('/forgot-password', forgotPassword)
userRouter.put('/verify-forgot-password', verifyForgotPasswordByOTP)
userRouter.put('/reset-password', resetPassword)
userRouter.post('/refresh-token', refreshTokenAPI)
userRouter.get('/get-user', auth, getUserToDisplay)

module.exports = userRouter