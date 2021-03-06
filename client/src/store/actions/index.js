import {
  GET_ARTICLES,
  ADD_ARTICLE,
  GET_ARTICLE,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  SITE_LAYOUT,
  CLEAR_CURR_ARTICLE,
  GET_ADMIN_ARTICLES,
  UPDATE_ARTICLE_STATUS,
  DELETE_ARTICLE,
  EDIT_ARTICLE,
  CHANGE_USER_EMAIL,
  UPDATE_USER_PROFILE,
} from "../types";

//this file contains list of all action that are triggered by components
//the logic for handling these actions are stored in reducer files and these are dispatched from actions.

///////////////articles ////////////////////

export const addArticles = (articles) => ({
  type: ADD_ARTICLE,
  payload: articles,
});

export const getArticles = (articles) => ({
  type: GET_ARTICLES,
  payload: articles,
});

export const getArticle = (article) => ({
  type: GET_ARTICLE,
  payload: article,
});

export const getPaginateArticles = (articles) => ({
  type: GET_ADMIN_ARTICLES,
  payload: articles,
});

export const clearCurrentArticle = () => ({
  type: CLEAR_CURR_ARTICLE,
});

export const updateArticleStatus = (articles) => ({
  type: UPDATE_ARTICLE_STATUS,
  payload: articles,
});

export const deleteArticle = (id) => ({
  type: DELETE_ARTICLE,
  payload: id,
});

export const editArticle = (id) => ({
  type: EDIT_ARTICLE,
  payload: id,
});

///////////////notifications//////////////////

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

//this method requires no payload, so we are just dispatching an event to clear notification
export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  };
};

//in redux thunk we return a dispatch

////////////////// users ///////////////////////

export const authUser = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const changeUserEmail = (data) => ({
  type: CHANGE_USER_EMAIL,
  payload: data,
});

export const updateUserProfile = (data) => ({
  type: UPDATE_USER_PROFILE,
  payload: data,
});

////////////////// users ///////////////////////

export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout,
});



