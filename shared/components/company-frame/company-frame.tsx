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
          <div className={classes.companyName}>{profile.name}</div>
          <CompanyDetailItem
            icon={<SupervisorAccountIcon />}
            label={'Létszám'}
            value={`${profile.details.employees.value} fő`}
            change={profile.details.employees.change}
          />
          <CompanyDetailItem
            icon={<AutorenewIcon />}
            label={'Éves forgalom'}
            value={`${profile.details.yearlyIncome.value} HUF`}
            change={profile.details.yearlyIncome.change}
          />
          {profile?.details?.taxNumber && (
            <CompanyDetailItem
              icon={<AssignmentIcon />}
              label={'Adószám'}
              value={`${profile.details.taxNumber.substring(0, 8)}-${profile.details.taxNumber.substring(
                8,
                9,
              )}-${profile.details.taxNumber.substring(9, 12)}`}
            />
          )}

          <CompanyDetailItem icon={<PlaceIcon />} label={'Cím'} value={profile.details.address} />
          <CompanyDetailItem
            icon={<SettingsIcon />}
            label={'Főprofil'}
            value={t(`MAIN_PROFILES.${profile.details.mainProfile}`)}
          />
          <a
            href={`${profile.website.startsWith('http') ? '' : '//'}${profile.website}`}
            target="_blank"
            rel="noreferrer"
          >
            <CompanyDetailItem icon={<LanguageIcon />} label={'Honlap'} value={profile.website} />
          </a>
          <CompanyDetailItem icon={<AssignmentIndIcon />} label={'Kapcsolódó profilok'} value={''} />
          {/* TODO: kapcsolódó profilok listáját bekötni */}
          <div>
            {profile.fb && (
              <a href={`${profile.fb.startsWith('http') ? '' : '//'}${profile.fb}`} target="_blank" rel="noreferrer">
                <SocialIcon type={'facebook'} />
              </a>
            )}
            {profile.insta && (
              <a
                href={`${profile.insta.startsWith('http') ? '' : '//'}${profile.insta}`}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon type={'insta'} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={`${profile.linkedin.startsWith('http') ? '' : '//'}${profile.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon type={'linkedin'} />
              </a>
            )}
          </div>

          <div className={classes.separator}></div>

          <div className={classes.blockLabel}>Termékek és szolgáltatások</div>

          <div className={classes.chipBlock}>
            {productsAndServices.map((product, i) => (
              <Chip key={i} text={product.name} />
            ))}
          </div>

          <div className={classes.separator}></div>

          <div className={classes.blockLabel}>Kapcsolattartó</div>

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
