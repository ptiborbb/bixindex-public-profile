import { createReducer } from '@reduxjs/toolkit';
import { loginFail, loginSuccess, registerSuccess, registerFail } from './actions';
import { initialAuthState } from './state';

export const authReducer = createReducer(initialAuthState, (builder) => {
  builder
    .addCase(loginSuccess, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(loginFail, (state) => {
      state.user = null;
    })
    .addCase(registerSuccess, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(registerFail, (state) => {
      state.user = null;
    })
    .addDefaultCase((state) => state);
});
