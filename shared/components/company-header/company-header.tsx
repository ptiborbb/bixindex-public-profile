import { FC } from 'react';
import classes from './company-header.module.scss';

interface CompanyHeaderProps {}

export const CompanyHeader: FC<CompanyHeaderProps> = () => {
  return <div className={classes.companyHeader}>COMP</div>;
};
