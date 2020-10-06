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
              <div className={classes.link}>Legjobb Ügyfélélmény 2020</div>
            </nav>
          </Grid>
          <Grid item xs={12} md={4} className={classes.contact}>
            <h4 className={classes.title}>Kapcsolat</h4>
            <div className={classes.contactTypeContainer}>
              <PhoneIcon />
              <span className={classes.phoneNumber}>+36 20 369 19 52</span>
            </div>
            <div className={classes.contactTypeContainer}>
              <MailIcon />
              <span>office@bixindex.hu</span>
            </div>
            <div className={classes.contactTypeContainer}>
              <LocationOnIcon />
              <span>1095 Budapest, Soroksári út 48. 10.ép. 2.em. 20.</span>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};
