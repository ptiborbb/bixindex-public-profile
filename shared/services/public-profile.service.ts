import { IBixindexClient } from '@codingsans/bixindex-common';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Dispatch } from 'react';
import { ProfilePage } from '../interfaces/profile-page';
import {
  getProfiles,
  getProfilesFail,
  getProfilesPartial,
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

export interface IPublicProfileService {
  setPublicProfile(profilePage: ProfilePage): void;
  getPublicProfileByIDOrAlias(identifier: string, IDOrAlias: 'ID' | 'ALIAS'): void;
  getRatingsByProfile(
    profileIdOrCompanyAlias: string,
    by: 'ID' | 'ALIAS',
    limit: number,
    skip: number,
    stars?: number,
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
  let searchProfilesByNameMutex: string | null = null;
  return {
    searchProfilesByName: async (page: number, rowsPerPage: number, searchText: string) => {
      const sessionId = Math.random().toString(36).substr(2, 9);
      searchProfilesByNameMutex = sessionId;
      dispatch(getProfiles({ page, rowsPerPage, sessionId }));

      try {
        for (let i = 0; i < rowsPerPage; i++) {
          if (searchProfilesByNameMutex !== sessionId) {
            break;
          }
          const profileList = await bixClient.publicProfile.profile.searchProfilesByName({
            filter: searchText,
            page: (page - 1) * rowsPerPage + i + 1,
            pageSize: 1,
            sort: '',
          });
          dispatch(getProfilesPartial({ ...(profileList as { items: IProfileSummary[]; count: number }), sessionId }));
          if (!profileList.items.length) {
            break;
          }
        }
        dispatch(getProfilesSuccess({ sessionId }));
      } catch (error) {
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
    getRatingsByProfile: (id, by, limit, skip, stars) => {
      dispatch(getRatingsForProfile());
      bixClient.publicProfile.profile
        .getRatingsByProfile(id, by, limit, skip, stars)
        .then((ratings) => dispatch(getRatingsForProfileSuccess({ ratings })))
        .catch((error) => dispatch(getRatingsForProfileFail({ error })));
      // .catch(() => dispatch(getPublicProfileSuccess({ profilePage: mockData() as ProfilePage })));
    },
  };
};
