import { IProduct, IService } from '@codingsans/bixindex-common';
import DateFnsUtils from '@date-io/date-fns';
import {
  Fab,
  FormControlLabel,
  FormLabel,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import { ArrowLeft, ArrowRight, ExpandLess, ExpandMore, Share, ThumbDown, ThumbUp, Tune } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ChangeEvent, FC, useState } from 'react';
import { ReviewFilter } from '../../../../../interfaces/review-filter';
import { StarCounter } from '../../../../star-counter/star-counter';
import classes from './reviews-detail.module.scss';
import avatar from '../../../../../../public/avatar.png';
import fbIcon from '../../../../../../public/social/f_icon.svg';
import inIcon from '../../../../../../public/social/in_icon.svg';
import { Chip } from '../../../../chip/chip';
import { ReviewStats, ReviewStatsProps } from '../review-stats/review-stats';

interface ReviewsDetailProps {
  filter: ReviewFilter;
  filterChanged: (filters: ReviewFilter) => void;
  products: IProduct[];
  services: IService[];
  stats: ReviewStatsProps;
}

export const ReviewsDetail: FC<ReviewsDetailProps> = ({ filter, filterChanged, products, services, stats }) => {
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
          <span onClick={() => filterChanged({ ...filter, stars: 5 })}>
            <StarCounter stars={5} count={42} />
          </span>
          <span onClick={() => filterChanged({ ...filter, stars: 4 })}>
            <StarCounter stars={4} count={42} />
          </span>
          <span onClick={() => filterChanged({ ...filter, stars: 3 })}>
            <StarCounter stars={3} count={42} />
          </span>
          <span onClick={() => filterChanged({ ...filter, stars: 2 })}>
            <StarCounter stars={2} count={42} />
          </span>
          <span onClick={() => filterChanged({ ...filter, stars: 1 })}>
            <StarCounter stars={1} count={42} />
          </span>
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

      <div className={classes.reviewCard}>
        <div className={classes.reviewerInfo}>
          <div className={classes.avatar}>
            <img alt={'Joska Pista'} src={avatar} />
          </div>
          <div className={classes.reviewer}>
            <div className={classes.name}>Joska Pista</div>
            <div className={classes.role}>Ügyvezető: Cégnév</div>
          </div>
          <div className={classes.details}>
            <div className={classes.ratingLine}>
              <StarCounter stars={5} /> <span className={classes.rating}>9.4</span>
            </div>
            <div className={classes.date}>Ellenőrzés dátuma: 2018.12.11</div>
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
        <div className={classes.npsInfo}>NPS: Ajánló</div>
        <div className={classes.goodReview}>
          <ThumbUp className={`${classes.thumbIcon} ${classes.thumbGreen}`} />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
        <div className={classes.badReview}>
          <ThumbDown className={`${classes.thumbIcon} ${classes.thumbRed}`} />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
        <div className={classes.product}>
          <div className={classes.productTitle}>Értékelt termékek</div>
          <div className={classes.chips}>
            <Chip text={'MRD+ vezetői klub'} />
          </div>
        </div>
      </div>

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
