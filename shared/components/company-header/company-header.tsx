import { ECompanyTypes } from '@codingsans/bixindex-common';
import { Hidden, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import WidgetsIcon from '@material-ui/icons/Widgets';
import WorkIcon from '@material-ui/icons/Work';
import Link from 'next/link';
import { FC } from 'react';
import { ContentSegmentTypes } from '../../pages/public-profile/hooks/use-content-segment';
import { useCompanyIdentity } from '../../utils/use-company-identity';
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
  const { by } = useCompanyIdentity();

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
          href={`/bix-profil/[companyAlias]/ertekeles/[companyFormID]?by=${by}`}
          as={`/bix-profil/${companyAlias}/ertekeles/${companyFormID}?by=${by}`}
          passHref
        >
          <a type="button" className={classes.companyWriteReview}>
            Értékelés írása <EditIcon className={classes.reviewIcon} />
          </a>
        </Link>

        <div className={classes.companyHeaderLinks}>
          <Hidden mdDown>
            <div onClick={() => activate(ContentSegmentTypes.REVIEWS)}>
              <a
                className={`${classes.companyHeaderLink} ${
                  activeTab === ContentSegmentTypes.REVIEWS ? classes.active : ''
                }`}
              >
                Értékelések
              </a>
            </div>
            <div onClick={() => activate(ContentSegmentTypes.AWARDS)}>
              <a
                className={`${classes.companyHeaderLink} ${
                  activeTab === ContentSegmentTypes.AWARDS ? classes.active : ''
                }`}
              >
                Díjak
              </a>
            </div>
            <div onClick={() => activate(ContentSegmentTypes.NEWS)}>
              <a
                className={`${classes.companyHeaderLink} ${
                  activeTab === ContentSegmentTypes.NEWS ? classes.active : ''
                }`}
              >
                Hírek
              </a>
            </div>
            <div onClick={() => activate(ContentSegmentTypes.PRODUCTS)}>
              <a
                className={`${classes.companyHeaderLink} ${
                  activeTab === ContentSegmentTypes.PRODUCTS ? classes.active : ''
                }`}
              >
                Termékek/szolgáltatások
              </a>
            </div>
          </Hidden>
        </div>
      </div>
    </div>
  );
};
