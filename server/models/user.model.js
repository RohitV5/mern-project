const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator'); //for validating any value

require('dotenv').config()


const userSchema = mongoose.Schema({
    email:{
        type: String,
        require:true,
        unique:true,
        trim:true,  //removes whitespace
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'], //only these values are allowed
        default:'user' //in case no value is provided this value will be set
    },
    firstname:{
        type:String,
        maxLength:100,
        trim:true
    },
    lastname:{
        type:String,
        maxLength:100,
        trim:true
    },
    age:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }

},{
    // timestamps:true  //mongodb creates a timestamp ,enable if required
    //collections:"player"  //in case we want to overrride default collection name
})


// middleware to encrypt the password before saving user
//there are also other middlewares as per requirements
userSchema.pre('save',async function(next){
    let user = this;
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }
    next()
})

// check if email already taken
userSchema.statics.emailTaken = async function(email){
    //this refers to the email being saved
    const user = await this.findOne({email});
    return !!user;
    //returning boolean

}

userSchema.methods.generateToken = function(){
    let user = this;
    const userObj = {_id:user._id.toHexString(),email:user.email}
    const token = jwt.sign(userObj,process.env.DB_SECRET,{expiresIn:'1d'})
    return token;
}

const User = mongoose.model('User', userSchema)

module.exports = {User}

//learn about statics and pre's in mongoose
