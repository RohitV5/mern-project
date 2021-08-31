const AccessControl = require ('accesscontrol');
//refer to access control documentation for more info

// admin can do these operations on profile
let grantsObject = {
    admin:{
        profile:{
            'create:any': ['*'],
            'read:any': ['*','!password','!_id','!date'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        article:{
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user:{
        profile:{
            'read:own': ['*','!password','!_id','!date'],
            'update:own': ['*'],
        }
    }
}

const roles = new AccessControl(grantsObject);

module.exports = {roles}
