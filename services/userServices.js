const Product = require('../models/productModel')
const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
async function findProductFromDb(){
    try{
        const Prodarr = await  Product.find().limit(5)
        if(!Prodarr) throw new Error('Error while getting product.');
        return Prodarr;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
async function addCartToDb(id,userId){
    try{
        const data = await Cart.updateOne({"$and":[{productId:id,userId:userId}]},{"$inc":{quantity:1}})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
    
}
async function findMyOrdersDb(userId){
    try{
        const data = await  Order.find({userId:userId}).populate('productId')
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

function saveTocart(uid,pid,quantity){
    const cart = new Cart({
        productId:pid,
        userId:uid,
        quantity:quantity
    })
    cart.save();
}
function saveTheUsers(x){
    const user = new User({
    username:x.username,
    name:x.name,
    password:x.password,
    email:x.email,
    telephone:x.telephone,
    isVerified:false,
    isAdmin:false,
    isSeller:false,
    cart:[]
});
user.save();
}
function saveToOrders(data,ad){
    const order = new Order({
        userId:data.userId,
        productId:data.productId,
        quantity:data.quantity,
        street:ad.street,
        city:ad.city,
        state:ad.state,
        zip:ad.zip
    })
    order.save();
}


async function fetchMyCartDb(userId){
    try{
        const data = await Cart.find({userId:userId}).populate('productId')
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
async function incCartDb(id){
    try{
        const data = await Cart.updateOne({_id:id},{"$inc":{quantity:1}})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
    
}

async function decCartDb(id){
    try{
        const data = await Cart.updateOne({_id:id},{"$inc":{quantity:-1}})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
    
}
async function deleteFromCartdb(id){
    try{
        const data = await Cart.deleteOne({_id:id})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
    
}

async function deleteCart(userId){
    try{
        const data = await Cart.deleteMany({userId:userId})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function updatePassdb(username,cpass){
    try{
        const data = await User.updateOne({username:username},{password:cpass})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

module.exports = {findProductFromDb,addCartToDb,saveTocart,saveTheUsers,saveToOrders,fetchMyCartDb,incCartDb
,decCartDb,deleteFromCartdb,findMyOrdersDb,deleteCart,updatePassdb
};