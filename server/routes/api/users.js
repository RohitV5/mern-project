// we are goinf to user express router module
const express = require('express');
let router = express.Router();
require('dotenv').config();


const {User} = require('../../models/user.model');
const {checkLoggedIn} = require('../../middlewares/auth');
const { grantAccess } = require('../../middlewares/roles');


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

    //generate the token
    const doc = await user.save();
 
    //send email
    
    //save and send token with cookie 
    const token = user.generateToken();

    res.cookie('x-access-token',token).status(200).send(getUserProps(doc));
 
    }catch(error){
        res.status(400).json({message:"Error",error:error})
    }


})


router.route("/signin")
    .post( async(req,res)=>{
        try{

            //find user
            let user = await User.findOne({email:req.body.email});
            if(!user) return res.status(400).json({message: "Username or password is incorrect"})

            //compare password
            const compare = await user.comparePassword(req.body.password)
            if(!compare) return res.status(400).json({message: "Username or password is incorrect"})

            //generate token
            //save and send token with cookie 
            const token = user.generateToken();
            res.cookie('x-access-token',token).status(200).send(getUserProps(user));


        }catch(error){
            res.status(400).json({message:"Error",error:error})
        }
    })

router.route("/profile")
.get(checkLoggedIn,grantAccess('readOwn','profile'),async(req,res)=>{

    try{
        const permission = res.locals.permission;

        //find user
        let user = await User.findById(req.user._id);
        if(!user) return res.status(400).json({message: "Username not found"})

        //permission.filter is a method in acesscontrol
        res.status(200).send(permission.filter(user._doc));
    }catch(error){
        res.status(400).json({message:"Error",error:error})
    }


})


//helper function because we dont want to send password back to front end
const getUserProps = (user) =>{

    return{
        _id:user._id,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname,
        age:user.age,
        role:user.role
    }
}

module.exports = router;