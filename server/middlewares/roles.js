const {roles} = require('../config/roles');

// a function returning a funciton
//this middleware is triggered after checkedloggedin middleware which attached the role to the request.

//the action values are fixed. please refer accesscontrol documentation
exports.grantAccess = function(action,resource){
    return async (req,res,next)=>{
        try{

            const permission = roles.can(req.user.role)[action](resource);
            if(!permission.granted){
                return res.status(400).json({
                    error:"You dont have permission"
                })
            }   
            
            res.locals.permission = permission;
            next()
        }catch(error){
            next(error)
        }
    }
}