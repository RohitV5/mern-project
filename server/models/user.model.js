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

const User = mongoose.model('User', userSchema)

module.exports = {User}
