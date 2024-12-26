const mongoose = require('mongoose')

const deliveryAddressDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
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
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('deliveryAddressDetails', deliveryAddressDetailSchema)