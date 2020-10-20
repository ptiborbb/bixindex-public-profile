import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ReviewRatio } from '../review-ratio/review-ratio';
import classes from './reviews-header.module.scss';

interface ReviewsHeaderProps {
  companyAlias: string;
  companyFormID: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
}
// TODO missing typings

export const ReviewsHeader: FC<ReviewsHeaderProps> = ({ companyAlias, companyFormID, stats }) => {
  const router = useRouter();
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';

  return (
    <div className={classes.reviewsHeader}>
      <div className={classes.reviewsSummary}>
        <ReviewRatio value={Math.round(stats.index.score * 10) / 10} />
        <div className={classes.reviewsCount}>{stats.index.ratingCount} értékelés alapján</div>
      </div>
      <div className={classes.reviewsActions}>
        <Link
          href={{ pathname: '/bix-profil/[companyAlias]/ertekeles/[companyFormID]', query: { by: by as string } }}
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
