import * as index_actions from './index';
import axios from 'axios';
import { getAuthHeader } from '../../utils/tools';

// axios.defaults.headers.post['Content-type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getArticles = (sort) => {

    return async (dispatch, getState) => {

        try{
            const arts = await axios.post('/api/articles/loadmore',sort)


            const prevArts = getState().articles.articles;  //will return previous articles from store ie returns previous state

            let newArts = [...arts.data];

            if(prevArts){
                //if previously articles exist then add those to current state.
                newArts = [...prevArts,...arts.data]
            }            

            //dispatching to list of actions in actions/index.js file 
            dispatch(index_actions.getArticles(newArts));
            
            if(arts.data && arts.data.length === 0){
                dispatch(index_actions.errorGlobal('No more articles available to load'));
            }else{
                dispatch(index_actions.successGlobal('Articles loaded'))
            }
            
        }catch(error){
            //dispatching to list of actions in actions/index.js file to show a notification
            dispatch(index_actions.errorGlobal('Oops error loading articles'))
        }
    }
}


export const getArticle = (id) =>{
    return async (dispatch) =>{

        try{
            const request = await axios.get(`/api/articles/get_byid/${id}`);
            dispatch(index_actions.getArticle(request.data[0]))
        }catch(error){
            dispatch(index_actions.errorGlobal(error.response.data.message))
        }

    }
}



export const addArticle = (article) =>{
    return async (dispatch) =>{

        try{
            const request = await axios.post(`/api/articles/admin/add_articles`,
                article, getAuthHeader());

            dispatch(index_actions.addArticles(request.data));
            dispatch(index_actions.successGlobal("Article added!!"))
        }catch(error){
            dispatch(index_actions.errorGlobal(error.response.data.message));
        }

    }
}

export const getPaginateArticles= (page=1, limit=5) =>{
    return async(dispatch) => {
        try{
            const request = await axios.post(`/api/articles/admin/paginate`, {page,limit},getAuthHeader())

            dispatch(index_actions.getPaginateArticles(request.data))
        }catch(error){
            dispatch(index_actions.errorGlobal(error.response.data.message))
        }
    }
}


// redux flow

// dipatch to getarticle ==> action will get article from server then ==> dispatch to  reducer ==> reducer will take the response from action and update the store




