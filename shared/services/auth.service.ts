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

export enum EAuthTypes {
  LOCAL = 'LOCAL',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
}
export interface IAuthService {
  login: {
    (type: EAuthTypes.LOCAL, payload: { email: string; password: string }): Promise<void>;
    (type: EAuthTypes.GOOGLE | EAuthTypes.FACEBOOK, payload: { accessToken: string }): Promise<void>;
  };
  register: {
    (type: EAuthTypes.LOCAL, payload: { name: string; email: string; password: string; phone?: string }): Promise<void>;
    (type: EAuthTypes.GOOGLE | EAuthTypes.FACEBOOK, payload: { accessToken: string }): Promise<void>;
  };
  logout: () => Promise<void>;
  getMe: () => void;
  forgotPassword: (email: string) => void;
  changePassword: (token: string, password: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authServiceFactory = (bixClient: IBixindexClient, dispatch: Dispatch<any>): IAuthService => {
  return {
    login: ((type: EAuthTypes, _payload: { email: string; password: string } | { accessToken: string }) => {
      const handleLoginError = (error: unknown): void => {
        throw error;
      };
      if (type === EAuthTypes.LOCAL) {
        const payload = _payload as { email: string; password: string };
        return bixClient.auth
          .login(payload.email, payload.password)
          .then(() => bixClient.auth.me())
          .then((user) => dispatch(loginSuccess({ user })))
          .catch(handleLoginError);
      } else if (type === EAuthTypes.FACEBOOK) {
        const payload = _payload as { accessToken: string };
        return bixClient.auth
          .facebookLogin(payload.accessToken)
          .then(() => bixClient.auth.me())
          .then((user) => dispatch(loginSuccess({ user })))
          .catch(handleLoginError);
      } else if (type === EAuthTypes.GOOGLE) {
        const payload = _payload as { accessToken: string };
        return bixClient.auth
          .googleLogin(payload.accessToken)
          .then(() => bixClient.auth.me())
          .then((user) => dispatch(loginSuccess({ user })))
          .catch(handleLoginError);
      }
    }) as IAuthService['login'],
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
    register: ((
      type: EAuthTypes,
      _payload: { name: string; email: string; password: string; phone?: string } | { accessToken: string },
    ) => {
      const handleLoginError = (_: unknown): void => null;
      if (type === EAuthTypes.LOCAL) {
        const payload = _payload as { name: string; email: string; password: string; phone?: string };
        return bixClient.auth
          .register(payload.name, payload.email, payload.password, payload.phone)
          .then(() => bixClient.auth.me())
          .then((user) => dispatch(registerSuccess({ user })))
          .catch(handleLoginError);
      } else if (type === EAuthTypes.FACEBOOK) {
        const payload = _payload as { accessToken: string };
        return bixClient.auth
          .facebookRegister(payload.accessToken)
          .then(() => bixClient.auth.me())
          .then((user) => dispatch(registerSuccess({ user })))
          .catch(handleLoginError);
      } else if (type === EAuthTypes.GOOGLE) {
        const payload = _payload as { accessToken: string };
        return bixClient.auth
          .googleRegister(payload.accessToken)
          .then(() => bixClient.auth.me())
          .then((user) => dispatch(registerSuccess({ user })))
          .catch(handleLoginError);
      }
    }) as IAuthService['register'],
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
