import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  //   should work on this test
  it('should store the token and userId upon login and signup', () => {
    expect(
      authReducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          payload: 'some-data',
        }
      )
    ).toEqual({
      token: '',
      userId: '',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
