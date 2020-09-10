import { IProduct, IService } from '@codingsans/bixindex-common';
import DateFnsUtils from '@date-io/date-fns';
import { FormControlLabel, ListSubheader, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ChangeEvent, FC, useState } from 'react';
import { ReviewFilter } from '../../../../../interfaces/review-filter';
import { StarCounter } from '../../../../star-counter/star-counter';
import classes from './reviews-detail.module.scss';

interface ReviewsDetailProps {
  filter: ReviewFilter;
  filterChanged: (filters: ReviewFilter) => void;
  products: IProduct[];
  services: IService[];
}

export const ReviewsDetail: FC<ReviewsDetailProps> = ({ filter, filterChanged, products, services }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className={classes.reviewsDetail}>
      <div className={classes.reviewsDetailTitle} onClick={() => setOpened(!opened)}>
        Részletes adatok {opened ? <ExpandLess /> : <ExpandMore />}
      </div>
      {opened && <div className={classes.reviewsDetailContent}>OPENED</div>}

      <div>
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

        <div>
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
    </div>
  );
};
