import { Grade, GradeOutlined } from '@material-ui/icons';
import { FC, useMemo } from 'react';
import classes from './star-counter.module.scss';

interface StarCounterProps {
  stars: number;
  count: number;
}

export const StarCounter: FC<StarCounterProps> = ({ stars, count }) => {
  const starOptions = useMemo(() => Array.from({ length: 5 }).map((_, i) => ({ isActive: i <= stars })), [stars]);

  return (
    <div className={classes.starCounter}>
      {starOptions.map((option, i) =>
        option.isActive ? (
          <Grade key={i} className={classes.star} />
        ) : (
          <GradeOutlined key={i} className={classes.star} />
        ),
      )}
      <span className={classes.counter}>{count}</span>
    </div>
  );
};
