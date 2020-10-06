import { IBixindexClient, IProfile } from '@codingsans/bixindex-common';
import { Dispatch } from 'react';
import { ProfilePage } from '../interfaces/profile-page';
import { getProfiles, getProfilesFail, getProfilesSuccess } from '../pages/profile-list/store/actions';
import { getPublicProfile, getPublicProfileFail, getPublicProfileSuccess } from '../pages/public-profile/store/actions';

export interface IPublicProfileService {
  getPublicProfileByAlias(alias: string): void;
  searchProfilesByName(page: number, rowsPerPage: number, searchText: string): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publicProfileServiceFactory = (
  bixClient: IBixindexClient,
  dispatch: Dispatch<any>,
): IPublicProfileService => {
  return {
    searchProfilesByName: (page: number, rowsPerPage: number, searchText: string) => {
      dispatch(getProfiles({ page, rowsPerPage }));
      bixClient.publicProfile.profile
        .searchProfilesByName({
          filter: searchText,
          page,
          pageSize: rowsPerPage,
          sort: '',
        })
        .then((profileList) =>
          dispatch(getProfilesSuccess({ ...(profileList as { items: IProfile[]; count: number }) })),
        )
        .catch((error) => dispatch(getProfilesFail({ error })));
    },
    getPublicProfileByAlias: (alias: string) => {
      dispatch(getPublicProfile());
      bixClient.publicProfile.profile
        .getProfileByCompany(alias, 'ALIAS')
        .then((profilePage) => dispatch(getPublicProfileSuccess({ profilePage: profilePage as ProfilePage })))
        .catch((error) => dispatch(getPublicProfileFail({ error })));
      // .catch(() => dispatch(getPublicProfileSuccess({ profilePage: mockData() as ProfilePage })));
    },
  };
};
