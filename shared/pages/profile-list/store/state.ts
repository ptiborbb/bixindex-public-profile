import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { FeaturedCategoryWithCompanies } from '../mock-fetch';

// TODO: change imports when common has been merged
export interface IProfileListState {
  profiles: IProfileSummary[] | null;
  page: number;
  rowsPerPage: number;
  count: number | null;
  loading: boolean;
  searchText: string | null;
  category: string | null;
  sessionId: string | null;
  featuredCategories: FeaturedCategoryWithCompanies[];
}

export const initialProfileListState: IProfileListState = {
  profiles: null,
  page: 1,
  rowsPerPage: 50,
  count: null,
  loading: false,
  searchText: null,
  category: null,
  sessionId: null,
  featuredCategories: [],
};
