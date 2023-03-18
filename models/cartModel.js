const mongoose = require("mongoose")
const Cart_Schema = new mongoose.Schema({
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
    }
})
const Cart = mongoose.model("Cart",Cart_Schema);
module.exports = Cart;