import * as index_actions from './index';
import axios from 'axios';

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


// redux flow

// dipatch to getarticle ==> action will get article from server then ==> dispatch to  reducer ==> reducer will take the response from action and update the store




