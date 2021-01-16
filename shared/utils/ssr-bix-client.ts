import { createBixindexClient, IBixindexClient, IReponseInterceptor } from '@codingsans/bixindex-common';
import { NextPageContext } from 'next';
import { useConfig } from '../config.context';
import { timeoutPromise } from './timeout-promise';

const SSR_TIMEOUT = 5000;

export const ssrBixClient = async <T extends unknown>(
  ctx: NextPageContext,
  fetch: (ctx: NextPageContext, bixclient: IBixindexClient) => Promise<T>,
  config: { fallback: T; interceptors?: IReponseInterceptor[]; timeoutMs?: number },
): Promise<T> => {
  const { backendUrl } = useConfig();
  if (!(process && process.env && backendUrl) || !ctx.req) {
    return config.fallback;
  }
  const bixClient = createBixindexClient({
    baseURL: backendUrl,
    responseInterceptors: config.interceptors,
  });

  try {
    return await timeoutPromise(fetch(ctx, bixClient), config?.timeoutMs ?? SSR_TIMEOUT, config.fallback);
  } catch (error) {
    return config.fallback;
  }
};
