import * as index_actions from './index';

import axios from 'axios';
import { getAuthHeader, getTokenCookie, removeTokenCookie } from '../../utils/tools';


axios.defaults.headers.post["Content-Type"] = "application/json";

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/register`, {
        email: values.email,
        password: values.password,
      });

      //dispatching an event to reducer to update the store with user data
      dispatch(index_actions.authUser({ data: user.data, auth: true }));

      dispatch(
        index_actions.successGlobal(
          "Welcome !! check your email and validate your account"
        )
      );
    } catch (error) {
      dispatch(index_actions.errorGlobal(error.response.data.message));
    }
  };
};

export const signInUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/signin`, {
        email: values.email,
        password: values.password,
      });

      //dispatching an event to reducer to update the store with user data
      dispatch(index_actions.authUser({ data: user.data, auth: true }));

      dispatch(index_actions.successGlobal("Welcome !!"));
    } catch (error) {
      dispatch(index_actions.errorGlobal(error.response.data.message));
    }
  };
};

export const isAuthUser = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie) {
        throw new Error();
      }
      const user = await axios.get(`/api/users/isauth`, getAuthHeader());
      dispatch(index_actions.authUser({ data: user.data, auth: true }));
    } catch (error) {
      dispatch(index_actions.authUser({ data: {}, auth: false }));
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(index_actions.signOut());
  };
};

export const changeEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/users/update_email`,
        {
          email: data.email,
          newemail: data.newemail,
        },
        getAuthHeader()
      );
      //   dispatching to reducer
      dispatch(index_actions.changeUserEmail(data.newemail));
      dispatch(index_actions.successGlobal("Email changed successfully"));
    } catch (e) {
      dispatch(index_actions.errorGlobal(e.response.data.message));
    }
  };
};