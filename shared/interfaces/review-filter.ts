import { EReviewFilterType } from '../enums/review-filter-type';

export interface ReviewFilter {
  stars: number;
  productOrServiceID: string;
  date: string;
  name: string;
  pageNumber: number;
  isNPS: EReviewFilterType;
}
