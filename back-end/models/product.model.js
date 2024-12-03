const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    quantity_in_stock: {
        type: Number,
        default: null
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory'
        }
    ],
    publish: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
})


// Tạo index
productSchema.index({
    name: 'text',
    description: 'text'
},{
    name: 10,
    description: 5
})

module.exports = mongoose.model('product', productSchema)