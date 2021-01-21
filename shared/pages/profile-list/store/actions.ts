import { IHighlightedCategoryWithCompany } from '@codingsans/bixindex-common/lib/interfaces/highlighted-category';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { createAction } from '@reduxjs/toolkit';

export enum EProfileListActionTypes {
  GET_PROFILE_LIST = '[App] GET_PROFILE_LIST',
  SET_PROFILE_LIST = '[APP] SET_PROFILE_LIST',
  GET_PROFILE_LIST_PARTIAL = '[App] GET_PROFILE_LIST_PARTIAL',
  GET_PROFILE_LIST_SUCCESS = '[App] GET_PROFILE_LIST_SUCCESS',
  GET_PROFILE_LIST_FAIL = '[App] GET_PROFILE_LIST_FAIL',
  RESET_PROFILE_LIST = '[App] RESET_PROFILE_LIST',
  GET_FEATURED_CATEGORIES = '[Profile Page] GET_FEATURED_CATEGORIES',
  GET_FEATURED_CATEGORIES_SUCCESS = '[Profile Page] GET_FEATURED_CATEGORIES_SUCCESS',
  GET_FEATURED_CATEGORIES_FAIL = '[Profile Page] GET_FEATURED_CATEGORIES_FAIL',
}

type GetProfilesInput<T = {}, By extends 'NAME' | 'CATEGORY' = 'NAME'> = T & {
  page: number;
  rowsPerPage: number;
  sessionId: string;
  by: By;
};

export const getProfiles = createAction<
  GetProfilesInput<{ searchText: string }, 'NAME'> | GetProfilesInput<{ category: string }, 'CATEGORY'>
>(EProfileListActionTypes.GET_PROFILE_LIST);
export const setProfiles = createAction<{ profiles: IProfileSummary[]; count: number; searchText: string }>(
  EProfileListActionTypes.SET_PROFILE_LIST,
);
export const getProfilesSuccess = createAction<{ items: IProfileSummary[]; count: number; sessionId: string }>(
  EProfileListActionTypes.GET_PROFILE_LIST_SUCCESS,
);
export const getProfilesFail = createAction<{ error: unknown; sessionId: string }>(
  EProfileListActionTypes.GET_PROFILE_LIST_FAIL,
);
export const resetProfileList = createAction(EProfileListActionTypes.RESET_PROFILE_LIST);

export const getFeaturedCategories = createAction(EProfileListActionTypes.GET_FEATURED_CATEGORIES);

export const getFeaturedCategoriesSuccess = createAction<{ highlightedCategories: IHighlightedCategoryWithCompany[] }>(
  EProfileListActionTypes.GET_FEATURED_CATEGORIES_SUCCESS,
);

// TODO: error handling
export const getFeaturedCategoriesFail = createAction(EProfileListActionTypes.GET_FEATURED_CATEGORIES_FAIL);
