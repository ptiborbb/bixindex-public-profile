import { Grid } from '@material-ui/core';
import { FC } from 'react';
import { useTranslate } from '../../translate.context';
import classes from './footer.module.scss';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export interface FooterProps {
  logoPath: string;
}

export const Footer: FC<FooterProps> = ({ logoPath }) => {
  const { t } = useTranslate();
  return (
    <footer className={classes.footer}>
      <div className="container">
        <Grid container>
          <Grid item xs={12} md={4} className={classes.logo}>
            <img alt="bix-logo" src={logoPath} />
          </Grid>
          <Grid item xs={12} md={4}>
            <nav>
              <div className={classes.link}>{t('HEADER.FUNCTIONS')}</div>
              <div className={classes.link}>{t('HEADER.SUBSCRIPTION')}</div>
              <div className={classes.link}>{t('HEADER.BLOG')}</div>
              <div className={classes.link}>{t('HEADER.COMPANY_SEARCH')}</div>
              <div className={classes.link}>{t('FOOTER.NAV.LINK')}</div>
            </nav>
          </Grid>
          <Grid item xs={12} md={4} className={classes.contact}>
            <h4 className={classes.title}>{t('FOOTER.CONTACT.TITLE')}</h4>
            <div className={classes.contactTypeContainer}>
              <PhoneIcon />
              <span className={classes.phoneNumber}>{t('FOOTER.CONTACT.PHONE_NUMBER')}</span>
            </div>
            <div className={classes.contactTypeContainer}>
              <MailIcon />
              <span>{t('FOOTER.CONTACT.EMAIL')}</span>
            </div>
            <div className={classes.contactTypeContainer}>
              <LocationOnIcon />
              <span>{t('FOOTER.CONTACT.ADDRESS')}</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};
