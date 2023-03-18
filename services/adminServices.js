const User = require('../models/userModel')
const Product = require('../models/productModel')
function saveTheSeller(x){
    const user = new User({
    username:x.username,
    name:x.name,
    password:x.password,
    email:x.email,
    telephone:x.telephone,
    isVerified:false,
    isAdmin:false,
    isSeller:true,
    cart:[]
});
user.save();
}
async function deleteFromDbAdmin(id){
    try{
        const data = await Product.deleteOne({_id:id})

        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
async function getAllProdDb(){
    try{
        const data = await Product.find()
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function UpadteAdminDb(id,x){
    try{
        const data = await Product.updateOne({_id:id},{name:x.productName,detail:x.productDesc,quantity:x.productQty,price:x.productPrice})
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

module.exports = {saveTheSeller,UpadteAdminDb,deleteFromDbAdmin,getAllProdDb}

