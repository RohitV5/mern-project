// we are goinf to user express router module
const express = require('express');
let router = express.Router();
require('dotenv').config();


const {Article} = require('../../models/article.model');
const {checkLoggedIn} = require('../../middlewares/auth');
const { grantAccess } = require('../../middlewares/roles');
const { request } = require('express');

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


module.exports = router;