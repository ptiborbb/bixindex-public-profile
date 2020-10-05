import { IAPIResponse, IUser } from '@codingsans/bixindex-common';
import { ProfilePage } from '../../../interfaces/profile-page';

export interface IRatingState {
  form: any;
}

export const initialRatingState: IRatingState = {
  form: null,
};
