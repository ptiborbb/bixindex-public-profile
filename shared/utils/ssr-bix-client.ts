import { createBixindexClient, IBixindexClient, IReponseInterceptor } from '@codingsans/bixindex-common';
import { useConfig } from '../config.context';
import { timeoutPromise } from './timeout-promise';

const SSR_TIMEOUT = 5000;

export const ssrBixClient = async <T extends unknown, K extends unknown>(
  ctx: K,
  fetcher: (ctx: K, bixclient: IBixindexClient) => Promise<T>,
  config: { fallback: T; interceptors?: IReponseInterceptor[]; timeoutMs?: number },
): Promise<T> => {
  const { publicProfileUrl } = useConfig();
  if (!(process && process.env && publicProfileUrl)) {
    return config.fallback;
  }
  const bixClient = createBixindexClient({
    baseURL: `${publicProfileUrl}/api`,
    responseInterceptors: config.interceptors,
  });

  try {
    return await timeoutPromise(fetcher(ctx, bixClient), config?.timeoutMs ?? SSR_TIMEOUT, config.fallback);
  } catch (error) {
    return config.fallback;
  }
};
