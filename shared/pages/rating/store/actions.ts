import { ICheckPartnerRegistrationResponse } from '@codingsans/bixindex-common';
import { createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export enum ERatingActionTypes {
  GET_FORM = '[Rating] GET_FORM',
  GET_FORM_SUCCESS = '[Rating] GET_FORM_SUCCESS',
  GET_FORM_FAIL = '[Rating] GET_FORM_FAIL',
  SUBMIT_REVIEW = '[Rating] SUBMIT_REVIEW',
  SUBMIT_REVIEW_SUCCESS = '[Rating] SUBMIT_REVIEW_SUCCESS',
  SUBMIT_REVIEW_FAIL = '[Rating] SUBMIT_REVIEW_FAIL',
  SUBMIT_NPS = '[Rating] SUBMIT_NPS',
  SUBMIT_NPS_SUCCESS = '[Rating] SUBMIT_NPS_SUCCESS',
  SUBMIT_NPS_FAIL = '[Rating] SUBMIT_NPS_FAIL',
  CHECK_PARTNER_REGISTRATION = '[RATING] CHECK_PARTNER_REGISTRATION',
  CHECK_PARTNER_REGISTRATION_SUCCESS = '[RATING] CHECK_PARTNER_REGISTRATION_SUCCESS',
  CHECK_PARTNER_REGISTRATION_FAIL = '[RATING] CHECK_PARTNER_REGISTRATION_FAIL',
}

export const getForm = createAction<{ companyFormID: string }>(ERatingActionTypes.GET_FORM);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormSuccess = createAction<{ form: any }>(ERatingActionTypes.GET_FORM_SUCCESS); // TODO missing typings
export const getFormFail = createAction<{ error: AxiosError }>(ERatingActionTypes.GET_FORM_FAIL);

export const submitReview = createAction<{ rating: unknown }>(ERatingActionTypes.SUBMIT_REVIEW);
export const submitReviewSuccess = createAction(ERatingActionTypes.SUBMIT_REVIEW_SUCCESS);
export const submitReviewFail = createAction<{ error: AxiosError }>(ERatingActionTypes.SUBMIT_REVIEW_FAIL);
export const submitNPS = createAction<{ rating: unknown }>(ERatingActionTypes.SUBMIT_NPS);
export const submitNPSSuccess = createAction(ERatingActionTypes.SUBMIT_NPS_SUCCESS);
export const submitNPSFail = createAction<{ error: AxiosError }>(ERatingActionTypes.SUBMIT_NPS_FAIL);

export const checkPartnerRegistration = createAction<{ partnerID: string; formID: string }>(
  ERatingActionTypes.CHECK_PARTNER_REGISTRATION,
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkPartnerRegistrationSuccess = createAction<{ partner: ICheckPartnerRegistrationResponse }>(
  ERatingActionTypes.CHECK_PARTNER_REGISTRATION_SUCCESS,
);
export const checkPartnerRegistrationFail = createAction<{ error: AxiosError }>(
  ERatingActionTypes.CHECK_PARTNER_REGISTRATION_FAIL,
);
