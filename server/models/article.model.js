const mongoose = require('mongoose');

const validator = require('validator'); //for validating any value
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

require('dotenv').config()

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        maxLength:100,
        required:[true, 'You need a title']

    },
    content:{
        type:String,
        required:[true,'You need a content']
    },
    excerpt:{
        type:String,
        required:[true, 'Please add an excerpt'],
        maxLength:500
    },
    score:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    director:
    {
        type:String,
        required:true
    },
    actors:{
        type:[String],
        required:true,
        validate:{
            validator:function(array){
                return array.length >= 2;
            }
            ,message:"you must add atleast three"
        }
    },
    status:{
        type:String,
        requred:true,
        enum:['draft', 'public']
    },
    date:{
        type:Date,
        default:Date.now
    }
})


articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model('Article', articleSchema)

module.exports = {Article}