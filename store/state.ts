import combineReducers from 'react-combine-reducers';
import { authReducer } from '../shared/store/reducer';
import { IAuthState, initialAuthState } from '../shared/store/state';
import { AppReducer } from './reducer';
import { IPublicProfileState, initialPublicProfileState } from '../shared/pages/public-profile/store/state';
import { publicProfileReducer } from '../shared/pages/public-profile/store/reducer';

export interface IAppState {
  auth: IAuthState;
  publicProfile: IPublicProfileState;
}

export const [appReducer, initialAppState] = combineReducers<AppReducer>({
  auth: [authReducer, initialAuthState],
  publicProfile: [publicProfileReducer, initialPublicProfileState],
});
