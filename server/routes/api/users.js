// we are goinf to user express router module
const express = require('express');
let router = express.Router();
require('dotenv').config();


const {User} = require('../../models/user.model');


router.route("/register")
.post(async (req,res)=>{ 
    try{

    //check if user email is taken
    if(await User.emailTaken(req.body.email)){
        return res.status(400).json({message: 'Sorry email taken'})
    }

    //creating the model (hash password)
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    console.log(user)

    //generate the token
    const doc = await user.save();
 
    //send email
    
    //save and send token with cookie 
    res.cookie('x-access-token','fjghfgikjh').status(200).send(doc);

    }catch(error){
        res.status(400).json({message:"Error",error:error})
    }


})


module.exports = router;