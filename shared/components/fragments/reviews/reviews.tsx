import { FC } from 'react';
import { RatingItem } from '../../../interfaces/profile-page';
import { ReviewsDetail } from './components/reviews-detail/reviews-detail';
import { ReviewsHeader } from './components/reviews-header/reviews-header';
import classes from './reviews.module.scss';

interface ReviewsProps {
  companyAlias: string;
  companyFormID: string;
  ratings: {
    items: RatingItem[];
    count: number;
    countsByValue: number[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
  npsRates: number[];
}
// TODO missing typings

export const Reviews: FC<ReviewsProps> = ({ companyAlias, companyFormID, stats, npsRates, ratings }) => {
  return (
    <div className={classes.reviews}>
      <ReviewsHeader companyAlias={companyAlias} companyFormID={companyFormID} stats={stats} />
      <ReviewsDetail
        filter={{
          name: '',
          productId: undefined,
          productOrService: undefined,
          stars: undefined,
          date: undefined,
          type: 'bix',
        }}
        filterChanged={console.log}
        products={[]}
        services={[]}
        stats={{ ...stats, npsRates }}
        ratings={ratings.items}
        ratingCountsByValue={ratings.countsByValue}
      />
    </div>
  );
};
