import { IHighlightedCategoryWithCompany } from '@codingsans/bixindex-common/lib/interfaces/highlighted-category';
import { TFunction } from 'next-i18next';

export const translateAndSortCategories = (
  categoryList: IHighlightedCategoryWithCompany[],
  translate: TFunction,
): (IHighlightedCategoryWithCompany & { originalCategory: string })[] => {
  const extendedList = categoryList.map((c) => ({ ...c, originalCategory: c.category }));
  const sortedList = sortCategories(extendedList);
  const translatedList = translateCategories(sortedList, translate);
  return translatedList;
};

const sortCategories = <T extends { companies: unknown[] }>(list: T[]): T[] =>
  [...list].sort((i1, i2) => i2.companies?.length - i1.companies?.length);

const translateCategories = <T extends { category: string }>(list: T[], translate: TFunction): T[] =>
  [...list].map((item) => ({ ...item, category: translate(`MAIN_CATEGORIES.${item.category.toUpperCase()}`) }));
