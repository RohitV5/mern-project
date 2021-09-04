import * as index_actions from './index';

import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const registerUser = (values) =>{
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/users/register`,{
                email: values.email,
                password: values.password
            });
            
            //dispatching an event to reducer to update the store with user data
            dispatch(index_actions.authUser({data : user.data, auth: true}))


            dispatch(index_actions.successGlobal('Welcome !! check your email and validate your account'));
        }
        catch(error){
            dispatch(index_actions.errorGlobal(error.response.data.message));
        }
    }
}


export const signInUser = (values) =>{
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/users/signin`,{
                email: values.email,
                password: values.password
            });
            
            //dispatching an event to reducer to update the store with user data
            dispatch(index_actions.authUser({data : user.data, auth: true}))


            dispatch(index_actions.successGlobal('Welcome !!'));
        }
        catch(error){
            dispatch(index_actions.errorGlobal(error.response.data.message));
        }
    }
}