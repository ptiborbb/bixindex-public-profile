import { IHighlightedCategoryWithCompany } from '@codingsans/bixindex-common/lib/interfaces/highlighted-category';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';

export interface IProfileListState {
  profiles: IProfileSummary[] | null;
  page: number;
  rowsPerPage: number;
  count: number | null;
  loading: boolean;
  searchText: string | null;
  sessionId: string | null;
  featuredCategories: IHighlightedCategoryWithCompany[];
}

export const initialProfileListState: IProfileListState = {
  profiles: null,
  page: 1,
  rowsPerPage: 50,
  count: null,
  loading: false,
  searchText: null,
  sessionId: null,
  featuredCategories: [],
};
