import { createReducer } from '@reduxjs/toolkit';
import { getFormFail, getFormSuccess } from './actions';
import { initialRatingState } from './state';

export const ratingReducer = createReducer(initialRatingState, (builder) => {
  builder
    .addCase(getFormSuccess, (state, action) => {
      state.form = action.payload.form;
    })
    .addCase(getFormFail, (state) => {
      state.form = null;
    })
    .addDefaultCase((state) => state);
});
