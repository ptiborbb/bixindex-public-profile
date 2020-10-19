import { FC, useMemo } from 'react';
import { ReviewRate } from '../review-rate/review-rate';
import { Ratings } from '../review-stats';
import classes from './review-stat.module.scss';

export interface ReviewStatProps {
  label: string;
  index: {
    score: number;
    ratingCount: number;
    ratings: Ratings;
  };
  radius: number;
}

export const ReviewStat: FC<ReviewStatProps> = ({ label, index, radius = 80 }) => {
  const circumference = useMemo(() => radius * 2 * Math.PI, []);
  const percent = useMemo(() => index.score * 10, [index.score]);
  const d = useMemo(() => (radius + 2) * 2, [radius]);
  const r = useMemo(() => d / 2, [d]);

  const offset = useMemo(() => circumference - (percent / 100) * circumference, [circumference, percent]);

  return (
    <div className={classes.reviewStat}>
      <div className={classes.reviewLeft}>
        <div className={classes.label}>{label}</div>
        <div className={classes.gauge}>
          <div className={classes.score}>{index.score}</div>
          <svg className={classes.progressRing} width={d} height={d}>
            <circle
              className={classes.progressRingCircle}
              stroke="#56AAA6"
              strokeWidth="4"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              fill="transparent"
              r={radius}
              cx={r}
              cy={r}
            />
          </svg>
        </div>
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
