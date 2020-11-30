import { IProduct, IRating, IRatingItem, IService } from '@codingsans/bixindex-common';
import { FC } from 'react';
import { ReviewFilter } from '../../../interfaces/review-filter';
import { ReviewsDetail } from './components/reviews-detail/reviews-detail';
import { ReviewsHeader } from './components/reviews-header/reviews-header';
import classes from './reviews.module.scss';

interface ReviewsProps {
  companyAlias: string;
  companyFormID: string;
  ratings: {
    items: IRatingItem[];
    count: number;
    countsByValue: number[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
  npsRates: number[];
  filter: ReviewFilter;
  filterChanged: (filters: ReviewFilter) => void;
  lastRating: IRating;
  productsAndServices: (IProduct & IService)[];
}
// TODO missing typings

export const Reviews: FC<ReviewsProps> = ({
  companyAlias,
  companyFormID,
  stats,
  npsRates,
  ratings,
  filter,
  filterChanged,
  lastRating,
  productsAndServices,
}) => {
  return (
    <div className={classes.reviews}>
      <ReviewsHeader companyAlias={companyAlias} companyFormID={companyFormID} stats={stats} />
      <ReviewsDetail
        filter={filter}
        filterChanged={filterChanged}
        productsAndServices={productsAndServices}
        stats={{ ...stats, npsRates }}
        ratings={ratings.items}
        ratingCount={ratings.count}
        ratingCountsByValue={ratings.countsByValue}
        companyAlias={companyAlias}
        companyFormID={companyFormID}
        lastRating={lastRating}
      />
    </div>
  );
};
