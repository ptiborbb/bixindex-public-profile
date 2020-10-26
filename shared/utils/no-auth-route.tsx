import { get } from 'lodash';
import { NextPage } from 'next';
import { FunctionComponent } from 'react';
import { authGuardServiceFactory } from '../services/auth-guard.service';

export const createNoAuthRouteComponent = (Child: FunctionComponent | NextPage): NextPage => {
  const Page: NextPage = (props) => {
    return <Child {...props} />;
  };

  Page.getInitialProps = async (ctx) => {
    const host = get(ctx, 'req.headers.host', '');
    const authGuard = authGuardServiceFactory(host);

    const initialProps = 'getInitialProps' in Child ? await Child.getInitialProps(ctx) : {};

    if (ctx.req) {
      const cookie = get(ctx, 'req.headers.cookie', '');
      const user = await authGuard.getUser(cookie);
      if (!user) {
        return {
          ...initialProps,
          namespacesRequired: ['common'],
        };
      }
      return {
        ...initialProps,
        user,
        namespacesRequired: ['common'],
      };
    } else {
      return {
        ...initialProps,
        namespacesRequired: ['common'],
      };
    }
  };

  return Page;
};
