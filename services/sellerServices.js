const Order = require('../models/orderModel')
const Product = require('../models/productModel')
function savetheproductdb(x){
    const prod = new Product({
        name:x.productName,
        imageLink:x.image,
        price:x.productPrice,
        detail:x.productDesc,
        quantity:x.productQty,
        SellerId:x.sellerId
    })
    prod.save();
}
async function updateTheProductDb(id,x){
    try{
        const data = await Product.updateOne({_id:id},{name:x.productName,detail:x.productDesc,quantity:x.productQty,price:x.productPrice})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }

}
async function recieveTheOrderDb(id){
    try{
        const data = await Order.find()
        .populate({
            path: 'userId',
            select: "-_id -__v -password -isVerified -isSeller -cart -isAdmin -username"
        })
        .populate({
            path: 'productId',
            match: { SellerId: {"$eq":id}},
        })
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function getMyProductDb(id){
    try{
        const data = await  Product.find({SellerId:id})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}

async function deleteMyProductDb(id){
    try{
        const data = await  Product.deleteOne({_id:id})
        if(!data) throw new Error('Error');
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
module.exports = {savetheproductdb,updateTheProductDb,getMyProductDb,deleteMyProductDb,recieveTheOrderDb}