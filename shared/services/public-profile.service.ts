import { IBixindexClient } from '@codingsans/bixindex-common';
import { AxiosError } from 'axios';
import { Dispatch } from 'react';
import { ProfilePage } from '../interfaces/profile-page';
import {
  getProfiles,
  getProfilesFail,
  getProfilesSuccess,
  resetProfileList,
} from '../pages/profile-list/store/actions';
import {
  getPublicProfile,
  getPublicProfileFail,
  getPublicProfileSuccess,
  getRatingsForProfile,
  getRatingsForProfileFail,
  getRatingsForProfileSuccess,
} from '../pages/public-profile/store/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAxiosError = (error: any): error is AxiosError => error.isAxiosError;

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
  resetProfiles(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publicProfileServiceFactory = (
  bixClient: IBixindexClient,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>, // TODO missing typings
): IPublicProfileService => {
  const service = {
    searchProfilesByName: async (page: number, rowsPerPage: number, searchText: string, remainingRetries = 5) => {
      const sessionId = Math.random().toString(36).substr(2, 9);
      dispatch(getProfiles({ page, rowsPerPage, sessionId, searchText }));

      try {
        const { items, count } = await bixClient.publicProfile.profile.searchProfilesByName({
          filter: searchText,
          page: page,
          pageSize: rowsPerPage,
          sort: '',
        });
        dispatch(getProfilesSuccess({ items, count, sessionId }));
      } catch (error) {
        console.error(error);
        if (remainingRetries > 0 && error && isAxiosError(error) && error?.response?.status === 502) {
          return service.searchProfilesByName(page, rowsPerPage, searchText, remainingRetries - 1);
        }
        dispatch(getProfilesFail({ error, sessionId }));
      }
    },
    setPublicProfile: (profilePage) => {
      dispatch(getPublicProfileSuccess({ profilePage }));
    },
    getPublicProfileByIDOrAlias: (identifier, IDOrAlias) => {
      dispatch(getPublicProfile());
      bixClient.publicProfile.profile
        .getProfileByCompany(identifier, IDOrAlias)
        .then((profilePage) => dispatch(getPublicProfileSuccess({ profilePage: profilePage as ProfilePage })))
        .catch((error) => dispatch(getPublicProfileFail({ error })));
      // .catch(() => dispatch(getPublicProfileSuccess({ profilePage: mockData() as ProfilePage })));
    },
    resetProfiles: () => {
      dispatch(resetProfileList());
    },
    getRatingsByProfile: (id, by, limit, skip, stars, productOrServiceID, date, name, isNPS) => {
      dispatch(getRatingsForProfile());
      bixClient.publicProfile.profile
        .getRatingsByProfile(id, by, limit, skip, stars, productOrServiceID, date, name, isNPS)
        .then((ratings) => dispatch(getRatingsForProfileSuccess({ ratings })))
        .catch((error) => dispatch(getRatingsForProfileFail({ error })));
      // .catch(() => dispatch(getPublicProfileSuccess({ profilePage: mockData() as ProfilePage })));
    },
  };
  return service;
};
