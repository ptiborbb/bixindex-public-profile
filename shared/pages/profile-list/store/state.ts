import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';

export interface IProfileListState {
  profiles: IProfileSummary[] | null;
  page: number;
  rowsPerPage: number;
  count: number | null;
  loading: boolean;
  sessionId: string | null;
}

export const initialProfileListState: IProfileListState = {
  profiles: null,
  page: 1,
  rowsPerPage: 10,
  count: null,
  loading: false,
  sessionId: null,
};
