import { ProfilePage } from '../../../interfaces/profile-page';

export interface IPublicProfileState {
  profilePage: ProfilePage;
  loading: boolean;
}

export const initialPublicProfileState: IPublicProfileState = {
  profilePage: null,
  loading: false,
};
