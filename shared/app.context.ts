import { createContext, Dispatch, useContext } from 'react';
import { IAppState } from '../store/state';
import { IAuthService } from './services/auth.service';
import { IPublicProfileService } from './services/public-profile.service';
import { IRatingService } from './services/rating.service';

interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<unknown>;
  authService: IAuthService;
  publicProfileService: IPublicProfileService;
  ratingService: IRatingService;
}

export const AppContext = createContext<IAppContext>({
  state: null,
  dispatch: null,
  authService: null,
  publicProfileService: null,
  ratingService: null,
});
export const useApp = (): IAppContext => useContext(AppContext);
