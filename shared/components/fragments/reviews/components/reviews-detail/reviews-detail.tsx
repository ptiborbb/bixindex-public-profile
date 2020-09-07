import { FC, useState } from 'react';
import { ReviewRatio } from '../review-ratio/review-ratio';
import classes from './reviews-detail.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import { Accordion } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

interface ReviewsDetailProps {}

export const ReviewsDetail: FC<ReviewsDetailProps> = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className={classes.reviewsDetail}>
      <div className={classes.reviewsDetailTitle} onClick={() => setOpened(!opened)}>
        Részletes adatok {opened ? <ExpandLess /> : <ExpandMore />}
      </div>
      {opened && <div className={classes.reviewsDetailContent}>OPENED</div>}
    </div>
  );
};
