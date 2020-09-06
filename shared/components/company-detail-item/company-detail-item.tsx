import { FC } from 'react';
import classes from './company-detail-item.module.scss';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

interface CompanyDetailItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
  change?: 'up' | 'down';
}

export const CompanyDetailItem: FC<CompanyDetailItemProps> = ({ icon, label, value, change }) => {
  return (
    <div className={classes.companyDetailItem}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.companyDetailData}>
        <div className={classes.label}>{label}</div>
        <div className={classes.value}>
          {value}{' '}
          {change === 'up' ? (
            <TrendingUpIcon className={classes.trendUp} />
          ) : change === 'down' ? (
            <TrendingDownIcon className={classes.trendDown} />
          ) : undefined}
        </div>
      </div>
    </div>
  );
};
