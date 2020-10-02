import { EApplicationStrings, IUser } from '@codingsans/bixindex-common';
import Axios from 'axios';
import { parse as parseCookie } from 'cookie';
import { has } from 'lodash';

export interface IAuthGuardService {
  getUser: (cookie: string) => Promise<IUser>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authGuardServiceFactory = (origin: string): IAuthGuardService => {
  return {
    getUser: async (cookie = '') => {
      const authCookie = parseCookie(cookie);
      if (has(authCookie, EApplicationStrings.BIXINDEX_AUTH_TOKEN)) {
        const user = await Axios.create({ baseURL: `http://${origin}/api` })
          .get('/me', {
            headers: { cookie },
          })
          .then((res) => res.data)
          .catch(() => null);
        return user;
      }
    },
  };
};
