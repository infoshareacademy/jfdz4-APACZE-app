//import axios from 'axios'
//import { browserHistory } from 'react-router'

export const ROOT_URL = 'http://localhost:3000';
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const FETCH_MESSAGE = 'fetch_message';

export const signoutUser = () => {
  localStorage.removeItem('token'); // Delete JWT token
  return {
    type: UNAUTH_USER
  };
};

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
