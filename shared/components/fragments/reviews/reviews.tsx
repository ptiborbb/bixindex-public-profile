import { FC } from 'react';
import classes from './reviews.module.scss';

interface ReviewsProps {}

export const Reviews: FC<ReviewsProps> = () => {
  return <div className={classes.reviews}>REVIEWS</div>;
};
