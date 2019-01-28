import CODES from 'http-status-codes';
import { Dispatch } from 'redux';
import { API } from '../lib/API';


export const AUTH_LOADING_SET_VERIFYING = 'AUTH_LOADING_SET_VERIFYING';
export const AUTH_LOADING_SET_LOGGINGIN = 'AUTH_LOADING_SET_LOGGINGIN';
export const AUTH_CLEAR = 'AUTH_CLEAR';

export const AUTH_VERIFIED = 'AUTH_VERIFIED';
export const AUTH_VERIFIED_FAILED = 'AUTH_VERIFIED_FAILED';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';


import {
  ME_EMAIL_SET
} from './Me';
import { SERVER_API, LS_JWT } from '../const';


export const oauth = (provider: 'google' = 'google', timeout = 30) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: AUTH_LOADING_SET_LOGGINGIN, loading: true });

    let w = window.open(`${SERVER_API}/social-login/${provider}`, '_blank');

    let count = 0;

    try {
      // Wait for JWT to resolve from the OAuth window
      const token = await new Promise((res, rej) => {
        const check = () => {
          const JWT = window.localStorage.getItem(LS_JWT);
          if (JWT) res(JWT);
          else {
            count += 1;
            if (count === timeout) rej(new Error('Timeout'));
            else setTimeout(check, 1000);
          }
        }

        check();
      });

      // w.close();
      dispatch({ type: AUTH_LOGIN, token });
      dispatch({ type: AUTH_LOADING_SET_LOGGINGIN, loading: false });

    } catch (e) {
      dispatch({ type: AUTH_LOADING_SET_LOGGINGIN, loading: false });
      dispatch({ type: AUTH_LOGIN_FAILED, message: e.message });
    }
  };

export const verify = () =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await API.get('/auth/verify');

      dispatch({ type: AUTH_VERIFIED });

      return (data as { token: string }).token;

    } catch (e) {
      if (e.code === CODES.UNAUTHORIZED || e.code === CODES.BAD_REQUEST) {
        dispatch({ type: AUTH_VERIFIED_FAILED, message: e.message });
        dispatch({ type: AUTH_CLEAR });
      }
    }
  };


export const logout = () =>
  (dispatch: Dispatch) => {
    dispatch({ type: AUTH_LOGOUT });
  }
