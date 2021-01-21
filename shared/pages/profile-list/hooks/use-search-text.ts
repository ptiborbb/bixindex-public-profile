import { useRouter } from 'next/router';
import { ProfileSearchTypes } from '../../../enums/profile-search-types';

export const useSearchText = (): { searchText: string; by: ProfileSearchTypes | null } => ({
  searchText: (useRouter().query?.searchText || '') as string,
  by: (useRouter().query?.by as ProfileSearchTypes | undefined) || null,
});
