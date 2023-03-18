const mongoose = require("mongoose")
const Product_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageLink:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    quantity:Number,
    SellerId:{
        type:String,
        required:true
    }
})
const Product = mongoose.model('Product',Product_schema);
module.exports = Product;