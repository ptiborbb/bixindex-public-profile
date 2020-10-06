import { FC } from 'react';
import { ReviewRatio } from '../review-ratio/review-ratio';
import classes from './reviews-header.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

interface ReviewsHeaderProps {
  companyAlias: string;
  companyFormID: string;
  stats: any;
}

export const ReviewsHeader: FC<ReviewsHeaderProps> = ({ companyAlias, companyFormID, stats }) => {
  return (
    <div className={classes.reviewsHeader}>
      <div className={classes.reviewsSummary}>
        <ReviewRatio value={Math.round(stats.index.score * 10) / 10} />
        <div className={classes.reviewsCount}>{stats.index.ratingCount} értékelés alapján</div>
      </div>
      <div className={classes.reviewsActions}>
        <a
          type="button"
          className={classes.companyWriteReview}
          href={`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`}
        >
          Értékelés írása <EditIcon className={classes.reviewIcon} />
        </a>
      </div>
    </div>
  );
};
