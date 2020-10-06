import { createReducer } from '@reduxjs/toolkit';
import { getProfiles, getProfilesFail, getProfilesSuccess } from './actions';
import { initialProfileListState } from './state';
export const profileListReducer = createReducer(initialProfileListState, (builder) => {
  builder
    .addCase(getProfiles, (state, action) => {
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.rowsPerPage;
    })
    .addCase(getProfilesSuccess, (state, action) => {
      state.profiles = action.payload.items;
      state.count = action.payload.count;
    })
    .addCase(getProfilesFail, (state) => {
      state.profiles = null;
    })
    .addDefaultCase((state) => state);
});