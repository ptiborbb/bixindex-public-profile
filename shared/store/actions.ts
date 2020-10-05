import { IUser } from '@codingsans/bixindex-common';
import { createAction } from '@reduxjs/toolkit';

export enum EAuthActionTypes {
  LOGIN = '[App] LOGIN',
  LOGIN_SUCCESS = '[App] LOGIN_SUCCESS',
  LOGIN_FAIL = '[App] LOGIN_FAIL',
  REGISTER = '[App] REGISTER',
  REGISTER_SUCCESS = '[App] REGISTER_SUCCESS',
  REGISTER_FAIL = '[App] REGISTER_FAIL',
  FORGOT_PASSWORD = '[App] FORGOT_PASSWORD',
  FORGOT_PASSWORD_SUCCESS = '[App] FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAIL = '[App] FORGOT_PASSWORD_FAIL',
  RESET_PASSWORD = '[App] RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS = '[App] RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAIL = '[App] RESET_PASSWORD_FAIL',
}

export const login = createAction<{ email: string; password: string }>(EAuthActionTypes.LOGIN);
export const loginSuccess = createAction<{ user: IUser }>(EAuthActionTypes.LOGIN_SUCCESS);
export const loginFail = createAction<{ error: unknown }>(EAuthActionTypes.LOGIN_FAIL);
export const register = createAction<{ name: string; email: string; password: string }>(EAuthActionTypes.REGISTER);
export const registerSuccess = createAction<{ user: IUser }>(EAuthActionTypes.REGISTER_SUCCESS);
export const registerFail = createAction<{ error: unknown }>(EAuthActionTypes.REGISTER_FAIL);
export const forgotPassword = createAction(EAuthActionTypes.FORGOT_PASSWORD);
export const forgotPasswordSuccess = createAction(EAuthActionTypes.FORGOT_PASSWORD_SUCCESS);
export const forgotPasswordFail = createAction<{ error: string }>(EAuthActionTypes.FORGOT_PASSWORD_FAIL);
export const resetPassword = createAction(EAuthActionTypes.RESET_PASSWORD);
export const resetPasswordSuccess = createAction(EAuthActionTypes.RESET_PASSWORD_SUCCESS);
export const resetPasswordFail = createAction<{ error: string }>(EAuthActionTypes.RESET_PASSWORD_FAIL);
