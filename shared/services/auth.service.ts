import { IBixindexClient } from '@codingsans/bixindex-common';
import { Dispatch } from 'react';
import {
  forgotPassword,
  forgotPasswordFail,
  forgotPasswordSuccess,
  loginFail,
  loginSuccess,
  registerSuccess,
  resetPassword,
  resetPasswordFail,
  resetPasswordSuccess,
} from '../store/actions';
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IAuthService {
  login: (email: string, password: string) => Promise<void>;
  facebook: (accessToken: string) => Promise<void>;
  google: (tokenId: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  getMe: () => void;
  forgotPassword: (email: string) => void;
  changePassword: (token: string, password: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authServiceFactory = (bixClient: IBixindexClient, dispatch: Dispatch<any>): IAuthService => {
  return {
    login: (email: string, password: string) => {
      return bixClient.auth
        .login(email, password)
        .then(() => bixClient.auth.me())
        .then((user) => {
          dispatch(loginSuccess({ user }));
        });
    },
    facebook: (accessToken: string) => {
      return bixClient.auth
        .facebook(accessToken)
        .then(() => bixClient.auth.me())
        .then((user) => {
          dispatch(loginSuccess({ user }));
        });
    },
    google: (tokenId: string) => {
      return bixClient.auth
        .google(tokenId)
        .then(() => bixClient.auth.me())
        .then((user) => {
          dispatch(loginSuccess({ user }));
        });
    },
    logout: () => {
      return bixClient.auth
        .logout()
        .then(() => {
          dispatch(loginSuccess({ user: null }));
        })
        .catch(() => {
          dispatch(loginSuccess({ user: null }));
        });
    },
    register: (name: string, email: string, password: string, phone?) => {
      return bixClient.auth
        .register(name, email, password, phone)
        .then(() => bixClient.auth.me())
        .then((user) => {
          dispatch(registerSuccess({ user }));
        });
    },
    getMe: () => {
      bixClient.auth
        .me()
        .then((user) => {
          dispatch(loginSuccess({ user }));
        })
        .catch((error) => {
          dispatch(loginFail({ error }));
        });
    },
    forgotPassword: (email: string) => {
      dispatch(forgotPassword());
      return bixClient.auth
        .forgotPassword(email)
        .then(() => dispatch(forgotPasswordSuccess()))
        .catch((err) => dispatch(forgotPasswordFail(err.message)));
    },
    changePassword: (token: string, password: string) => {
      dispatch(resetPassword());
      return bixClient.auth
        .changePassword(token, password)
        .then(() => dispatch(resetPasswordSuccess()))
        .catch((error) => dispatch(resetPasswordFail(error)));
    },
  };
};
