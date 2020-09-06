import { Tooltip } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import WidgetsIcon from '@material-ui/icons/Widgets';
import WorkIcon from '@material-ui/icons/Work';
import EditIcon from '@material-ui/icons/Edit';
import { FC } from 'react';
import classes from './company-header.module.scss';
import { ECompanyTypes } from '@codingsans/bixindex-common';

interface CompanyHeaderProps {
  title: string;
  logoPath: string;
  companyType: ECompanyTypes;
}

export const CompanyHeader: FC<CompanyHeaderProps> = ({ title, logoPath, companyType }) => {
  return (
    <div className={classes.companyHeader}>
      <div className={classes.companyHeaderTitle}>
        <div className={classes.companyHeaderLogo}>
          <img alt={title} src={logoPath} />
        </div>
        <div className={classes.companyHeaderText}>
          <span>{title}</span>
          {companyType === ECompanyTypes.COMPANY && (
            <Tooltip title="Cég" placement="top" arrow>
              <WorkIcon className={classes.companyTypeIcon} />
            </Tooltip>
          )}
          {companyType === ECompanyTypes.SHOP && (
            <Tooltip title="Termék" placement="top" arrow>
              <WidgetsIcon className={classes.companyTypeIcon} />
            </Tooltip>
          )}
          {companyType === ECompanyTypes.BRAND && (
            <Tooltip title="Brand" placement="top" arrow>
              <LoyaltyIcon className={classes.companyTypeIcon} />
            </Tooltip>
          )}
        </div>
      </div>
      <div className={classes.companyHeaderLinksLine}>
        <button type="button" className={classes.companyWriteReview}>
          Értékelés írása <EditIcon className={classes.reviewIcon} />
        </button>
        <div className={classes.companyHeaderLinks}>
          <div className={`${classes.companyHeaderLink} ${classes.active}`}>Értékelések</div>
          <div className={classes.companyHeaderLink}>Díjak</div>
          <div className={classes.companyHeaderLink}>Hírek</div>
          <div className={classes.companyHeaderLink}>Termékek/szolgáltatások</div>
        </div>
      </div>
    </div>
  );
};
