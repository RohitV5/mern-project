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

export const removeTokenCookie = () => cookie.remove('x-access-token');

//set cookie on axios request
export const getAuthHeader =  { headers: {'x-access-token': getTokenCookie()}

}