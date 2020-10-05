import { IAPIResponse, IUser } from '@codingsans/bixindex-common';
import { ProfilePage } from '../../../interfaces/profile-page';

export interface IPublicProfileState {
  profilePage: ProfilePage;
}

export const initialPublicProfileState: IPublicProfileState = {
  profilePage: null,
};
