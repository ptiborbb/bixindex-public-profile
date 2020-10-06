import { IBixindexClient } from '@codingsans/bixindex-common';
import { Dispatch } from 'react';
import { getPublicProfile, getPublicProfileSuccess, getPublicProfileFail } from '../pages/public-profile/store/actions';
import { ProfilePage } from '../interfaces/profile-page';

export interface IPublicProfileService {
  getPublicProfileByAlias(alias: string): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publicProfileServiceFactory = (
  bixClient: IBixindexClient,
  dispatch: Dispatch<any>,
): IPublicProfileService => {
  return {
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
