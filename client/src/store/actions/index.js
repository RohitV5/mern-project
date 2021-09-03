import { GET_ARTICLES, ERROR_GLOBAL, SUCCESS_GLOBAL } from "../types"

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