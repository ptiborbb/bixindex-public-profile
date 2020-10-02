import combineReducers from 'react-combine-reducers';
import { authReducer } from '../shared/store/reducer';
import { IAuthState, initialAuthState } from '../shared/store/state';
import { AppReducer } from './reducer';

export interface IAppState {
  auth: IAuthState;
}

export const [appReducer, initialAppState] = combineReducers<AppReducer>({
  auth: [authReducer, initialAuthState],
});
