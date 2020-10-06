import combineReducers from 'react-combine-reducers';
import { authReducer } from '../shared/store/reducer';
import { IAuthState, initialAuthState } from '../shared/store/state';
import { AppReducer } from './reducer';
import { IPublicProfileState, initialPublicProfileState } from '../shared/pages/public-profile/store/state';
import { publicProfileReducer } from '../shared/pages/public-profile/store/reducer';
import { initialRatingState, IRatingState } from '../shared/pages/rating/store/state';
import { ratingReducer } from '../shared/pages/rating/store/reducer';
import { IProfileListState, initialProfileListState } from '../shared/pages/profile-list/store/state';
import { profileListReducer } from '../shared/pages/profile-list/store/reducer';

export interface IAppState {
  auth: IAuthState;
  publicProfile: IPublicProfileState;
  profileList: IProfileListState;
  rating: IRatingState;
}

export const [appReducer, initialAppState] = combineReducers<AppReducer>({
  auth: [authReducer, initialAuthState],
  publicProfile: [publicProfileReducer, initialPublicProfileState],
  rating: [ratingReducer, initialRatingState],
  profileList: [profileListReducer, initialProfileListState],
});
