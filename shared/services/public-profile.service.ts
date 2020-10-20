import { IBixindexClient } from '@codingsans/bixindex-common';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Dispatch } from 'react';
import { ProfilePage } from '../interfaces/profile-page';
import {
  getProfiles,
  getProfilesFail,
  getProfilesSuccess,
  resetProfileList,
} from '../pages/profile-list/store/actions';
import { getPublicProfile, getPublicProfileFail, getPublicProfileSuccess } from '../pages/public-profile/store/actions';

export interface IPublicProfileService {
  getPublicProfileByIDOrAlias(identifier: string, IDOrAlias: 'ID' | 'ALIAS'): void;
  searchProfilesByName(page: number, rowsPerPage: number, searchText: string): void;
  resetProfiles(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publicProfileServiceFactory = (
  bixClient: IBixindexClient,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>, // TODO missing typings
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
          dispatch(getProfilesSuccess({ ...(profileList as { items: IProfileSummary[]; count: number }) })),
        )
        .catch((error) => dispatch(getProfilesFail({ error })));
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
  };
};
