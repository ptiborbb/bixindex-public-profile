import CheckIcon from '@material-ui/icons/Check';
import React, { FC } from 'react';
import classes from './popular-advantage.module.scss';

interface IPopularAdvantageProps {
  deny?: boolean;
  style?: object;
}

export const PopularAdvantage: FC<IPopularAdvantageProps> = ({ deny, style, children }) => (
  <div className={classes.popularAdvantage} style={style}>
    {deny ? <CheckIcon style={{ color: '#BD2849' }} /> : <CheckIcon />}
    {children}
  </div>
);
