import { Grid } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import Link from 'next/link';
import { FC } from 'react';
import logo from '../../../public/bix_logo.svg';
import { useTranslate } from '../../translate.context';
import classes from './footer.module.scss';

export interface FooterProps {
  logoPath?: string;
}

export const Footer: FC<FooterProps> = ({ logoPath = logo }) => {
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
              {/* <div className={classes.link}>{t('HEADER.FUNCTIONS')}</div>
              <div className={classes.link}>{t('HEADER.SUBSCRIPTION')}</div>
              <div className={classes.link}>{t('HEADER.BLOG')}</div> */}
              <Link href="/cegkereso">
                <div className={classes.link}>{t('HEADER.COMPANY_SEARCH')}</div>
              </Link>
              <Link href="/cegkereso">
                <div className={classes.link}>{t('FOOTER.NAV.LINK')}</div>
              </Link>
            </nav>
          </Grid>
          <Grid item xs={12} md={4} className={classes.contact}>
            <h4 className={classes.title}>{t('FOOTER.CONTACT.TITLE')}</h4>
            <meta name="description" content="Vedd fel velünk a kapcsolatot!" />
            <meta property="og:title" content="Kapcsolat - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
            <meta property="og:description" content="Vedd fel velünk a kapcsolatot!" />
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
