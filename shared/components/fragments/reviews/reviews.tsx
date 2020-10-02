import { FC } from 'react';
import { ReviewsDetail } from './components/reviews-detail/reviews-detail';
import { ReviewsHeader } from './components/reviews-header/reviews-header';
import classes from './reviews.module.scss';

interface ReviewsProps {
  ratings: {
    items: any[];
    count: number;
  };
  stats: any;
  npsRates: number[];
}

export const Reviews: FC<ReviewsProps> = ({ ratings, stats, npsRates }) => {
  return (
    <div className={classes.reviews}>
      <ReviewsHeader stats={stats} />
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
      />
    </div>
  );
};
