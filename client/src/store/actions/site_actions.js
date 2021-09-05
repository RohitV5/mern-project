import * as index_actions from './index';

export const appLayout = (layout) =>{
    return (dispatch) =>{
        dispatch(index_actions.appLayout(layout))
    }
}