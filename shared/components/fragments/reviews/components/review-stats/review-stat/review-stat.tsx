import { FC } from 'react';
import { ReviewRatio } from '../../review-ratio/review-ratio';
import classes from './review-stat.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import { Ratings } from '../review-stats';
import { ReviewRate } from '../review-rate/review-rate';

export interface ReviewStatProps {
  label: string;
  index: {
    score: number;
    ratingCount: number;
    ratings: Ratings;
  };
}

export const ReviewStat: FC<ReviewStatProps> = ({ label, index }) => {
  return (
    <div className={classes.reviewStat}>
      <div className={classes.reviewLeft}>
        <div className={classes.label}>{label}</div>
        <div className={classes.score}>{index.score}</div>
        <div className={classes.ratingCount}>Értékelések száma: {index.ratingCount}</div>
      </div>
      <div className={classes.reviewRight}>
        <ReviewRate ratingCount={index.ratingCount} rating={index.ratings.excellent} />
        <ReviewRate ratingCount={index.ratingCount} rating={index.ratings.good} />
        <ReviewRate ratingCount={index.ratingCount} rating={index.ratings.mediocre} />
        <ReviewRate ratingCount={index.ratingCount} rating={index.ratings.bad} />
      </div>
    </div>
  );
};
