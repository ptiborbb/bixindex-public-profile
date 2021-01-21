import { EUserRoles, IUser } from '@codingsans/bixindex-common';
import { IncomingMessage } from 'http';

export interface UserIdentityCheckConfig {
  userRole: EUserRoles[];
}

export interface SSRUserIdentity {
  (ctx: { req?: IncomingMessage }): Promise<IUser | null>;
  check: (ctx: { req: IncomingMessage }, config?: Partial<UserIdentityCheckConfig>) => Promise<boolean>;
}
