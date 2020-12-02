import { IProduct, IRatingItem, IService } from '@codingsans/bixindex-common';
import { Avatar, Divider, Fab } from '@material-ui/core';
import { QuestionAnswer, Share, ThumbDown, ThumbUp } from '@material-ui/icons';
import React, { FC, useMemo } from 'react';
import verifiedUser from '../../../../../../public/images/verified_user.png';
import fbIcon from '../../../../../../public/social/f_icon.svg';
import inIcon from '../../../../../../public/social/in_icon.svg';
import { useTranslate } from '../../../../../translate.context';
import { NpsText } from '../../../../nps-text/nps-text';
import { StarCounter } from '../../../../star-counter/star-counter';
import classes from './review-item.module.scss';

interface ReviewItemProps {
  rating: IRatingItem;
  productsAndServices: (IProduct & IService)[];
}

export const ReviewItem: FC<ReviewItemProps> = ({ rating, productsAndServices }) => {
  const { t } = useTranslate();

  const ratedProductOrService = useMemo(
    () => productsAndServices.find((item) => item.id === (rating?.productID || rating?.serviceID)),
    [rating],
  );

  return (
    <div className={classes.reviewCard}>
      <div className={classes.reviewerInfo}>
        <Avatar src={rating.logo || verifiedUser} className={classes.avatar} />
        <div className={classes.reviewer}>
          <div className={classes.name}>{rating.name || 'ELLENŐRZÖTT REFERENCIA'}</div>
          <div className={classes.oneSenteceComment}>
            <div>{rating.summary}</div>
          </div>
        </div>
        <div className={classes.details}>
          <div className={classes.ratingLine}>
            {rating.value && <StarCounter stars={Math.ceil(rating.value / 2) - 1} />}
            <span className={classes.rating}>{Math.round(rating.value * 10) / 10 || 'NPS'}</span>
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
      <div className={classes.npsInfo}>
        <span className={classes.npsLabel}>{'NPS: '}</span>
        <NpsText nps={rating.nps} />
      </div>
      <meta
        name="description"
        content="Mérd fel beszállítóid, megrendelőid, végfelhasználóid gazdasági helyzetét, és a COVID19 partnereidre gyakorolt üzleti hatásait a BIX - PSI segítségével!"
      />
      <meta property="og:title" content="Partner Stabilitási Index - BIX - Tudd, hogy állnak a partnereid!" />
      <meta
        property="og:description"
        content="Mérd fel beszállítóid, megrendelőid, végfelhasználóid gazdasági helyzetét, és a COVID19 partnereidre gyakorolt üzleti hatásait a BIX - PSI segítségével!"
      />
      {rating.positive && (
        <div className={classes.goodReview}>
          <ThumbUp className={`${classes.thumbIcon} ${classes.thumbGreen}`} />
          {rating.positive}
        </div>
      )}
      {rating.negative && (
        <div className={classes.badReview}>
          <ThumbDown className={`${classes.thumbIcon} ${classes.thumbRed}`} />
          {rating.negative}
        </div>
      )}
      {ratedProductOrService && (
        <>
          <div className={classes.ratedProductTitle}>{t('REVIEW_ITEM.RATED_PRODUCT')}</div>
          <div className={classes.ratedProduct}>{ratedProductOrService.name}</div>
        </>
      )}
      {rating?.reply?.user?.name && (
        <>
          <span className="d-flex align-items-center mb-2">
            <QuestionAnswer />
            <span className="ml-2">{t('REVIEW_ITEM.REPLY')}</span>
          </span>
          <Divider />
          <div className="d-flex mt-2">
            <Avatar src={rating.reply.user.image} />
            <div className="d-flex flex-column ml-2">
              <span className="font-weight-bold mt-1 mb-4">{rating.reply.user.name}</span>
              <span>{rating.reply.replyText}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
