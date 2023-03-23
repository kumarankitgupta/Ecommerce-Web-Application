const savetheproduct = require('../services/Authentication');
const { updateTheProductDb, recieveTheOrderDb, getMyProductDb, deleteMyProductDb, savetheproductdb } = require('../services/sellerServices');
const addtheProduct =(req,res)=>{
    let x = req.body;
    x.image = req.file.filename
    x.sellerId = req.session.SellerId;
    savetheproductdb(x)
    if(req.session.isAdmin){
        res.redirect('/admin/ProductDescription');   
    }else{
        res.redirect('/seller/myproducts')
    }  
}
const updateTheproduct = (req,res)=>{
    const {id} = req.query;
    const x = req.body;
    updateTheProductDb(id,x)
    .then((data)=>{
        if(req.session.isAdmin)
        res.redirect('/ProductDescription')
        else
        res.redirect('/seller/myproducts')
    })
    .catch((err)=>{
        console.log("Error")
        res.send("Something went wrong")
    })
}

const recieveTheOrder = (req,res)=>{
    console.log(req.session.SellerId)
    const id = req.session.SellerId;
    recieveTheOrderDb(id)
    .then((data)=>{
        console.log(data)
        res.render('RecieveOrders',{name:req.session.username,arr:data})
    })
}
const getMyProduts = (req,res)=>{
    const sid = req.session.SellerId
    getMyProductDb(sid)
    .then((data)=>{
        console.log(data);
        res.render('sellerPm',{name:req.session.username,arr:data})
    })
    .catch((err)=>{
        console.log("Error Occured")
    })
}

const deleteMyProduct = (req,res)=>{
    const {id} = req.query;
    console.log(id)
    deleteMyProductDb(id)
    .then((data)=>{
        console.log(data.deletedCount)
        res.redirect('/myproducts');
    })
    .catch((err)=>{
        console.log(err)
        res.send("Error occurred")
    })
}

module.exports = {addtheProduct,updateTheproduct,recieveTheOrder,getMyProduts,deleteMyProduct};