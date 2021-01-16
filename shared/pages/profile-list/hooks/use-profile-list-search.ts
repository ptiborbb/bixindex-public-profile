import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { useCallback } from 'react';
import { useApp } from '../../../app.context';
import { ProfileSearchTypes } from '../../../enums/profile-search-types';
import { useProfileListSearchEffects } from './use-profile-list-search-effects';
import { useSearchText } from './use-search-text';
import { getOnInfiniteLoad } from './utils/get-on-infinite-load';
import { calculateContainerHeight, calculateLoadOffset } from './utils/infinite-load-dimensions';

interface UseProfileListSearchReturn {
  searchText: string;
  resultsProps: {
    onInfiniteLoad: () => void;
    loadOffset: number;
    containerHeight: number;
    elementHeight: number;
    totalResultCount: number | null;
    loading: boolean;
    profiles: IProfileSummary[] | null;
  };
}

const INFINITE_LOAD_TRIGGER_DISTANCE = 200;
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
  useProfileListSearchEffects({ searchText, by, profileList, publicProfileService, ssrProfiles });

  return {
    searchText: by === ProfileSearchTypes.NAME ? searchText : '',
    resultsProps: {
      loadOffset: (calculateLoadOffset(profileList, INFINITE_LOAD_TRIGGER_DISTANCE) as unknown) as number,
      containerHeight: calculateContainerHeight(profileList, INFINITE_LOAD_ELEMENT_HEIGHT),
      elementHeight: INFINITE_LOAD_ELEMENT_HEIGHT,
      totalResultCount: ssrCount ?? count,
      loading,
      profiles: ssrProfiles ?? profiles,
      onInfiniteLoad,
    },
  };
};
