import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import React, { FC, useMemo } from 'react';
import { useTranslate } from '../../../../../../translate.context';
import { ReviewRate } from '../review-rate/review-rate';
import classes from './review-stat.module.scss';

export interface ReviewStatProps {
  label: string;
  index: {
    score: number;
    ratingCount: number;
    ratings: number[];
  };
  radius: number;
}

export const ReviewStat: FC<ReviewStatProps> = ({ label, index, radius = 80 }) => {
  const { t } = useTranslate();
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
          <div className={classes.score}>{index.score.toFixed(2)}</div>
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
        <ReviewRate
          ratingCount={index.ratingCount}
          rating={index.ratings[4]}
          emoji={<SentimentVerySatisfiedIcon />}
          label={t('REVIEW_STAT.OUTSTANDING')}
        />
        <ReviewRate
          ratingCount={index.ratingCount}
          rating={index.ratings[3]}
          emoji={<SentimentSatisfiedIcon />}
          label={t('REVIEW_STAT.GOOD')}
        />
        <ReviewRate
          ratingCount={index.ratingCount}
          rating={index.ratings[2]}
          emoji={<SentimentDissatisfiedIcon />}
          label={t('REVIEW_STAT.AVERAGE')}
        />
        <ReviewRate
          ratingCount={index.ratingCount}
          rating={index.ratings[1]}
          emoji={<SentimentVeryDissatisfiedIcon />}
          label={t('REVIEW_STAT.BAD')}
        />
      </div>
    </div>
  );
};
