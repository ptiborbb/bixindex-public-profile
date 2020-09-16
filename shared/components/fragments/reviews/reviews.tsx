import { FC } from 'react';
import { ReviewsDetail } from './components/reviews-detail/reviews-detail';
import { ReviewsHeader } from './components/reviews-header/reviews-header';
import classes from './reviews.module.scss';

interface ReviewsProps {}

export const Reviews: FC<ReviewsProps> = () => {
  return (
    <div className={classes.reviews}>
      <ReviewsHeader />
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
      />
    </div>
  );
};
