import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { useCallback } from 'react';
import { useApp } from '../../../app.context';
import { useProfileListEffects } from './effects';
import { useSearchText } from './use-search-text';
import { getOnInfiniteLoad } from './utils/get-on-infinite-load';
import { calculateContainerHeight, calculateLoadOffset } from './utils/infinite-load-dimensions';

interface UseUpdateProfileListReturn {
  searchText: string;
  resultsProps: {
    onInfiniteLoad: () => void;
    loadOffset: number;
    containerHeight: number;
    elementHeight: number;
    totalResultCount: number;
    loading: boolean;
    profiles: IProfileSummary[];
  };
}

const INFINITE_LOAD_TRIGGER_DISTANCE = 200;
const INFINITE_LOAD_ELEMENT_HEIGHT = 360;

export const useProfileList = (searchCategory?: string): UseUpdateProfileListReturn => {
  const {
    publicProfileService,
    state: { profileList },
  } = useApp();
  const { loading, count, profiles } = profileList;
  const searchText = useSearchText();
  useProfileListEffects({ searchText, profileList, publicProfileService });
  const onInfiniteLoad = useCallback(getOnInfiniteLoad(profileList, publicProfileService, searchText), [
    profileList.page,
    profileList.rowsPerPage,
    publicProfileService,
    searchText,
  ]);

  return {
    searchText,
    resultsProps: {
      loadOffset: calculateLoadOffset(profileList, INFINITE_LOAD_TRIGGER_DISTANCE),
      containerHeight: calculateContainerHeight(profileList, INFINITE_LOAD_ELEMENT_HEIGHT),
      elementHeight: INFINITE_LOAD_ELEMENT_HEIGHT,
      totalResultCount: count,
      loading,
      profiles,
      onInfiniteLoad,
    },
  };
};
