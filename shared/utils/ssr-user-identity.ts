import { EUserRoles, IBixindexClient, IUser } from '@codingsans/bixindex-common';

interface UserIdentityCheckConfig {
  userRole: EUserRoles[];
}

interface UserIdentity {
  (bixClient: IBixindexClient): Promise<IUser | null>;
  check: (bixClient: IBixindexClient, config?: Partial<UserIdentityCheckConfig>) => Promise<boolean>;
}

const getUserIdentity = async (bixClient: IBixindexClient): Promise<IUser | null> => {
  const _user = await bixClient.auth.me().catch(handleAuthError);
  return _user ? _user : null;
};

const checkUserIdentity = async (
  bixClient: IBixindexClient,
  config: Partial<UserIdentityCheckConfig> = defaultCheckConfig,
): Promise<boolean> => {
  const user = await getUserIdentity(bixClient);
  if (user === null) {
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
  return null;
};

export const ssrUserIdentity: UserIdentity = Object.assign(getUserIdentity, { check: checkUserIdentity });
