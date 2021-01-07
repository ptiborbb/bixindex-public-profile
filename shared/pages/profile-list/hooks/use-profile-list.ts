import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useApp } from '../../../app.context';
import { IPublicProfileService } from '../../../services/public-profile.service';
import { IProfileListState } from '../store/state';
import { useProfileListEffects } from './effects';

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

export const useProfileList = (): UseUpdateProfileListReturn => {
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
      loadOffset: calculateLoadOffset(profileList),
      containerHeight: calculateContainerHeight(profileList),
      elementHeight: INFINITE_LOAD_ELEMENT_HEIGHT,
      totalResultCount: count,
      loading,
      profiles,
      onInfiniteLoad,
    },
  };
};

const useSearchText = (): string => (useRouter().query.searchText as string) || '';
const calculateLoadOffset = ({ page, rowsPerPage, count }: IProfileListState): number =>
  page * rowsPerPage >= count ? null : INFINITE_LOAD_TRIGGER_DISTANCE;
const calculateContainerHeight = ({ profiles }: IProfileListState): number =>
  Math.max(INFINITE_LOAD_ELEMENT_HEIGHT * 2, (profiles?.length + 1) * INFINITE_LOAD_ELEMENT_HEIGHT);

const getOnInfiniteLoad = (
  { page, rowsPerPage }: IProfileListState,
  publicProfileService: IPublicProfileService,
  searchText: string,
) => (): void => {
  if (searchText) {
    publicProfileService.searchProfilesByName(page + 1, rowsPerPage, searchText);
  }
};
