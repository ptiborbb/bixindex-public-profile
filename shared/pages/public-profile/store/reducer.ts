import { createReducer } from '@reduxjs/toolkit';
import { getPublicProfile, getPublicProfileFail, getPublicProfileSuccess } from './actions';
import { initialPublicProfileState } from './state';
export const publicProfileReducer = createReducer(initialPublicProfileState, (builder) => {
  builder
    .addCase(getPublicProfile, (state) => {
      state.loading = true;
    })
    .addCase(getPublicProfileSuccess, (state, action) => {
      state.profilePage = action.payload.profilePage;
      state.loading = false;
    })
    .addCase(getPublicProfileFail, (state) => {
      state.profilePage = null;
      state.loading = false;
    })
    .addDefaultCase((state) => state);
});
