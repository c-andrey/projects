const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    code: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    portions: Number,
    sizes: {
        type: [String],
    },
    colors: {
        type: [String],
    },
    image: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', ProductSchema)