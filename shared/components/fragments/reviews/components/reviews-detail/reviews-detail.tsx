import { IProduct, IService } from '@codingsans/bixindex-common';
import { Button } from '@material-ui/core';
import { ArrowLeft, ArrowRight, ExpandLess, ExpandMore, Tune } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import { RatingItem } from '../../../../../interfaces/profile-page';
import { ReviewFilter } from '../../../../../interfaces/review-filter';
import { useTranslate } from '../../../../../translate.context';
import { StarCounter } from '../../../../star-counter/star-counter';
import { ReviewItem } from '../review-item/review-item';
import { ReviewStats, ReviewStatsProps } from '../review-stats/review-stats';
import classes from './reviews-detail.module.scss';

interface ReviewsDetailProps {
  filter: ReviewFilter;
  filterChanged: (filters: ReviewFilter) => void;
  products: IProduct[];
  services: IService[];
  stats: ReviewStatsProps;
  ratings: RatingItem[];
  ratingCount: number;
  ratingCountsByValue: number[];
  companyAlias: string;
  companyFormID: string;
}

export const ReviewsDetail: FC<ReviewsDetailProps> = ({
  filter,
  filterChanged,
  products,
  services,
  stats,
  ratings,
  ratingCount,
  ratingCountsByValue,
  companyAlias,
  companyFormID,
}) => {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslate();
  return (
    <div className={classes.reviewsDetail}>
      <div className={classes.reviewsDetailTitle} onClick={() => setOpened(!opened)}>
        Részletes adatok {opened ? <ExpandLess /> : <ExpandMore />}
      </div>
      {opened && (
        <div className={classes.reviewsDetailContent}>
          <ReviewStats
            npsRates={stats.npsRates}
            index={{ score: stats.index.score, ratingCount, ratings: ratingCountsByValue }}
            lastReview={ratings[0]?.date || '-'}
            companyAlias={companyAlias}
            companyFormID={companyFormID}
          />
          <div className={classes.statsFooter}>
            <Button onClick={() => setOpened(false)}>{t('REVIEW_DETAILS.HIDE_SUMMARY')}</Button>
          </div>
        </div>
      )}

      <div className={classes.filterTitle}>
        <Tune /> Szűrők
      </div>

      <div className={classes.filterBlock}>
        <div>
          {ratingCountsByValue &&
            ratingCountsByValue.map((count, i) => (
              <div
                key={i}
                onClick={() => {
                  filterChanged({ ...filter, stars: filter.stars === i + 1 ? undefined : i + 1, pageNumber: 1 });
                }}
                className={filter.stars === i + 1 ? classes.selectedFilter : ''}
              >
                <StarCounter stars={+i} count={count} />
              </div>
            ))}
        </div>
      </div>

      <div className={`${ratingCount > 0 ? '' : ` ${classes.hidden}`}`}>
        <div className={`${classes.separator}${ratingCount > 20 ? '' : ` ${classes.hidden}`}`}></div>

        {ratings && ratings.map((rating, i) => <ReviewItem key={i} rating={rating} />)}

        <div className={`${classes.pager}${ratingCount > 20 ? '' : ` ${classes.hidden}`}`}>
          <div className={classes.pageNumber}>{filter.pageNumber}. oldal</div>
          <div
            onClick={() => {
              filterChanged({ ...filter, pageNumber: filter.pageNumber - 1 });
            }}
            className={`${classes.prev}${filter.pageNumber > 1 ? '' : ` ${classes.hidden}`}`}
          >
            <ArrowLeft />
          </div>
          <div
            onClick={() => {
              filterChanged({ ...filter, pageNumber: filter.pageNumber + 1 });
            }}
            className={`${classes.next}${filter.pageNumber * 20 < ratingCount ? '' : ` ${classes.hidden}`}`}
          >
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};
