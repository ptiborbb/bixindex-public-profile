import { FC } from 'react';
import { NpsStat } from './nps-stat/nps-stat';
import { ReviewStat } from './review-stat/review-stat';
import classes from './review-stats.module.scss';

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
    ratings: number[];
  };
  indexDetails?: {
    label: string;
    index: {
      score: number;
      ratingCount: number;
      ratings: Ratings;
    };
  }[];

  npsRates: [number, number, number, number, number, number, number, number, number, number];
}

export const ReviewStats: FC<ReviewStatsProps> = ({ index, indexDetails, npsRates }) => {
  return (
    <div className={classes.reviewStats}>
      <ReviewStat label={'Bizalmi index'} index={index} radius={80} />

      <NpsStat npsRates={npsRates} />
      {/* {indexDetails.map((indexDetail, i) => (
        <ReviewStat key={i} label={indexDetail.label} index={indexDetail.index} radius={80} />
      ))} */}
    </div>
  );
};
