const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('cartItem', cartItemSchema)