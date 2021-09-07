import { toast } from "react-toastify";
import cookie from 'react-cookies';

export const showToast = (type,msg) => {

    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case 'ERROR':
            toast.error(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break
        default:
            return false;

    }

}


//get cookie if exist
export const getTokenCookie = () => cookie.load('x-access-token');

export const removeTokenCookie = () => cookie.remove('x-access-token', {path:"/"});

//set cookie on axios request
export const getAuthHeader = () =>{
    return { headers: {'x-access-token': getTokenCookie()}} 

}



export const errorHelper = (formik,value) =>({
    error: formik.errors[value] && formik.touched[value] ? true:false,
    helperText:formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
})