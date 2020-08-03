import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state, payload) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authSuccess = (state, payload) => {
  return {
    ...state,
    token: payload.idToken,
    userId: payload.localId,
    error: null,
    loading: false,
  };
};

const authFail = (state, payload) => {
  return {
    ...state,
    token: null,
    error: payload,
    loading: false,
  };
};

const authLogout = (state, payload) => {
  return {
    ...state,
    token: null,
    userId: null,
  };
};

const setAuthRedirectPath = (state, payload) => {
  return {
    ...state,
    authRedirectPath: payload,
  };
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state, payload);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, payload);
    case actionTypes.AUTH_FAIL:
      return authFail(state, payload);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, payload);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, payload);
    default:
      return state;
  }
};
