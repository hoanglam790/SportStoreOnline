const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    total_amount: {
        type: Number,
        default: null
    },
    total_quantity: {
        type: Number,
        default: null
    },
    delivery_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'deliveryAddressDetails'
    },
    payment_method: {
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