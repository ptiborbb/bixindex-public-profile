import { AxiosError } from 'axios';
import { waitPromise } from './wait-promise';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAxiosError = (error: any): error is AxiosError => error.isAxiosError;

export const retryOnAxiosTimeout = async <T>(
  fn: () => Promise<T>,
  { retryAmount, retryWaitMs }: { retryAmount: number; retryWaitMs: number },
): Promise<T> => {
  for (let retry = 0; retry <= retryAmount; retry++) {
    try {
      return await fn();
    } catch (error) {
      if (retry !== retryAmount && error && isAxiosError(error) && error?.response?.status === 502) {
        console.error('retryOnAxiosTimeout', error);
        if (retryWaitMs) {
          await waitPromise(retryWaitMs);
        }
        continue;
      }
      throw error;
    }
  }
};
