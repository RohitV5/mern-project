import * as articles from './index';
import axios from 'axios';

axios.defaults.headers.post['Content-type'] = 'application/json'

export const getArticles = (sort) => {
    return async (dispatch, getState) => {
        try{
            const arts = await axios.post('/api/articles/loadmore',sort)

            //dispatching to reducer
            dispatch(articles.getArticles(arts.data))
        }catch(error){

        }
    }
}


// redux flow

// dipatch to getarticle ==> action will get article from server then ==> dispatch to  reducer ==> reducer will take the response from action and update the store




