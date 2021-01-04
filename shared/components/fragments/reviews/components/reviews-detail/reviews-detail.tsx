import { IProduct, IRating, IRatingItem, IService } from '@codingsans/bixindex-common';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import { ArrowLeft, ArrowRight, ExpandLess, ExpandMore, Tune } from '@material-ui/icons';
import { startOfToday, subMonths } from 'date-fns';
import { debounce, sum } from 'lodash';
import React, { FC, useCallback, useState } from 'react';
import { EReviewFilterType } from '../../../../../enums/review-filter-type';
import { ReviewFilter } from '../../../../../interfaces/review-filter';
import { useTranslate } from '../../../../../translate.context';
import { StarCounter } from '../../../../star-counter/star-counter';
import { ReviewItem } from '../review-item/review-item';
import { ReviewStats, ReviewStatsProps } from '../review-stats/review-stats';
import classes from './reviews-detail.module.scss';

interface ReviewsDetailProps {
  filter: ReviewFilter;
  filterChanged: (filters: ReviewFilter) => void;
  productsAndServices: (IProduct | IService)[];
  stats: ReviewStatsProps;
  ratings: IRatingItem[];
  ratingCount: number;
  ratingCountsByValue: number[];
  companyAlias: string;
  companyFormID: string;
  lastRating: IRating;
}

export const ReviewsDetail: FC<ReviewsDetailProps> = ({
  filter,
  filterChanged,
  productsAndServices,
  stats,
  ratings,
  ratingCount,
  ratingCountsByValue,
  companyAlias,
  companyFormID,
  lastRating,
}) => {
  const [opened, setOpened] = useState(true);
  const { t } = useTranslate();

  const changeNameFilter = debounce(
    useCallback(
      (value) => {
        filterChanged({ ...filter, name: value, pageNumber: 1 });
      },
      [filter],
    ),
    500,
  );

  return (
    <div className={classes.reviewsDetail}>
      <div className={classes.reviewsDetailTitle} onClick={() => setOpened(!opened)}>
        {t('REVIEW_DETAILS.DETAILED_DATA')} {opened ? <ExpandLess /> : <ExpandMore />}
      </div>
      {opened && (
        <div className={classes.reviewsDetailContent}>
          <ReviewStats
            npsRates={stats.npsRates}
            index={{ score: stats.index.score, ratingCount: sum(ratingCountsByValue), ratings: ratingCountsByValue }}
            companyAlias={companyAlias}
            companyFormID={companyFormID}
            lastRating={lastRating}
          />
          <div className={classes.statsFooter}>
            <Button onClick={() => setOpened(false)}>{t('REVIEW_DETAILS.HIDE_SUMMARY')}</Button>
          </div>
        </div>
      )}

      <div className={classes.filterTitle}>
        <Tune className="mr-2" /> {t('REVIEW_DETAILS.FILTERS')}
      </div>

      <div className={classes.filterBlock}>
        <div>
          {ratingCountsByValue &&
            ratingCountsByValue.map((count, i) => (
              <div
                key={i}
                onClick={() => {
                  filterChanged({
                    ...filter,
                    stars: filter.stars === i + 1 ? undefined : i + 1,
                    pageNumber: 1,
                    isNPS: filter.stars === i + 1 ? EReviewFilterType.ALL : EReviewFilterType.BIX,
                  });
                }}
                className={filter.stars === i + 1 ? classes.selectedFilter : classes.starLine}
              >
                <StarCounter stars={+i} count={count} />
              </div>
            ))}
        </div>
        <div className="w-50 mx-4 d-flex flex-column justify-content-between">
          <FormControl className={'w-100'} variant="outlined">
            <InputLabel shrink id="ratedReviewLabel" className={classes.shrinkLabel}>
              {t('REVIEW_DETAILS.REVIEW_PRODUCT_SERVICE')}
            </InputLabel>
            <Select
              labelId="ratedReviewLabel"
              value={filter.productOrServiceID}
              onChange={(event) => {
                filterChanged({
                  ...filter,
                  productOrServiceID: event.target.value as string,
                  pageNumber: 1,
                  isNPS: event.target.value ? EReviewFilterType.BIX : EReviewFilterType.ALL,
                });
              }}
              fullWidth
              displayEmpty
              label={t('REVIEW_DETAILS.REVIEW_PRODUCT_SERVICE')}
            >
              <MenuItem value="">
                <em>{t('REVIEW_DETAILS.NONE')}</em>
              </MenuItem>
              {productsAndServices.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={'w-100'} variant="outlined">
            <InputLabel shrink id="arrival-date-select" className={classes.shrinkLabel}>
              {t('REVIEW_DETAILS.ARRIVAL_DATE')}
            </InputLabel>
            <Select
              labelId="arrival-date-select"
              value={filter.date}
              onChange={(event) => {
                filterChanged({ ...filter, date: event.target.value as string, pageNumber: 1 });
              }}
              fullWidth
              displayEmpty
              label={t('REVIEW_DETAILS.ARRIVAL_DATE')}
            >
              <MenuItem value="">
                <em>{t('REVIEW_DETAILS.NONE')}</em>
              </MenuItem>
              <MenuItem value={subMonths(startOfToday(), 1).toJSON()}>
                {t('REVIEW_DETAILS.X_MONTH', { amount: 1 })}
              </MenuItem>
              <MenuItem value={subMonths(startOfToday(), 3).toJSON()}>
                {t('REVIEW_DETAILS.X_MONTH', { amount: 3 })}
              </MenuItem>
              <MenuItem value={subMonths(startOfToday(), 6).toJSON()}>
                {t('REVIEW_DETAILS.X_MONTH', { amount: 6 })}
              </MenuItem>
              <MenuItem value={subMonths(startOfToday(), 12).toJSON()}>
                {t('REVIEW_DETAILS.X_MONTH', { amount: 12 })}
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={t('REVIEW_DETAILS.REVIEWER_NAME')}
            variant="outlined"
            fullWidth
            onChange={(event) => changeNameFilter(event.target.value)}
          />
        </div>
        <div>
          <FormControl>
            <FormLabel>{t('REVIEW_DETAILS.REVIEW_TYPE')}</FormLabel>
            <RadioGroup
              name="isNPS"
              value={filter.isNPS}
              onChange={(event) => {
                filterChanged({ ...filter, isNPS: event.target.value as EReviewFilterType, pageNumber: 1 });
              }}
            >
              <FormControlLabel
                value={EReviewFilterType.ALL}
                control={<Radio />}
                label={t('REVIEW_DETAIL.ALL')}
                disabled={!!filter.stars || !!filter.productOrServiceID}
              />
              <FormControlLabel
                value={EReviewFilterType.BIX}
                control={<Radio />}
                label={t('REVIEW_DETAIL.BIX')}
                disabled={!!filter.stars || !!filter.productOrServiceID}
              />
              <FormControlLabel
                value={EReviewFilterType.NPS}
                control={<Radio />}
                label={t('REVIEW_DETAIL.NPS')}
                disabled={!!filter.stars || !!filter.productOrServiceID}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className={`${ratingCount > 0 ? '' : ` ${classes.hidden}`}`}>
        <div className={`${classes.separator}${ratingCount > 20 ? '' : ` ${classes.hidden}`}`}></div>

        {ratings &&
          ratings.map((rating, i) => <ReviewItem key={i} rating={rating} productsAndServices={productsAndServices} />)}

        <div className={`${classes.pager}${ratingCount > 20 ? '' : ` ${classes.hidden}`}`}>
          <div className={classes.pageNumber}>
            {filter.pageNumber}. {t('REVIEW_DETAILS.PAGE')}
          </div>
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
