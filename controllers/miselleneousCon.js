const authServices = require('../services/Authentication');
const { saveTheUsers } = require('../services/userServices');
const verifyEmail = require("../methods/sendEmail")
const {verification} = require('../services/Authentication')
const showSignUp = (req,res)=>{
    res.render('signup',{info:null})
}
const saveNewusers = (req,res)=>{
    let x = req.body;
    const username = x.username;
    x.isVerified = false;
    console.log(x);
    authServices.findOneuser(username)
    .then((udata)=>{
        console.log(udata)
        if(udata){
            if(udata.email === x.email){
                res.send("Email and Username Already Exist");
            }else{
                res.send("Username Already exist");
            }
        }else{
            saveTheUsers(x);
            req.session.email = x.email;
            req.session.username = x.username;
            res.redirect('/verifyEmail');
        }
    })
    .catch((error) => {
        console.log(error);
       res.send(400, "Bad Request");
   });
}

const signin = (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    authServices.findOneuser(username)
    .then((foundUser) => {
        if(foundUser){
            if(foundUser.password === password){
                req.session.islogged_in = true;
                req.session.username = username;
                req.session.dbuid = foundUser._id;
                console.log(req.session.dbuid)
                if(foundUser.isAdmin === true){
                    req.session.isAdmin = true;
                    req.session.SellerId = foundUser._id;
                    res.redirect('/users/Admin')
                }else if(foundUser.isSeller){
                    req.session.isSeller = true;
                    req.session.SellerId = foundUser._id;
                    console.log(req.session.SellerId)
                    res.redirect('/users/Seller')
                }else{
                    res.redirect('/users/home')
                }
            }else{
                res.render('signin',{info : "Invalid Password Try again"})
            }
        }else{
            res.render('signin',{info : "No Users Exists!"})
        }
   })
   .catch((error) => {
        console.log(error);
       res.send(400, "Bad Request");
   });
}

const showSignIn = (req,res)=>{
    res.render('signin',{info:null});
}


const emailVerification = (req,res)=>{
    const otp = generateOtp();
    req.session.currotp = otp;
    verifyEmail(req.session.email,otp,(err,data)=>{
        if(err){
            res.send("Something Went Wrong")
        }else{
            res.render('otp');
        }
    })
}
function generateOtp(){
    return ("" + Math.random()).substring(2,8);
}

const setVerified = (req,res)=>{
    if(req.session.currotp === req.body.otp){
        const email = req.session.email;
        verification(email)
        .then((result)=>{
            console.log(result)
            req.session.islogged_in = true;
            req.session.isVerified = true;
            res.redirect('/');
        })
        .catch((err)=>{
            res.send("Something Went Wrong")
        })
    }else{
        res.send("Invalid Otp")
    }  
}
module.exports = {showSignUp,saveNewusers,signin,showSignIn,emailVerification,setVerified};