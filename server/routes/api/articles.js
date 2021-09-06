// we are goinf to user express router module
const express = require('express');
let router = express.Router();
require('dotenv').config();


const {Article} = require('../../models/article.model');
const {checkLoggedIn} = require('../../middlewares/auth');
const { grantAccess } = require('../../middlewares/roles');
const { request } = require('express');
const { sortArgsHelper } = require('../../config/helper');

router.route('/admin/add_articles')
.post(checkLoggedIn,grantAccess('createAny','article'),async(req,res)=>{
    try{
        const article = new Article({
            ...req.body,
            score:parseInt(req.body.score)
        });
        
        const result = await article.save();

        res.status(200).json(result)
    }catch(error){
        res.status(400).json({message:"Error adding article",error:error})
    }
})

router.route('/admin/:id')
.get(checkLoggedIn,grantAccess('readAny','article'),async(req,res)=>{
    try{
        const _id = req.params.id;
        const article = await Article.findById(_id);
        if(!article || article.length === 0){
            return res.status(400).json({message:"Article not found"})
        }
        res.status(200).json(article)
    }catch(error){
        res.status(400).json({message:"Error fetching article using id",error:error})
    }
})
.patch(checkLoggedIn,grantAccess('readAny','article'),async(req,res)=>{
    try{
        const _id = req.params.id;
        const article = await Article.findOneAndUpdate(
            {_id},
            {
                "$set":req.body
            },
            {
                new:true //to get the new article back
            }
            
            
        );

        if(!article)  return res.status(400).json({message:"Article not found"});

        res.status(200).json(article)
    }catch(error){
        res.status(400).json({message:"Error updating article",error:error})
    }
})
.delete(checkLoggedIn,grantAccess('readAny','article'),async(req,res)=>{
    try{

        const _id = req.params.id;
        const article = await Article.findByIdAndRemove(_id)
        if(!article) return   res.status(400).json({message:"Article not found"});
        res.status(200).json({message:"Article deleted",_id:article._id})
    }catch(error){
        res.status(400).json({message:"Error deleting article",error:error})
    }
})

router.route("/admin/paginate")
.post(checkLoggedIn,grantAccess('readAny','articles'),async(req,res)=>{
    try{

        

        

        
        const limit = req.body.limit ? req.body.limit : 5;

        //aggregate uses pipelines
        const aggQuery = Article.aggregate([
            {$match :  {"status":"public"}}
        ])
        

        const options = {
            page: req.body.page,
            limit,
            sort:{_id:'desc'}
        }



        const articles = await Article.aggregatePaginate(aggQuery,options);


        res.status(200).json(articles)
    }catch(error){
        res.status(400).json({message:"Error fetching article using paginate",error:error})
    }

})

//NO AUTH REQUIRED//

router.route("/loadmore")
.post(async(req,res)=>{

 
    try{
        let sortArgs = sortArgsHelper(req.body);

        console.log(req.body)

        const articles = await Article
        .find({status: 'public'})
        .sort([[sortArgs.sortBy,sortArgs.order]])
        .skip(sortArgs.skip)
        .limit(sortArgs.limit)

        res.status(200).json(articles)
    }catch(error){
        res.status(400).json({message:"Error fetching article using loadmore",error:error})
    }

})


//for finding only public articles for general user
router.route('/get_byid/:id')
.get(async(req,res)=>{
    try{
        const _id = req.params.id;
        const article = await Article.find({_id, status:'public'});
        if(!article || article.length === 0){
            return res.status(400).json({message:"Article not found"})
        }
        res.status(200).json(article)
    }catch(error){
        res.status(400).json({message:"Error fetching article using id",error:error})
    }
})





module.exports = router;