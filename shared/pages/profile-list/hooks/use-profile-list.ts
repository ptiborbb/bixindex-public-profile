import { IHighlightedCategoryWithCompany } from '@codingsans/bixindex-common/lib/interfaces/highlighted-category';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { useCallback, useMemo } from 'react';
import { useApp } from '../../../app.context';
import { useTranslate } from '../../../translate.context';
import { useProfileListEffects } from './effects';
import { translateAndSortCategories } from './translate-and-sort-categories';
import { useCategoryText } from './use-category-text';
import { useSearchText } from './use-search-text';
import { getOnInfiniteLoad } from './utils/get-on-infinite-load';
import { calculateContainerHeight, calculateLoadOffset } from './utils/infinite-load-dimensions';

interface UseUpdateProfileListReturn {
  searchText: string;
  onHomePage: boolean;
  resultsProps: {
    onInfiniteLoad: () => void;
    loadOffset: number;
    containerHeight: number;
    elementHeight: number;
    totalResultCount: number;
    loading: boolean;
    profiles: IProfileSummary[];
  };
  featuredProps: {
    categories: (IHighlightedCategoryWithCompany & { originalCategory: string })[];
  };
}

const INFINITE_LOAD_TRIGGER_DISTANCE = 200;
const INFINITE_LOAD_ELEMENT_HEIGHT = 360;

export const useProfileList = (): UseUpdateProfileListReturn => {
  const {
    publicProfileService,
    state: { profileList },
  } = useApp();
  const { t } = useTranslate();
  const { loading, count, profiles, featuredCategories } = profileList;
  const searchText = useSearchText();
  const categoryText = useCategoryText();
  const onHomePage = useMemo(() => !searchText && !categoryText, [searchText, categoryText]);
  useProfileListEffects({ searchText, categoryText, profileList, publicProfileService, onHomePage });
  const onInfiniteLoad = useCallback(getOnInfiniteLoad(profileList, publicProfileService, searchText), [
    profileList.page,
    profileList.rowsPerPage,
    publicProfileService,
    searchText,
  ]);
  const categories = useMemo(() => translateAndSortCategories(featuredCategories, t), [featuredCategories, t]);

  return {
    searchText,
    onHomePage,
    resultsProps: {
      loadOffset: calculateLoadOffset(profileList, INFINITE_LOAD_TRIGGER_DISTANCE),
      containerHeight: calculateContainerHeight(profileList, INFINITE_LOAD_ELEMENT_HEIGHT),
      elementHeight: INFINITE_LOAD_ELEMENT_HEIGHT,
      totalResultCount: count,
      loading,
      profiles,
      onInfiniteLoad,
    },
    featuredProps: {
      categories,
    },
  };
};
