import { ProfilePage } from '../../../interfaces/profile-page';

export interface IPublicProfileState {
  profilePage: ProfilePage;
  loading: boolean;
  ratingsLoading: boolean;
}

export const initialPublicProfileState: IPublicProfileState = {
  profilePage: null,
  loading: false,
  ratingsLoading: false,
};
