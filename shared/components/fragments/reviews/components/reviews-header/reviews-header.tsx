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
        <ReviewRatio value={stats.index.score} />
        <div>{stats.index.ratingCount} értékelés alapján</div>
      </div>
      <div className={classes.reviewsActions}>
        <Link
          href="/bix-profil/[companyAlias]/ertekeles/[companyFormID]"
          as={`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`}
          passHref
        >
          <a type="button" className={classes.companyWriteReview}>
            Értékelés írása <EditIcon className={classes.reviewIcon} />
          </a>
        </Link>
      </div>
    </div>
  );
};
