import { EApplicationStrings, EBackendUrls, EUserRoles, IUser } from '@codingsans/bixindex-common';
import Axios from 'axios';
import { parse as parseCookie } from 'cookie';
import { IncomingMessage } from 'http';
import { useConfig } from '../../config.context';
import { SSRUserIdentity, UserIdentityCheckConfig } from './ssr-user-identity.interface';

const getUserIdentity = async (ctx: { req?: IncomingMessage }): Promise<IUser | null> => {
  const cookieString = ctx?.req?.headers?.cookie ?? '';
  const cookie = parseCookie(cookieString);
  const { publicProfileUrl } = useConfig();

  if (
    !(
      process &&
      process.env &&
      publicProfileUrl &&
      cookieString &&
      cookie &&
      EApplicationStrings.BIXINDEX_AUTH_TOKEN in cookie
    )
  ) {
    return null;
  }
  const user = await Axios.create({ baseURL: `${publicProfileUrl}/api` })
    .get(EBackendUrls.ME, {
      headers: { cookie: cookieString },
    })
    .then((res) => res.data)
    .catch(handleAuthError);
  return user ? user : null;
};

const checkUserIdentity = async (
  ctx: { req: IncomingMessage },
  config: Partial<UserIdentityCheckConfig> = defaultCheckConfig,
): Promise<boolean> => {
  const user = await getUserIdentity(ctx);
  if (user === null || !user.role) {
    return false;
  }
  if (config?.userRole && !config?.userRole.includes(user.role)) {
    return false;
  }
  return true;
};

const defaultCheckConfig: UserIdentityCheckConfig = {
  userRole: [EUserRoles.NORMAL, EUserRoles.ADMIN],
};

// TODO: implement properly, once utility is in use
const handleAuthError = (_error: unknown): null => {
  console.error(_error);
  return null;
};

export const ssrUserIdentity: SSRUserIdentity = Object.assign(getUserIdentity, { check: checkUserIdentity });
