const mongoose = require("mongoose")
const User_schema = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    telephone:Number,
    isVerified:Boolean,
    isSeller:Boolean,
    isAdmin:Boolean,
    cart:[{type:mongoose.Types.ObjectId,ref:"products"}]
})
const User = mongoose.model("User",User_schema);
module.exports = User;