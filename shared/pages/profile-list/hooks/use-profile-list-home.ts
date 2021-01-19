import { IHighlightedCategoryWithCompany } from '@codingsans/bixindex-common/lib/interfaces/highlighted-category';
import { useEffect, useMemo } from 'react';
import { useApp } from '../../../app.context';
import { ProfileSearchTypes } from '../../../enums/profile-search-types';
import { useTranslate } from '../../../translate.context';
import { useSearchText } from './use-search-text';
import { translateAndSortCategories } from './utils/translate-and-sort-categories';

interface UseProfileListHomeReturn {
  searchText: string;
  featuredProps: {
    categories: (IHighlightedCategoryWithCompany & { originalCategory: string })[];
  };
}

export const useProfileListHome = (
  ssrCategories: IHighlightedCategoryWithCompany[] | null,
): UseProfileListHomeReturn => {
  const { t } = useTranslate();
  const {
    state: {
      profileList: { featuredCategories },
    },
    publicProfileService,
  } = useApp();

  useEffect(() => {
    ssrCategories === null && publicProfileService.getFeaturedCategories();
  }, [ssrCategories, publicProfileService]);

  const categories = useMemo(() => translateAndSortCategories(ssrCategories ?? featuredCategories, t), [
    featuredCategories,
    ssrCategories,
    t,
  ]);
  const { searchText, by } = useSearchText();
  return {
    searchText: by === ProfileSearchTypes.NAME ? searchText : '',
    featuredProps: {
      categories,
    },
  };
};
