import { IAPIResponse, IUser } from '@codingsans/bixindex-common';

export interface IAuthState {
  user: IUser;
}

export const initialCollection: IAPIResponse = {
  count: 0,
  items: [],
  meta: {},
};

export const initialTableOptions = {
  page: 1,
  pageSize: 10,
  filter: '',
  sort: null,
};

export const initialAuthState: IAuthState = {
  user: null,
};
