const mongoose = require('mongoose');
const express = require("express");
const session = require("express-session")
const checkAuth = require('./middlewares/checkAuth')
const app = express();
const Product = require('./models/productModel');
app.use(express.static("uploads"));
app.use('/users',express.static('uploads'))
app.use('/seller',express.static('uploads'))
app.use('/admin',express.static('uploads'))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
app.use(express.static("public"));
app.use('/seller',express.static("pubic"))
app.use('/users',express.static("public"));
mongoose.connect("mongodb://localhost:27017/Ecommerce");
const signinRoute = require('./routes/Signin')
const signupRoute = require('./routes/Signup')
const verificationRoute = require('./routes/Verification')
const homeRoute = require('./routes/user');
const adminRoute = require('./routes/Admin')
const sellerRoute = require('./routes/Seller')
app.use('/signin',signinRoute);
app.use('/signup',signupRoute)
app.use('/verifyEmail',verificationRoute);
app.use('/users',homeRoute);
app.use('/admin',adminRoute)
app.use('/seller',sellerRoute)
app.get('/',checkAuth,(req,res)=>{
    if(req.session.isAdmin){
        res.redirect('/users/Admin');
    }
    else if(req.session.isSeller){
        res.redirect('/users/Seller');
    }
    else{
        res.redirect('/users/home');
    }
})
app.get('/sendata',(req,res)=>{
    var {id} = req.query;
    let c = Number(id);
    Product.find().limit(5).skip(5*c)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
app.listen('3000',()=>{
    console.log("Server Started At port 3000")
})

