import { FC } from 'react';
import classes from './review-ratio.module.scss';

interface ReviewRatioProps {
  value: number;
}

export const ReviewRatio: FC<ReviewRatioProps> = ({ value }) => {
  return <div className={classes.reviewRatio}>{value}</div>;
};
