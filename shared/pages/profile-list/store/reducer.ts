import { createReducer } from '@reduxjs/toolkit';
import { getProfiles, getProfilesFail, getProfilesSuccess, resetProfileList } from './actions';
import { initialProfileListState } from './state';
export const profileListReducer = createReducer(initialProfileListState, (builder) => {
  builder
    .addCase(getProfiles, (state, action) => {
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.rowsPerPage;
      state.loading = true;
      state.profiles = initialProfileListState.profiles;
    })
    .addCase(getProfilesSuccess, (state, action) => {
      state.profiles = action.payload.items;
      state.count = action.payload.count;
      state.loading = false;
    })
    .addCase(getProfilesFail, (state) => {
      state.profiles = null;
      state.loading = false;
    })
    .addCase(resetProfileList, (state) => {
      state.profiles = initialProfileListState.profiles;
      state.loading = initialProfileListState.loading;
    })
    .addDefaultCase((state) => state);
});
