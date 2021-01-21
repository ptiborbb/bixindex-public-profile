import { returnAfter } from './wait-promise';

export const timeoutPromise = async <T extends unknown, K extends any>(
  promise: Promise<T>,
  timeoutMs: number,
  fallbackValue: K = null,
): Promise<T | K> => await Promise.race([promise, returnAfter(timeoutMs, fallbackValue)]);
