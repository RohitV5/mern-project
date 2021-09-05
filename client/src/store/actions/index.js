import { GET_ARTICLES, ERROR_GLOBAL, SUCCESS_GLOBAL, CLEAR_NOTIFICATION, AUTH_USER , SIGN_OUT} from "../types"

//this file contains list of all action that are triggered by components
//the logic for handling these actions are stored in reducer files


///////////////articles ////////////////////
//this is triggered after the article is fetched from server
export const getArticles = (articles) =>({
    type: GET_ARTICLES,
    payload: articles
})




///////////////notifications//////////////////

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload:msg
});

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload:msg
});


//this method requires no payload, so we are just dispatching an event to clear notification
export const clearNotification = () => {
    return (dispatch) =>{
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}


//in redux thunk we return a dispatch


////////////////// users ///////////////////////

export const authUser = (user) => ({
    type: AUTH_USER,
    payload:user
});


export const signOut = () => ({
    type: SIGN_OUT
});


