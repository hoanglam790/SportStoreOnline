const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    subCateName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    Category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        }
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('subCategory', subCategorySchema)