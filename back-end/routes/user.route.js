const express = require('express')
const { registerUser, verifyEmailUser, loginUser, logoutUser, uploadImageUser, 
    updateUser, forgotPassword, verifyForgotPasswordByOTP, resetPassword, refreshTokenAPI } = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const upload = require('../middleware/multer')

const router = express.Router()

router.post('/register', registerUser)
router.post('/verify-email', verifyEmailUser)
router.post('/login', loginUser)
router.post('/logout', auth, logoutUser)
router.put('/upload-image', auth, upload.single('avatar'), uploadImageUser)
router.put('/update-user', auth, updateUser)
router.put('/forgot-password', forgotPassword)
router.put('/verify-forgot-password', verifyForgotPasswordByOTP)
router.put('/reset-password', resetPassword)
router.post('/refresh-token', refreshTokenAPI)

module.exports = router