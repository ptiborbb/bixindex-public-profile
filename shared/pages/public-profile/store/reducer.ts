import { createReducer } from '@reduxjs/toolkit';
import { getPublicProfileFail, getPublicProfileSuccess } from './actions';
import { initialPublicProfileState } from './state';
export const publicProfileReducer = createReducer(initialPublicProfileState, (builder) => {
  builder
    .addCase(getPublicProfileSuccess, (state, action) => {
      state.profilePage = action.payload.profilePage;
    })
    .addCase(getPublicProfileFail, (state) => {
      state.profilePage = null;
    })
    .addDefaultCase((state) => state);
});
