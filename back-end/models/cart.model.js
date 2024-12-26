const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('cart', cartSchema)