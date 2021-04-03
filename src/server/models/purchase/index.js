const {model, Schema} = require('mongoose');

const purchase = new Schema({
    date: Date,
    products: Array,
    total: Number,
    tax: Number,
    totalPurchase: Number
})

module.exports = model('purchase', purchase)