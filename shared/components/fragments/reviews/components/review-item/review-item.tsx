import { FC } from 'react';
import classes from './review-item.module.scss';
import { RatingItem } from '../../../../../interfaces/profile-page';
import { StarCounter } from '../../../../star-counter/star-counter';
import { Fab } from '@material-ui/core';
import { Share, ThumbDown, ThumbUp } from '@material-ui/icons';
import fbIcon from '../../../../../../public/social/f_icon.svg';
import inIcon from '../../../../../../public/social/in_icon.svg';
import { Chip } from '../../../../chip/chip';
import { npsToText } from '../../../../../utils/nps-to-text';
import avatar from '../../../../../../public/avatar.png';

interface ReviewItemProps {
  rating: RatingItem;
}

export const ReviewItem: FC<ReviewItemProps> = ({ rating }) => {
  return (
    <div className={classes.reviewCard}>
      <div className={classes.reviewerInfo}>
        <div className={classes.avatar}>
          <img alt={rating.name} src={avatar} />
        </div>
        <div className={classes.reviewer}>
          <div className={classes.name}>{rating.name}</div>
          <div className={classes.role}>Ügyvezető: Cégnév</div>
        </div>
        <div className={classes.details}>
          <div className={classes.ratingLine}>
            <StarCounter stars={Math.ceil(rating.value / 2)} />{' '}
            <span className={classes.rating}>{Math.round(rating.value * 10) / 10}</span>
          </div>
          <div className={classes.date}>Ellenőrzés dátuma: {rating.date.split('T')[0]}</div>
          <div className={classes.share}>
            <div className={classes.shareBlock}>
              <div className={classes.shareOptions}>
                <div className={classes.shareFb}>
                  <img alt="facebook" src={fbIcon} />
                </div>
                <div className={classes.shareSeparator}></div>
                <div className={classes.shareIn}>
                  <img alt="linkedin" src={inIcon} />
                </div>
              </div>
              <Fab className={classes.shareButton} size="small" aria-label="share">
                <Share className={classes.shareIcon} />
              </Fab>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.npsInfo}>NPS: {npsToText(rating.nps)}</div>
      <div className={classes.goodReview}>
        <ThumbUp className={`${classes.thumbIcon} ${classes.thumbGreen}`} />
        {rating.positive}
      </div>
      <div className={classes.badReview}>
        <ThumbDown className={`${classes.thumbIcon} ${classes.thumbRed}`} />
        {rating.negative}
      </div>
      <div className={classes.badReview}>
        <div>{rating.summary}</div>
      </div>
    </div>
  );
};
