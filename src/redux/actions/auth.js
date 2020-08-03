import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = payload => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationTime');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());

  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let endpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrLxBQyptsQd3qBFTJOFa5rDxibLbFQIg';

  if (!isSignup) {
    //   signIn
    endpoint =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrLxBQyptsQd3qBFTJOFa5rDxibLbFQIg';
  }

  axios
    .post(endpoint, authData)
    .then(res => {
      const expirationTime = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationTime', expirationTime);

      dispatch(authSuccess(res.data));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch(err => {
      if (err) {
        dispatch(authFail(err.response.data.error));
      }
    });
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: path,
  };
};

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = new Date(localStorage.getItem('expirationTime'));
    const userId = localStorage.getItem('userId');

    const payload = {
      idToken: token,
      localId: userId,
    };

    if (expirationTime > new Date()) {
      dispatch(authSuccess(payload));
      dispatch(
        checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(logout());
    }
  }
};
