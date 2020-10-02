import { IAppState } from './state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppReducer = (state: IAppState, action: any) => IAppState;
