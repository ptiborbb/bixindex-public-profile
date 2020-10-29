import { FC } from 'react';
import classes from './award.module.scss';

interface AwardProps {
  image: string;
  date: Date;
  title: string;
  description: string;
}

export const Award: FC<AwardProps> = ({ image, date, title, description }) => {
  return (
    <div className={classes.award}>
      <div className={classes.image} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={classes.body}>
        <div className={classes.type}>
          Díj<span className={classes.date}>{date}</span>
        </div>
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};
