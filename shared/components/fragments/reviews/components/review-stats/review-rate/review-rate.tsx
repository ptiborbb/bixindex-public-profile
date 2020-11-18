import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { FC, useMemo } from 'react';
import classes from './review-rate.module.scss';

export interface ReviewRateProps {
  ratingCount: number;
  rating: number;
  emoji: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  label: string;
}

export const ReviewRate: FC<ReviewRateProps> = ({ ratingCount, rating, emoji, label }) => {
  const ratio = useMemo(() => ((rating / ratingCount) * 100).toFixed(2), [rating, ratingCount]);
  return (
    <div className={classes.reviewRate}>
      <div className={classes.ratio}>{ratio}%</div>
      <div className={classes.lineWrapper}>
        <div className={classes.label}>{label}</div>
        <div className={classes.line}>
          <div className={classes.innerLine} style={{ width: `${ratio}%` }}></div>
        </div>
      </div>

      <div className={classes.emoji}>{emoji}</div>
    </div>
  );
};
