import { GET_ARTICLES, GET_ARTICLE, CLEAR_CURR_ARTICLE, ADD_ARTICLE} from "../types"

export default function articleReducer(state={}, action){
    switch(action.type){
        case GET_ARTICLES:
            return {...state, articles:action.payload}
        case GET_ARTICLE:
            return {...state, current:action.payload}
        case CLEAR_CURR_ARTICLE:
            return {...state, current:''}
        case ADD_ARTICLE:
            return {...state, lastAdded: action.payload, success:true}
        default:
            return state
    }
} 