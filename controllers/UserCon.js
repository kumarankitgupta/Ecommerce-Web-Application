const userServices = require('../services/userServices')
const findTheProduct = (req,res)=>{
        userServices.findProductFromDb()
        .then((data)=>{
            res.render('root',{name:req.session.username,arr:data,count :0})
        })
        .catch((err)=>{
            console.log(err);
        })
}
const addToCart = (req,res)=>{
    const { id } = req.query;
    const userId = req.session.dbuid;
    userServices.addCartToDb(id,userId)
    .then((data)=>{
        console.log(data)
        if(data.matchedCount == 0){
            userServices.saveTocart(req.session.dbuid,id,1);
            console.log("saved");
        }
        res.send("Working")
    })
    .catch((err)=>{
        console.log("Errors")
        res.send("errors")
    })
}


const fetchMyCart =(req,res)=>{
    const userId = req.session.dbuid;
    userServices.fetchMyCartDb(userId)
    .then((data)=>{
        res.render('cart',{name:req.session.username,arr:data})
    })
    .catch((err)=>{
        console.log('error')
        res.send("Error Fetching Please Try Again later")
    })
}

const incCart = (req,res)=>{
    const {id} = req.query;
    console.log(id)
    userServices.incCartDb(id)
    .then((data)=>{
        console.log(data)
        if(data.modifiedCount === 0){
            res.send('Error')
        }else{
            res.send('Success')
        }
    })
    .catch((err)=>{
        console.log('error')
        res.send('error')
    })
}

const decCart = (req,res)=>{
    const {id} = req.query;
    console.log(id)
    userServices.decCartDb(id)
    .then((data)=>{
        console.log(data)
        if(data.modifiedCount === 0){
            res.send('Error')
        }else{
            res.send('Success')
        }
    })
    .catch((err)=>{
        console.log('error')
        res.send('error')
    })
}

const deleteFromCart = (req,res)=>{
    const {id} = req.query;
    userServices.deleteFromCartdb(id)
    .then((data)=>{
        if(data.deletedCount === 0){
            res.send('error');
        }else{
            res.redirect('/users/mycart')
        }
    })
    .catch((err)=>{
        res.send('error');
    })
}
const findMyOrders = (req,res)=>{
    const userId = req.session.dbuid;
    userServices.findMyOrdersDb(userId)
    .then((data)=>{
        res.render('Myorders',{name:req.session.username,arr:data})
    })
    
}

const placeOrder = (req,res)=>{
    const ad = req.body;
    console.log(ad);
    const userId = req.session.dbuid;
    userServices.fetchMyCartDb(userId)
    .then((data)=>{
        for(let i = 0 ; i < data.length; i++){
            userServices.saveToOrders(data[i],ad);
        }
    })
    userServices.deleteCart(userId)
    .then((data)=>{
        console.log(data)
    })
    res.render("message")
}

const showAddressPage = (req,res)=>{
    res.render('Address')
}

const showChangePass = (req,res)=>{
    res.render('ChangePassword')
}

const showSeller = (req,res)=>{
    res.render("Seller",{name:req.session.username})
}

const showAdmin = (req,res)=>{
    const name = req.session.username
    res.render("Admin.ejs",{name:name})
}

const showForget = (req,res)=>{
    res.render('Forget')
}

const handleForget = (req,res)=>{
    const x = req.body;
    req.session.forgotEmail = x.email;
    req.session.feRequest = true;
    forgotEmail(req.session.forgotEmail,(err,data)=>{
        if(err){
            res.send("Something went wrong")
        }else{
            res.render('EmailSent')
        }
    })
}
const showForgetpass = (req,res)=>{
    res.render('forgetpass')
}

const changepassword =(req,res)=>{
    console.log(req.session.username);
    let {pass,cpass} = req.body;
    const username = req.session.username;
    if(pass === cpass){
        userServices.updatePassdb(username,cpass)
        .then((result)=>{
            if(result.modifiedCount === 1)
            console.log("changed SuccessFully")
        })
        .catch((err)=>{
            res.send('Something Went Wrong')
        })
    }
    req.session.destroy();
    res.redirect('/signin')
}

const forgotchangepassword = (req,res)=>{
    let {pass,cpass} = req.body;
    const username = req.session.forgotEmail
    if(pass === cpass){
        userServices.updatePassdb(username,cpass)
        .then((result)=>{
            if(result.modifiedCount === 1){
                console.log("changed SuccessFully")
                req.session.destroy();
                res.redirect('/signin')
            }else{
                req.session.destroy();
                res.send("Something Went Wrong")
            }
        })
        .catch((err)=>{
            res.send('Something Went Wrong')
        })
    }
}


module.exports = {findTheProduct,addToCart,fetchMyCart,incCart,decCart,
deleteFromCart,findMyOrders,placeOrder,showAddressPage,showChangePass,
showSeller,showAdmin,showForget,handleForget,showForgetpass,changepassword,
forgotchangepassword};












