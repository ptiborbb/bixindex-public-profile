import { FC } from 'react';
import classes from './awards.module.scss';

interface AwardsProps {}

export const Awards: FC<AwardsProps> = () => {
  return <div className={classes.awards}>AWARDS</div>;
};
