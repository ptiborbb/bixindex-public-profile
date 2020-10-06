import { IProfile } from '@codingsans/bixindex-common';

export interface IProfileListState {
  profiles: IProfile[];
  page: number;
  rowsPerPage: number;
  count: number;
}

export const initialProfileListState: IProfileListState = {
  profiles: null,
  page: 1,
  rowsPerPage: 10,
  count: null,
};
