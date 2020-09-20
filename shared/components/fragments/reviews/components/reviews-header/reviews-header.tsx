import { FC } from 'react';
import { ReviewRatio } from '../review-ratio/review-ratio';
import classes from './reviews-header.module.scss';
import EditIcon from '@material-ui/icons/Edit';

interface ReviewsHeaderProps {
  rating: {
    value: number;
    count: number;
  };
}

export const ReviewsHeader: FC<ReviewsHeaderProps> = ({ rating }) => {
  return (
    <div className={classes.reviewsHeader}>
      <div className={classes.reviewsSummary}>
        <ReviewRatio value={rating.value} />
        <div>{rating.count} értékelés alapján</div>
      </div>
      <div className={classes.reviewsActions}>
        <button type="button" className={classes.companyWriteReview}>
          Értékelés írása <EditIcon className={classes.reviewIcon} />
        </button>
      </div>
    </div>
  );
};
