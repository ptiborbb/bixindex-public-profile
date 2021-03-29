import { createReducer } from '@reduxjs/toolkit';
import { checkPartnerRegistrationSuccess, getFormFail, getFormSuccess } from './actions';
import { initialRatingState } from './state';

export const ratingReducer = createReducer(initialRatingState, (builder) => {
  builder
    .addCase(getFormSuccess, (state, action) => {
      state.form = action.payload.form;
    })
    .addCase(getFormFail, (state) => {
      state.form = null;
    })
    .addCase(checkPartnerRegistrationSuccess, (state, action) => {
      state.partner = action.payload.partner;
    })
    .addDefaultCase((state) => state);
});
