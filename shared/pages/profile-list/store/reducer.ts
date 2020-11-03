import { createReducer } from '@reduxjs/toolkit';
import { getProfiles, getProfilesFail, getProfilesPartial, getProfilesSuccess, resetProfileList } from './actions';
import { initialProfileListState } from './state';
export const profileListReducer = createReducer(initialProfileListState, (builder) => {
  builder
    .addCase(getProfiles, (state, action) => {
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.rowsPerPage;
      state.sessionId = action.payload.sessionId;
      state.loading = true;
      state.profiles = initialProfileListState.profiles;
    })
    .addCase(getProfilesPartial, (state, action) => {
      if (action.payload.sessionId === state.sessionId) {
        state.profiles = [...(state.profiles || []), ...action.payload.items];
        state.count = action.payload.count;
      }
    })
    .addCase(getProfilesSuccess, (state, action) => {
      if (action.payload.sessionId === state.sessionId) {
        state.loading = false;
        state.sessionId = null;
      }
    })
    .addCase(getProfilesFail, (state, action) => {
      if (action.payload.sessionId === state.sessionId) {
        state.profiles = null;
        state.sessionId = null;
        state.loading = false;
      }
    })
    .addCase(resetProfileList, (state) => {
      state.profiles = initialProfileListState.profiles;
      state.loading = initialProfileListState.loading;
    })
    .addDefaultCase((state) => state);
});
