const mongoose = require('mongoose')

const orderDetailSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },

    // Tổng tiền cho từng sản phẩm (quantity * price)
    total: {
        type: Number,
        default: null
    }
},{
    timestamps: true
})

module.exports = mongoose.model('orderDetail', orderDetailSchema)