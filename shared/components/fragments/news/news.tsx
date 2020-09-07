import { FC } from 'react';
import classes from './news.module.scss';

interface NewsProps {}

export const News: FC<NewsProps> = () => {
  return <div className={classes.news}>NEWS</div>;
};
