import { IUser } from '@codingsans/bixindex-common';
import { createAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IDOrAlias } from '../../../enums/id-or-alias';
import { ProfilePage } from '../../../interfaces/profile-page';

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
}

export const getForm = createAction<{ companyFormID: string }>(ERatingActionTypes.GET_FORM);
export const getFormSuccess = createAction<{ form: any }>(ERatingActionTypes.GET_FORM_SUCCESS);
export const getFormFail = createAction<{ error: AxiosError }>(ERatingActionTypes.GET_FORM_FAIL);

export const submitReview = createAction<{ rating: unknown }>(ERatingActionTypes.SUBMIT_REVIEW);
export const submitReviewSuccess = createAction(ERatingActionTypes.SUBMIT_REVIEW_SUCCESS);
export const submitReviewFail = createAction<{ error: AxiosError }>(ERatingActionTypes.SUBMIT_REVIEW_FAIL);
export const submitNPS = createAction<{ rating: unknown }>(ERatingActionTypes.SUBMIT_NPS);
export const submitNPSSuccess = createAction(ERatingActionTypes.SUBMIT_NPS_SUCCESS);
export const submitNPSFail = createAction<{ error: AxiosError }>(ERatingActionTypes.SUBMIT_NPS_FAIL);
