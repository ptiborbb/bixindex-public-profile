import { FC } from 'react';
import classes from './company-detail-item.module.scss';

interface CompanyDetailItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

export const CompanyDetailItem: FC<CompanyDetailItemProps> = ({ icon, label, value }) => {
  return (
    <div className={classes.companyDetailItem}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.companyDetailData}>
        <div className={classes.label}>{label}</div>
        <div className={classes.value}>{value}</div>
      </div>
    </div>
  );
};
