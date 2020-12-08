import { IRating } from '@codingsans/bixindex-common';
import { Edit } from '@material-ui/icons';
import format from 'date-fns/format';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useTranslate } from '../../../../../translate.context';
import { NpsStat } from './nps-stat/nps-stat';
import { ReviewStat } from './review-stat/review-stat';
import classes from './review-stats.module.scss';

export interface Ratings {
  excellent: number;
  good: number;
  mediocre: number;
  bad: number;
}

export interface ReviewStatsProps {
  index: {
    score: number;
    ratingCount: number;
    ratings: number[];
  };
  indexDetails?: {
    label: string;
    index: {
      score: number;
      ratingCount: number;
      ratings: Ratings;
    };
  }[];
  npsRates: [number, number, number, number, number, number, number, number, number, number, number];
  companyAlias: string;
  companyFormID: string;
  lastRating: IRating;
}

export const ReviewStats: FC<ReviewStatsProps> = ({
  index,
  indexDetails,
  npsRates,
  companyAlias,
  companyFormID,
  lastRating,
}) => {
  const router = useRouter();
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';
  const { t } = useTranslate();
  return (
    <div className={classes.reviewStats}>
      <ReviewStat label={'Bizalmi index'} index={index} radius={80} />
      <div className={classes.writeReview}>
        <div className={classes.writeReviewHeader}>
          <Edit /> {t('REVIEW_STATS.WRITE_REVIEW')}
        </div>
        <div className="d-flex justify-content-between px-5 py-5 align-items-center">
          <span>{t('REVIEW_STATS.DONT_BE_AFRAID')}</span>
          <Link
            href={{ pathname: '/bix-profil/[companyAlias]/ertekeles/[companyFormID]', query: { by: by as string } }}
            as={`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`}
            passHref
          >
            <a type="button" className={classes.companyWriteReview}>
              {t('REVIEW_STATS.WRITE_REVIEW')} <Edit className={classes.reviewIcon} />
            </a>
          </Link>
        </div>
        <div className="d-flex justify-content-end pr-5">
          {t('REVIEW_STATS.LAST_REVIEW_DATE')}:
          {lastRating ? format(new Date(lastRating?.dateOfCreation), 'yyyy.MM.dd. HH:mm') : '-'}
        </div>
      </div>
      <NpsStat npsRates={npsRates} />
      {/* {indexDetails.map((indexDetail, i) => (
        <ReviewStat key={i} label={indexDetail.label} index={indexDetail.index} radius={80} />
      ))} */}
    </div>
  );
};
