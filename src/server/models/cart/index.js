const {Schema, model} = require('mongoose')

const Cart = new Schema({
    
    name: String,
    description: String,
    image: String,
    unitPrice: Number,
    quantity: Number,
    totalPrice: Number,
    modify:{
        type: Boolean,
        default: false
    }

})

module.exports = model('cart', Cart)