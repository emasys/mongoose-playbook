import jwtDecode from 'jwt-decode';
import instance from '../../../config';
import { SIGN_UP, SIGN_IN, IS_LOGGEDIN } from '../types';

export const signUp = data => dispatch =>
  instance
    .post('/signup', data)
    .then(response => {
      dispatch({ type: SIGN_UP, payload: response.data });
      const { data: { token } } = response;
      localStorage.setItem('todo-token', token);
      dispatch(isAuthenticated());
    })
    .catch(error => {
      dispatch({ type: SIGN_UP, payload: error.response.status });
    });

export const signIn = data => dispatch =>
  instance
    .post('/signin', data)
    .then(response => {
      dispatch({ type: SIGN_IN, payload: response.data });
      const { data: { token } } = response;
      localStorage.setItem('todo-token', token);
      dispatch(isAuthenticated());
    })
    .catch(error => {
      dispatch({ type: SIGN_IN, payload: error.response.status });
    });
export const signOut = () => dispatch => {
  localStorage.removeItem('todo-token');
  dispatch(isAuthenticated());
};

export const isAuthenticated = () => {
  const jwtToken = window.localStorage.getItem('todo-token');
  let isLoggedIn = true;
  if (!jwtToken || !jwtToken.length > 9) {
    isLoggedIn = false;
  } else {
    const decoded = jwtDecode(jwtToken);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('todo-token');
      isLoggedIn = false;
    }
  }
  return {
    type: IS_LOGGEDIN,
    payload: isLoggedIn
  };
};
