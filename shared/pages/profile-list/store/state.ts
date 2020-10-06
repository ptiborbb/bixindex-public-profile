import { IProfile } from '@codingsans/bixindex-common';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';

export interface IProfileListState {
  profiles: IProfileSummary[];
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
