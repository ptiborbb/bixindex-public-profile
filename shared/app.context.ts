import { createContext, Dispatch, useContext } from 'react';
import { IAppState } from '../store/state';
import { IAuthService } from './services/auth.service';

interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<unknown>;
  authService: IAuthService;
}

export const AppContext = createContext<IAppContext>({
  state: null,
  dispatch: null,
  authService: null,
});
export const useApp = (): IAppContext => useContext(AppContext);
