const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('cart', cartSchema)