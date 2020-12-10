import { waitPromise } from './wait-promise';

export const timeoutPromise = <T extends unknown>(promise: Promise<T>, timeoutMs: number): Promise<T | null> =>
  Promise.race([promise as unknown, waitPromise(timeoutMs) as unknown]) as Promise<T | null>;
