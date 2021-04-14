import { IBixindexClient } from '@codingsans/bixindex-common';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Dispatch } from 'react';
import { ProfilePage } from '../interfaces/profile-page';
import {
  getFeaturedCategories,
  getFeaturedCategoriesFail,
  getFeaturedCategoriesSuccess,
  getProfiles,
  getProfilesFail,
  getProfilesSuccess,
  resetProfileList,
  setProfiles,
} from '../pages/profile-list/store/actions';
import {
  getPublicProfile,
  getPublicProfileFail,
  getPublicProfileSuccess,
  getRatingsForProfile,
  getRatingsForProfileFail,
  getRatingsForProfileSuccess,
  resetRatings,
} from '../pages/public-profile/store/actions';
import { retryOnAxiosTimeout } from '../utils/retry-on-axios-timeout';

export interface IPublicProfileService {
  setPublicProfile(profilePage: ProfilePage): void;
  getPublicProfileByIDOrAlias(identifier: string, IDOrAlias: 'ID' | 'ALIAS'): void;
  getRatingsByProfile(
    profileIdOrCompanyAlias: string,
    by: 'ID' | 'ALIAS',
    limit: number,
    skip: number,
    stars?: number,
    productOrServiceID?: string,
    date?: string,
    name?: string,
    isNPS?: boolean,
  ): void;
  searchProfilesByName(page: number, rowsPerPage: number, searchText: string): void;
  searchProfilesByCategory(page: number, rowsPerPage: number, category: string): void;
  setPublicProfiles(profiles: IProfileSummary[], count: number, searchText: string): void;
  resetProfiles(): void;
  resetRatings(): void;
  getFeaturedCategories(): void;
}

const ONE_SECOND = 1000;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publicProfileServiceFactory = (
  bixClient: IBixindexClient,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>, // TODO missing typings
): IPublicProfileService => {
  return {
    searchProfilesByName: async (page: number, rowsPerPage: number, searchText: string) => {
      const sessionId = Math.random().toString(36).substr(2, 9);
      dispatch(getProfiles({ page, rowsPerPage, sessionId, searchText, by: 'NAME' }));

      try {
        const { items, count } = await retryOnAxiosTimeout(
          () =>
            bixClient.publicProfile.profile.searchProfilesByName({
              filter: searchText,
              page: page,
              pageSize: rowsPerPage,
              sort: '',
            }),
          { retryAmount: 5, retryWaitMs: ONE_SECOND },
        );
        dispatch(getProfilesSuccess({ items, count, sessionId }));
      } catch (error) {
        console.error(error);
        dispatch(getProfilesFail({ error, sessionId }));
      }
    },
    searchProfilesByCategory: async (page: number, rowsPerPage: number, category: string) => {
      const sessionId = Math.random().toString(36).substr(2, 9);
      dispatch(getProfiles({ page, rowsPerPage, sessionId, category, by: 'CATEGORY' }));
      try {
        const { items, count } = await retryOnAxiosTimeout(
          () =>
            bixClient.publicProfile.profile.searchProfilesByCategory({
              page: page,
              pageSize: rowsPerPage,
              category,
            }),
          { retryAmount: 5, retryWaitMs: ONE_SECOND },
        );
        dispatch(getProfilesSuccess({ items, count, sessionId }));
      } catch (error) {
        console.error(error);
        dispatch(getProfilesFail({ error, sessionId }));
      }
    },
    setPublicProfiles: (profiles: IProfileSummary[], count: number, searchText: string) => {
      dispatch(setProfiles({ profiles, count, searchText }));
    },
    setPublicProfile: (profilePage) => {
      dispatch(getPublicProfileSuccess({ profilePage }));
    },
    getPublicProfileByIDOrAlias: (identifier, IDOrAlias) => {
      dispatch(getPublicProfile());
      retryOnAxiosTimeout(() => bixClient.publicProfile.profile.getProfileByCompany(identifier, IDOrAlias), {
        retryAmount: 5,
        retryWaitMs: ONE_SECOND,
      })
        .then((profilePage) => dispatch(getPublicProfileSuccess({ profilePage: profilePage as ProfilePage })))
        .catch((error) => {
          console.error(error);
          dispatch(getPublicProfileFail({ error }));
        });
    },
    resetProfiles: () => {
      dispatch(resetProfileList());
    },
    getRatingsByProfile: (id, by, limit, skip, stars, productOrServiceID, date, name, isNPS) => {
      dispatch(getRatingsForProfile());
      bixClient.publicProfile.profile
        .getRatingsByProfile(id, by, limit, skip, stars, productOrServiceID, date, name, isNPS)
        .then((ratings) => dispatch(getRatingsForProfileSuccess({ ratings })))
        .catch((error) => {
          console.error(error);
          dispatch(getRatingsForProfileFail({ error }));
        });
      // .catch(() => dispatch(getPublicProfileSuccess({ profilePage: mockData() as ProfilePage })));
    },
    getFeaturedCategories: () => {
      dispatch(getFeaturedCategories());
      bixClient.publicProfile.featured
        .getHighlighetdCategories()
        .then((data) => {
          dispatch(getFeaturedCategoriesSuccess(data));
        })
        .catch((_) => {
          dispatch(getFeaturedCategoriesFail());
        });
    },
    resetRatings: () => {
      dispatch(resetRatings());
    },
  };
};
