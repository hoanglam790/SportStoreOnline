const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    totalAmount: {
        type: Number,
        default: null
    },
    totalQuantity: {
        type: Number,
        default: null
    },
    deliveryAddress: {
        type: String,
        default: ''
    },
    paymentMethod: {
        type: String,
        default: 'Thanh toán bằng tiền mặt'
    },
    status: {
        type: String,
        enum: ['Chờ xử lý', 'Đã xác nhận', 'Đang giao hàng', 'Đã hủy đơn hàng', 'Đã thanh toán'],
        default: 'Chờ xử lý'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('order', orderSchema)