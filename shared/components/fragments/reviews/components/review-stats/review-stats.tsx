import { FC } from 'react';
import { ReviewRatio } from '../review-ratio/review-ratio';
import classes from './review-stats.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import { ReviewStat } from './review-stat/review-stat';

export interface Ratings {
  excellent: number;
  good: number;
  mediocre: number;
  bad: number;
}

export interface ReviewStatsProps {
  index: {
    score: number;
    ratingCount: number;
    ratings: Ratings;
  };
  indexDetails: {
    label: string;
    index: {
      score: number;
      ratingCount: number;
      ratings: Ratings;
    };
  }[];

  tags: string[];
}

export const ReviewStats: FC<ReviewStatsProps> = ({ index, indexDetails }) => {
  return (
    <div className={classes.reviewStats}>
      <ReviewStat label={'Bizalmi index'} index={index} />

      {indexDetails.map((indexDetail, i) => (
        <ReviewStat key={i} label={indexDetail.label} index={indexDetail.index} />
      ))}
    </div>
  );
};
