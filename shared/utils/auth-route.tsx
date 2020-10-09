import { get } from 'lodash';
import { NextPage } from 'next';
import { FunctionComponent } from 'react';
import { authGuardServiceFactory } from '../services/auth-guard.service';

export const createAuthRouteComponent = (Child: FunctionComponent): NextPage => {
  const Page: NextPage = () => {
    return <Child />;
  };

  Page.getInitialProps = async (ctx) => {
    const host = get(ctx, 'req.headers.host', '');
    const authGuard = authGuardServiceFactory(host);
    const companyFormID = get(ctx, 'query.companyFormID', undefined);
    const companyAlias = get(ctx, 'query.companyAlias', undefined);
    if (ctx.req) {
      const user = await authGuard.getUser(get(ctx, 'req.headers.cookie', ''));
      if (user) {
        return {
          user,
          namespacesRequired: ['common'],
        };
      }

      ctx.res.writeHead(301, {
        Location: `/auth?${companyAlias ? `companyAlias=${companyAlias}` : ''}${
          companyFormID ? `&companyFormID=${companyFormID}` : ''
        }`,
      });
      ctx.res.end();
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
