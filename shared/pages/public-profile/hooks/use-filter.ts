import { useState } from 'react';
import { EReviewFilterType } from '../../../enums/review-filter-type';

export interface FilterOptions {
  name: string;
  productOrServiceID: string;
  stars: number;
  date: string;
  pageNumber: number;
  isNPS: EReviewFilterType;
}

interface UseFilterReturn {
  filter: FilterOptions;
  setFilter: (val: FilterOptions) => void;
}

export const useFilter = (initialOptions: FilterOptions = defaultFilterOptions): UseFilterReturn => {
  const [filter, setFilter] = useState(initialOptions);
  return {
    filter,
    setFilter,
  };
};

const defaultFilterOptions: FilterOptions = {
  name: '',
  productOrServiceID: '',
  stars: undefined,
  date: '',
  pageNumber: 1,
  isNPS: EReviewFilterType.BIX,
};
