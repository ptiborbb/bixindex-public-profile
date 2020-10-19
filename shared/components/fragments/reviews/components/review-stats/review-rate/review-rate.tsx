import { FC, useMemo } from 'react';
import classes from './review-rate.module.scss';

export interface ReviewRateProps {
  ratingCount: number;
  rating: number;
}

export const ReviewRate: FC<ReviewRateProps> = ({ ratingCount, rating }) => {
  const ratio = useMemo(() => ((rating / ratingCount) * 100).toFixed(2), [rating, ratingCount]);
  return (
    <div className={classes.reviewRate}>
      <div className={classes.ratio}>{ratio}%</div>
      <div className={classes.line}>
        <div className={classes.innerLine} style={{ width: `${ratio}%` }}></div>
      </div>
    </div>
  );
};
