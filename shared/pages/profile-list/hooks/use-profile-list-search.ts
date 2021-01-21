import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { useCallback } from 'react';
import { useApp } from '../../../app.context';
import { ProfileSearchTypes } from '../../../enums/profile-search-types';
import { useProfileListSearchEffects } from './use-profile-list-search-effects';
import { useSearchText } from './use-search-text';
import { getOnInfiniteLoad } from './utils/get-on-infinite-load';

interface UseProfileListSearchReturn {
  searchText: string;
  resultsProps: {
    onInfiniteLoad: () => void;
    elementHeight: number;
    totalResultCount: number | null;
    loading: boolean;
    profiles: IProfileSummary[] | null;
  };
}

const INFINITE_LOAD_ELEMENT_HEIGHT = 360;

export const useProfileListSearch = (
  ssrProfiles: IProfileSummary[] | null,
  ssrCount: number | null,
): UseProfileListSearchReturn => {
  const {
    publicProfileService,
    state: { profileList },
  } = useApp();
  const { loading, count, profiles, page, rowsPerPage } = profileList;
  const { searchText, by } = useSearchText();
  const onInfiniteLoad = useCallback(
    getOnInfiniteLoad({ pageOptions: { page, rowsPerPage }, publicProfileService, searchText, by }),
    [page, rowsPerPage, publicProfileService, searchText, by],
  );
  useProfileListSearchEffects({ searchText, by, profileList, publicProfileService, ssrProfiles, ssrCount });

  return {
    searchText: by === ProfileSearchTypes.NAME ? searchText : '',
    resultsProps: {
      elementHeight: INFINITE_LOAD_ELEMENT_HEIGHT,
      totalResultCount: ssrCount ?? count,
      loading,
      profiles: profiles,
      onInfiniteLoad,
    },
  };
};
