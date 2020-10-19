import { IProduct, IService } from '@codingsans/bixindex-common';
import DateFnsUtils from '@date-io/date-fns';
import {
  FormControlLabel,
  FormLabel,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import { ArrowLeft, ArrowRight, ExpandLess, ExpandMore, Tune } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ChangeEvent, FC, useState } from 'react';
import { RatingItem } from '../../../../../interfaces/profile-page';
import { ReviewFilter } from '../../../../../interfaces/review-filter';
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
  ratingCountsByValue: number[];
}

export const ReviewsDetail: FC<ReviewsDetailProps> = ({
  filter,
  filterChanged,
  products,
  services,
  stats,
  ratings,
  ratingCountsByValue,
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className={classes.reviewsDetail}>
      <div className={classes.reviewsDetailTitle} onClick={() => setOpened(!opened)}>
        Részletes adatok {opened ? <ExpandLess /> : <ExpandMore />}
      </div>
      {opened && (
        <div className={classes.reviewsDetailContent}>
          <ReviewStats {...stats} />
        </div>
      )}

      <div className={classes.filterTitle}>
        <Tune /> Szűrők
      </div>

      <div className={classes.filterBlock}>
        <div>
          {ratingCountsByValue &&
            ratingCountsByValue.map((count, i) => (
              <span key={i} onClick={() => filterChanged({ ...filter, stars: i })}>
                <StarCounter stars={+i} count={count} />
              </span>
            ))}
        </div>

        <div className={classes.filterInputs}>
          <Select
            value={filter.productId}
            onChange={(event: ChangeEvent<{ value: string }>) => {
              const val = event.target.value;
              filterChanged({ ...filter, productId: val, productOrService: 'product' });
            }}
          >
            <ListSubheader>Products</ListSubheader>

            {products.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}

            <ListSubheader>Services</ListSubheader>

            {services.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={filter.date}
              onChange={(date: Date) => filterChanged({ ...filter, date })}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <TextField
            label="Name"
            value={filter.name}
            onChange={(event: ChangeEvent<{ value: string }>) => filterChanged({ ...filter, name: event.target.value })}
          />
        </div>

        <div>
          <FormLabel component="legend">Értékelés típusa</FormLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            value={filter.type}
            onChange={(event: ChangeEvent<{ value: string }>) =>
              filterChanged({ ...filter, type: event.target.value as 'bix' | 'nps' })
            }
          >
            <FormControlLabel value="bix" control={<Radio />} label="BIX" />
            <FormControlLabel value="nps" control={<Radio />} label="NPS" />
          </RadioGroup>
        </div>
      </div>

      <div className={classes.separator}></div>

      {ratings && ratings.map((rating, i) => <ReviewItem key={i} rating={rating} />)}

      <div className={classes.pager}>
        <div className={classes.pageNumber}>1. oldal</div>
        <div className={classes.prev}>
          <ArrowLeft />
        </div>
        <div className={classes.next}>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};
