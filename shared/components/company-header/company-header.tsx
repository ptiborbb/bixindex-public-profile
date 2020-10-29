import { ECompanyTypes } from '@codingsans/bixindex-common';
import { Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import WidgetsIcon from '@material-ui/icons/Widgets';
import WorkIcon from '@material-ui/icons/Work';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import classes from './company-header.module.scss';

interface CompanyHeaderProps {
  companyAlias: string;
  companyFormID: string;
  title: string;
  logoPath: string;
  companyType: ECompanyTypes;
  activeTab?: string;
  activate: (fragment: string) => void;
}

export const CompanyHeader: FC<CompanyHeaderProps> = ({
  companyAlias,
  companyFormID,
  title,
  logoPath,
  companyType,
  activeTab,
  activate,
}) => {
  const router = useRouter();
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';

  return (
    <div className={classes.companyHeader}>
      <div className={classes.companyHeaderTitle}>
        <div className={classes.companyHeaderLogo}>
          {logoPath ? <img alt={title} src={logoPath} /> : <WorkIcon className={classes.companyLogoIcon} />}
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
        <Link
          href={{ pathname: '/bix-profil/[companyAlias]/ertekeles/[companyFormID]', query: { by: by as string } }}
          as={`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`}
          passHref
        >
          <a type="button" className={classes.companyWriteReview}>
            Értékelés írása <EditIcon className={classes.reviewIcon} />
          </a>
        </Link>
        <div className={classes.companyHeaderLinks}>
          <div onClick={() => activate('reviews')}>
            <a className={`${classes.companyHeaderLink} ${activeTab === 'reviews' ? classes.active : ''}`}>
              Értékelések
            </a>
          </div>
          <div onClick={() => activate('awards')}>
            <a className={`${classes.companyHeaderLink} ${activeTab === 'awards' ? classes.active : ''}`}>Díjak</a>
          </div>
          <div onClick={() => activate('news')}>
            <a className={`${classes.companyHeaderLink} ${activeTab === 'news' ? classes.active : ''}`}>Hírek</a>
          </div>
          <div onClick={() => activate('products')}>
            <a className={`${classes.companyHeaderLink} ${activeTab === 'products' ? classes.active : ''}`}>
              Termékek/szolgáltatások
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
