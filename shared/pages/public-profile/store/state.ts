import { IProfileRatings } from '@codingsans/bixindex-common';
import { ProfilePage } from '../../../interfaces/profile-page';

export interface IPublicProfileState {
  profilePage: ProfilePage | null;
  loading: boolean;
  ratingsLoading: boolean;
  ratings: IProfileRatings | null;
}

export const initialPublicProfileState: IPublicProfileState = {
  profilePage: null,
  loading: true,
  ratingsLoading: false,
  ratings: null,
};
