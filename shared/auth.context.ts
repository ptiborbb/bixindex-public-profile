import { createContext, useContext } from 'react';

interface IAuthContext {
  token: string;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  login: () => undefined,
  logout: () => undefined,
});
export const useAuth = (): IAuthContext => useContext(AuthContext);
