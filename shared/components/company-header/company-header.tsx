import { Tooltip } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import WidgetsIcon from '@material-ui/icons/Widgets';
import WorkIcon from '@material-ui/icons/Work';
import EditIcon from '@material-ui/icons/Edit';
import { FC } from 'react';
import classes from './company-header.module.scss';
import { ECompanyTypes } from '@codingsans/bixindex-common';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CompanyHeaderProps {
  title: string;
  logoPath: string;
  companyType: ECompanyTypes;
}

export const CompanyHeader: FC<CompanyHeaderProps> = ({ title, logoPath, companyType }) => {
  const router = useRouter();
  const [companyAlias] = (router?.query?.slug as string[]) || [];
  console.log({ companyAlias });
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
          <Link href="[...slug]#reviews" as={`${companyAlias}#reviews`} passHref>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Értékelések</a>
          </Link>
          <Link href="[...slug]#awards" as={`${companyAlias}#awards`} passHref>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Díjak</a>
          </Link>
          <Link href="[...slug]#news" as={`${companyAlias}#news`} passHref>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Hírek</a>
          </Link>
          <Link href="[...slug]#products" as={`${companyAlias}#products`} passHref>
            <a className={`${classes.companyHeaderLink} ${classes.active}`}>Termékek/szolgáltatások</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
