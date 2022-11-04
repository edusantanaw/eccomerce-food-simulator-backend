const mongoose = require('../db/db')
const {Schema} = require('mongoose')

const Order = mongoose.model(
    "Order",
    new Schema({
        product: {
          type: String,
          required: true
        },
        status:{
            type: String,
            default:'pedding',
        },
        numberOrder: {
            type: Number,
            required: true
        },
        client: {
            type: String,
            required: true
        }
    }) 
)

module.exports = Order