import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GradeIcon from '@material-ui/icons/Grade';
import LanguageIcon from '@material-ui/icons/Language';
import PlaceIcon from '@material-ui/icons/Place';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { FC } from 'react';
import { useTranslate } from '../../translate.context';
import { convertLinkToAbsolute } from '../../utils/link-to-absolute';
import { Chip } from '../chip/chip';
import { CompanyDetailItem } from '../company-detail-item/company-detail-item';
import { ContactItem } from '../contact-item/contact-item';
import { SocialIcon } from '../social-icon/social-icon';
import classes from './company-frame.module.scss';

/* eslint-disable @typescript-eslint/no-explicit-any  */
interface CompanyFrameProps {
  profile: any;
  productsAndServices: any[];
  stats: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
// TODO missing typing

export const CompanyFrame: FC<CompanyFrameProps> = ({ children, profile, productsAndServices, stats }) => {
  const { t, i18n } = useTranslate();

  return (
    <div className={classes.companyFrame}>
      <div className={classes.companySidebar}>
        <div className={classes.ratingBlock}>
          <div>
            {Array(5)
              .fill(0)
              .map((_, i) => {
                return (
                  <GradeIcon
                    key={i}
                    className={`${classes.ratingStar}${
                      Math.round(stats.index.score / 2) > i ? ` ${classes.ratingStarActive}` : ''
                    }`}
                  />
                );
              })}
          </div>
          <div className={classes.captionText}>Bizalmi index</div>
          <div className={classes.ratingCounter}>{(stats.index.score as number)?.toFixed(2)}</div>
          <div className={classes.captionText}>ÖSSZESEN {stats.index.ratingCount} DB ÉRTÉKELÉS</div>
        </div>

        <div className={classes.detailsTitle}>Cégadatok</div>
        <div className={classes.detailsBlock}>
          <div className={classes.companyName}>{profile.companyName}</div>
          <CompanyDetailItem
            icon={<SupervisorAccountIcon />}
            label={t('COMPANY_FRAME.EMPLOYEE_NUMBER')}
            value={`${profile.details.employees.value} ${t('COMPANY_FRAME.PEOPLE')}`}
            change={profile.details.employees.change}
            modalTitle={t('COMPANY_FRAME.EMPLOYEE_MODAL_TITLE')}
          />
          <CompanyDetailItem
            icon={<AutorenewIcon />}
            label={t('COMPANY_FRAME.YEARLY_INCOME')}
            value={`${profile.details.yearlyIncome.value.toLocaleString()} HUF`}
            change={profile.details.yearlyIncome.change.toLowerCase()}
            modalTitle={t('COMPANY_FRAME.INCOME_MODAL_TITLE')}
            modalChartData={profile.details.revenueHistory}
          />
          {profile?.details?.taxNumber && (
            <CompanyDetailItem
              icon={<AssignmentIcon />}
              label={t('COMPANY_FRAME.TAX_NUMBER')}
              value={`${profile.details.taxNumber.substring(0, 8)}-${profile.details.taxNumber.substring(
                8,
                9,
              )}-${profile.details.taxNumber.substring(9, 12)}`}
            />
          )}

          <CompanyDetailItem icon={<PlaceIcon />} label={t('COMPANY_FRAME.ADDRESS')} value={profile.details.address} />
          <CompanyDetailItem
            icon={<SettingsIcon />}
            label={t('COMPANY_FRAME.MAIN_PROFILE')}
            value={t(`MAIN_CATEGORIES.${profile.companyIndustry}`)}
          />
          <a href={convertLinkToAbsolute(profile.website)} target="_blank" rel="noreferrer">
            <CompanyDetailItem icon={<LanguageIcon />} label={t('COMPANY_FRAME.WEBSITE')} value={profile.website} />
          </a>
          <CompanyDetailItem icon={<AssignmentIndIcon />} label={t('COMPANY_FRAME.RELATED_PROFILES')} value={''} />
          {/* TODO: kapcsolódó profilok listáját bekötni */}
          <div>
            {profile.fb && (
              <a href={convertLinkToAbsolute(profile.fb)} target="_blank" rel="noreferrer">
                <SocialIcon type={'facebook'} />
              </a>
            )}
            {profile.insta && (
              <a href={convertLinkToAbsolute(profile.insta)} target="_blank" rel="noreferrer">
                <SocialIcon type={'insta'} />
              </a>
            )}
            {profile.linkedin && (
              <a href={convertLinkToAbsolute(profile.linkedin)} target="_blank" rel="noreferrer">
                <SocialIcon type={'linkedin'} />
              </a>
            )}
            {profile.tiktok && (
              <a href={convertLinkToAbsolute(profile.tiktok)} target="_blank" rel="noreferrer">
                <SocialIcon type={'tiktok'} />
              </a>
            )}
          </div>

          <div className={classes.separator}></div>

          <div className={classes.blockLabel}>{t('COMPANY_FRAME.PRODUCTS_SERVICES')}</div>

          <div className={classes.chipBlock}>
            {productsAndServices.map((product, i) => (
              <Chip key={i} text={product.name} />
            ))}
          </div>

          <div className={classes.separator}></div>

          <div className={classes.blockLabel}>{t('COMPANY_FRAME.CONTACT')}</div>

          {profile.contacts.map((contact, i) => (
            <ContactItem
              key={i}
              image={contact.image}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
            />
          ))}
        </div>
      </div>

      <div className={classes.companyContent}>{children}</div>
    </div>
  );
};
