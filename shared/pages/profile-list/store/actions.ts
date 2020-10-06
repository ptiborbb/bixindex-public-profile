import { createAction } from '@reduxjs/toolkit';
import { IDOrAlias } from '../../../enums/id-or-alias';
import { ProfilePage } from '../../../interfaces/profile-page';
import { IProfile } from '@codingsans/bixindex-common';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';

export enum EProfileListActionTypes {
  GET_PROFILE_LIST = '[App] GET_PROFILE_LIST',
  GET_PROFILE_LIST_SUCCESS = '[App] GET_PROFILE_LIST_SUCCESS',
  GET_PROFILE_LIST_FAIL = '[App] GET_PROFILE_LIST_FAIL',
  RESET_PROFILE_LIST = '[App] RESET_PROFILE_LIST',
}

export const getProfiles = createAction<{ page: number; rowsPerPage: number }>(
  EProfileListActionTypes.GET_PROFILE_LIST,
);
export const getProfilesSuccess = createAction<{ items: IProfileSummary[]; count: number }>(
  EProfileListActionTypes.GET_PROFILE_LIST_SUCCESS,
);
export const getProfilesFail = createAction<{ error: unknown }>(EProfileListActionTypes.GET_PROFILE_LIST_FAIL);
export const resetProfileList = createAction(EProfileListActionTypes.RESET_PROFILE_LIST);
