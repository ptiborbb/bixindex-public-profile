import { createReducer } from '@reduxjs/toolkit';
import {
  getFeaturedCategories,
  getFeaturedCategoriesFail,
  getFeaturedCategoriesSuccess,
  getProfiles,
  getProfilesFail,
  getProfilesSuccess,
  resetProfileList,
  setProfiles,
} from './actions';
import { initialProfileListState } from './state';

export const profileListReducer = createReducer(initialProfileListState, (builder) => {
  builder
    .addCase(getFeaturedCategories, (state) => {
      state.loading = true;
    })
    .addCase(getFeaturedCategoriesSuccess, (state, action) => {
      state.loading = false;
      state.featuredCategories = action.payload.highlightedCategories;
    })
    .addCase(getFeaturedCategoriesFail, (state) => {
      state.loading = true;
      state.featuredCategories = initialProfileListState.featuredCategories;
    })
    .addCase(getProfiles, (state, action) => {
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.rowsPerPage;
      state.sessionId = action.payload.sessionId;
      state.loading = true;
      if (action.payload.by === 'NAME') {
        if (state.searchText !== action.payload.searchText) {
          state.count = initialProfileListState.count;
          state.profiles = initialProfileListState.profiles;
          state.searchText = action.payload.searchText;
        }
      }
    })
    .addCase(setProfiles, (state, action) => {
      state.searchText = action.payload.searchText;
      state.count = action.payload.count;
      state.profiles = action.payload.profiles;
      state.loading = false;
      state.sessionId = null;
      state.page = initialProfileListState.page;
      state.rowsPerPage = initialProfileListState.rowsPerPage;
    })
    .addCase(getProfilesSuccess, (state, action) => {
      if (action.payload.sessionId === state.sessionId) {
        state.profiles = [...(state.profiles || []), ...action.payload.items];
        state.count = action.payload.count;
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
      state.count = initialProfileListState.count;
    })
    .addDefaultCase((state) => state);
});
