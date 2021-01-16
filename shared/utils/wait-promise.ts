export const waitPromise = (waitMs: number): Promise<void> => new Promise((res) => setTimeout(res, waitMs));
export const returnAfter = <T>(waitMs: number, value: T): Promise<T> =>
  new Promise((res) => setTimeout(() => res(value), waitMs));
