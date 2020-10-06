import { ECompanyTypes } from '@codingsans/bixindex-common';
import { Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import WidgetsIcon from '@material-ui/icons/Widgets';
import WorkIcon from '@material-ui/icons/Work';
import Link from 'next/link';
import { FC } from 'react';
import classes from './company-header.module.scss';

interface CompanyHeaderProps {
  companyAlias: string;
  companyFormID: string;
  title: string;
  logoPath: string;
  companyType: ECompanyTypes;
  activate: (fragment: string) => void;
}

export const CompanyHeader: FC<CompanyHeaderProps> = ({
  companyAlias,
  companyFormID,
  title,
  logoPath,
  companyType,
  activate,
}) => {
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
        <a
          type="button"
          className={classes.companyWriteReview}
          href={`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`}
        >
          Értékelés írása <EditIcon className={classes.reviewIcon} />
        </a>
        <div className={classes.companyHeaderLinks}>
          <div onClick={() => activate('reviews')}>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Értékelések</a>
          </div>
          <div onClick={() => activate('awards')}>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Díjak</a>
          </div>
          <div onClick={() => activate('news')}>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Hírek</a>
          </div>
          <div onClick={() => activate('products')}>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Termékek/szolgáltatások</a>
          </div>
        </div>
      </div>
    </div>
  );
};
