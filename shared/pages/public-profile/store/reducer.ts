import { createReducer } from '@reduxjs/toolkit';
import {
  getPublicProfile,
  getPublicProfileFail,
  getPublicProfileSuccess,
  getRatingsForProfile,
  getRatingsForProfileFail,
  getRatingsForProfileSuccess,
} from './actions';
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
    .addCase(getRatingsForProfile, (state) => {
      state.ratingsLoading = true;
    })
    .addCase(getRatingsForProfileSuccess, (state, action) => {
      state.ratings = action.payload.ratings;
      state.ratingsLoading = false;
    })
    .addCase(getRatingsForProfileFail, (state) => {
      state.ratingsLoading = false;
    })
    .addDefaultCase((state) => state);
});
