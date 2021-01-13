import { useRouter } from 'next/router';

export const useCategoryText = (): string => {
  const queryCategory = useRouter().query?.category;
  if (!queryCategory) {
    return '';
  }
  return Array.isArray(queryCategory) ? queryCategory[0] : queryCategory;
};
