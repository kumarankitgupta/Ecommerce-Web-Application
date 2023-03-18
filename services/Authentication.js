const User = require('../models/userModel')

async function findOneuser(username){
    try{
        const data = await  User.findOne({username:username})
        return data;
    }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
async function verification(email){
    try{
        const data = await  User.updateOne({email:email},{isVerified:true})
        if(!data) throw new Error('Error');
        return data;
        }
    catch(err){
        console.log("Error Are There", err)
        return err;
    }
}
module.exports = {findOneuser,verification}