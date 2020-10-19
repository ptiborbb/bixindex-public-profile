import { EApplicationStrings, EBackendUrls, IUser } from '@codingsans/bixindex-common';
import Axios, { AxiosError } from 'axios';
import { parse as parseCookie } from 'cookie';
import { has } from 'lodash';

export interface IAuthGuardService {
  getUser: (cookie: string) => Promise<IUser>;
}

export const authGuardServiceFactory = (origin: string): IAuthGuardService => {
  return {
    getUser: async (cookie = '') => {
      const authCookie = parseCookie(cookie);
      if (has(authCookie, EApplicationStrings.BIXINDEX_AUTH_TOKEN)) {
        const user = await Axios.create({ baseURL: `https://${origin}/api` })
          .get(EBackendUrls.ME, {
            headers: { cookie },
          })
          .then((res) => res.data)
          .catch((_error: AxiosError) => {
            return null;
          });
        return user;
      }
    },
  };
};
