import { get } from 'lodash';
import { NextPage } from 'next';
import { FunctionComponent } from 'react';
import { authGuardServiceFactory } from '../services/auth-guard.service';

export const createNoAuthRouteComponent = (Child: FunctionComponent): NextPage => {
  const Page: NextPage = () => {
    return <Child />;
  };

  Page.getInitialProps = async (ctx) => {
    const host = get(ctx, 'req.headers.host', '');
    const authGuard = authGuardServiceFactory(host);
    if (ctx.req) {
      const user = await authGuard.getUser(get(ctx, 'req.headers.cookie', ''));
      if (!user) {
        return {
          namespacesRequired: ['common'],
        };
      }
      return {
        namespacesRequired: ['common'],
      };
    } else {
      return {
        namespacesRequired: ['common'],
      };
    }
  };

  return Page;
};
