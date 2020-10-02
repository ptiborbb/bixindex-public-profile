import { createContext, Dispatch, useContext } from 'react';
import { IAppState } from '../store/state';
import { IAuthService } from './services/auth.service';
import { IPublicProfileService } from './services/public-profile.service';

interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<unknown>;
  authService: IAuthService;
  publicProfileService: IPublicProfileService;
}

export const AppContext = createContext<IAppContext>({
  state: null,
  dispatch: null,
  authService: null,
  publicProfileService: null,
});
export const useApp = (): IAppContext => useContext(AppContext);
