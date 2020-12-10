export const waitPromise = (waitMs: number): Promise<void> => new Promise((res) => setTimeout(res, waitMs));
