import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { createAction } from '@reduxjs/toolkit';

export enum EProfileListActionTypes {
  GET_PROFILE_LIST = '[App] GET_PROFILE_LIST',
  GET_PROFILE_LIST_PARTIAL = '[App] GET_PROFILE_LIST_PARTIAL',
  GET_PROFILE_LIST_SUCCESS = '[App] GET_PROFILE_LIST_SUCCESS',
  GET_PROFILE_LIST_FAIL = '[App] GET_PROFILE_LIST_FAIL',
  RESET_PROFILE_LIST = '[App] RESET_PROFILE_LIST',
}

export const getProfiles = createAction<{ page: number; rowsPerPage: number; searchText: string; sessionId: string }>(
  EProfileListActionTypes.GET_PROFILE_LIST,
);
export const getProfilesPartial = createAction<{ items: IProfileSummary[]; count: number; sessionId: string }>(
  EProfileListActionTypes.GET_PROFILE_LIST_PARTIAL,
);
export const getProfilesSuccess = createAction<{ sessionId: string }>(EProfileListActionTypes.GET_PROFILE_LIST_SUCCESS);
export const getProfilesFail = createAction<{ error: unknown; sessionId: string }>(
  EProfileListActionTypes.GET_PROFILE_LIST_FAIL,
);
export const resetProfileList = createAction(EProfileListActionTypes.RESET_PROFILE_LIST);
