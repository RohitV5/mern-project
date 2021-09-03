import React, {useReducer, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import ArticleCard from '../../utils/articleCard'
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../store/actions/article_actions';


const initialSort = {sortBy:"_id", order:"desc", limit:8, skip:0};

const Home = () => {

    // useReducer allows us to handle object better that useStae because within useReducer we can access the previous state and new state

    const [sort, setSort] = useReducer(
        (currentState, newState) => ({...currentState,...newState}),initialSort);

    // fetching article from redux store
    const articles = useSelector(state => state.articles);
    
    const dispatch = useDispatch();


    useEffect(()=>{
        // trigger only on first render
        if(articles && !articles.articles){
            
            //dispatching to get article action
            dispatch(getArticles(initialSort))
        }
    }, [dispatch, articles])
    

    return (
        <div>
            <div>
                CAROUSEL
            </div>
            <Grid container spacing={2} className="article_card">
                {/* {articles} */}
                {articles && articles.articles ?
                    articles.articles.map((item)=>
                        
                        <Grid key={item._id} item xs={12} sm={6} lg={3}>
                            <ArticleCard key={item._id} article={item} />
                        </Grid>
                    )        
                :null}
            </Grid>
            <button
                    onClick={()=>{
                      let skip = sort.skip + sort.limit;
                      dispatch(getArticles({...sort, skip:skip}));
                      setSort({skip:skip})  
                    }}
            >
                Load more
            </button>
        </div>
    )
}


export default Home;