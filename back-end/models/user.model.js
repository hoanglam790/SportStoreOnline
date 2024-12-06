const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng cung cấp tên của bạn']
    },
    email: {
        type: String,
        required: [true, 'Vui lòng cung cấp địa chỉ email của bạn'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Vui lòng cung cấp mật khẩu']
    },
    avatar: {
        type: String,
        default: ''
    },
    phone_number: {
        type: Number,
        default: null
    },
    address: {
        type: String,
        default: ''
    },
    refresh_token: {
        type: String,
        default: ''
    },
    verify_otp: {
        type: String,
        default: null
    },
    verify_otp_expire: {
        type: Date,
        default: ''
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
        default: ''
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active'
    },
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expire: {
        type: Date,
        default: ''
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    // user_id: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'Product'
    //     }
    // ]
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)