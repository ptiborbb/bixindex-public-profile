import { IProfileRatings } from '@codingsans/bixindex-common';
import { createAction } from '@reduxjs/toolkit';
import { ProfilePage } from '../../../interfaces/profile-page';

export enum EPublicProfileActionTypes {
  GET_PUBLIC_PROFILE = '[App] GET_PUBLIC_PROFILE',
  GET_PUBLIC_PROFILE_SUCCESS = '[App] GET_PUBLIC_PROFILE_SUCCESS',
  GET_PUBLIC_PROFILE_FAIL = '[App] GET_PUBLIC_PROFILE_FAIL',
  GET_RATINGS_FOR_PROFILE = '[App] GET_RATINGS_FOR_PROFILE',
  GET_RATINGS_FOR_PROFILE_SUCCESS = '[App] GET_RATINGS_FOR_PROFILE_SUCCESS',
  GET_RATINGS_FOR_PROFILE_FAIL = '[App] GET_RATINGS_FOR_PROFILE_FAIL',
  RESET_RATINGS = '[APP] RESET_RATINGS',
}

export const getPublicProfile = createAction(EPublicProfileActionTypes.GET_PUBLIC_PROFILE);
export const getPublicProfileSuccess = createAction<{ profilePage: ProfilePage }>(
  EPublicProfileActionTypes.GET_PUBLIC_PROFILE_SUCCESS,
);
export const getPublicProfileFail = createAction<{ error: unknown }>(EPublicProfileActionTypes.GET_PUBLIC_PROFILE_FAIL);
export const getRatingsForProfile = createAction(EPublicProfileActionTypes.GET_RATINGS_FOR_PROFILE);
export const getRatingsForProfileSuccess = createAction<{ ratings: IProfileRatings }>(
  EPublicProfileActionTypes.GET_RATINGS_FOR_PROFILE_SUCCESS,
);
export const getRatingsForProfileFail = createAction<{ error: unknown }>(
  EPublicProfileActionTypes.GET_RATINGS_FOR_PROFILE_FAIL,
);
export const resetRatings = createAction(EPublicProfileActionTypes.RESET_RATINGS);
