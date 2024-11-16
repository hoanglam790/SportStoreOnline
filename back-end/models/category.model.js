const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    cateName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)