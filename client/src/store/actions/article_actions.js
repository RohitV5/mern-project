import * as articles from './index';
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

            //dispatching to reducer
            dispatch(articles.getArticles(newArts));
        }catch(error){

        }
    }
}


// redux flow

// dipatch to getarticle ==> action will get article from server then ==> dispatch to  reducer ==> reducer will take the response from action and update the store




