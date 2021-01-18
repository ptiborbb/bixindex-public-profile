import { ProfilePage } from '../../../interfaces/profile-page';

export interface IPublicProfileState {
  profilePage: ProfilePage | null;
  loading: boolean;
  ratingsLoading: boolean;
}

export const initialPublicProfileState: IPublicProfileState = {
  profilePage: null,
  loading: true,
  ratingsLoading: false,
};
