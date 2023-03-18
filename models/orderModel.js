const mongoose = require('mongoose');
const Orders_Schema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true
    },
        street:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zip:{
            type:Number,
            required:true
        },
})
const Order = mongoose.model("Order",Orders_Schema);
module.exports = Order;