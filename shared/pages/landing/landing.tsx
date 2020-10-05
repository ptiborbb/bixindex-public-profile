import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import { FunctionComponent } from 'react';
import logo from '../../../public/bix_logo.svg';
import homeHeaderBixImage from '../../../public/images/landing/home-header-bix-image.png';
import indexLogo from '../../../public/images/landing/index-logo.png';
import piacProfitLogo from '../../../public/images/landing/piac-profit-logo.png';
import trendfmLogo from '../../../public/images/landing/trendfm-logo.png';
import vilaggazdasagLogo from '../../../public/images/landing/vilaggazdasag-logo.png';
import { Header } from '../../components/header/header';
import { useTranslate } from '../../translate.context';
import classes from './landing.module.scss';

export const Landing: FunctionComponent = () => {
  const { t } = useTranslate();
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        />
      </Head>
      <div className={classes.headerBlock}>
        <div className={classes.container}>
          <Header logoPath={logo} />
        </div>
        <div className={classes.divider}></div>
        <div className={classes.headerBlockInner}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <h1 className={classes.mainTitle}>{t('LANDING.MAIN_1')}</h1>
              <h1 className={classes.mainTitle}>{t('LANDING.MAIN_2')}</h1>
              <h2 className={classes.desc}>{t('LANDING.MAIN_3')}</h2>
              <Button>{t('LANDING.CTA_1')}</Button>
              <Button variant="text" color="default" className={classes.learnMoreBtn}>
                {t('LANDING.CTA_2')}
              </Button>
              <div className={classes.headerBlockLogos}>
                <a
                  href="https://index.hu/gazdasag/2018/11/23/felmilliard_forint_tiz_startupnak/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={indexLogo} alt="header-icon" />
                </a>
                <a
                  href="https://piacesprofit.hu/kkv_cegblog/baconsult-startup-inkubator-minden-hely-elkelt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={piacProfitLogo} alt="header-icon" />
                </a>
                <a
                  href="https://www.vg.hu/kkv/kkv-hirek/cegenkent-50-millios-tamogatast-kapnak-igeretes-startupok-2-1217998/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={vilaggazdasagLogo} alt="header-icon" />
                </a>
                <a href="https://trendfm.hu/napi_musor?current=2018-11-13" target="_blank" rel="noopener noreferrer">
                  <img src={trendfmLogo} alt="header-icon" />
                </a>
              </div>
            </Grid>
            <Grid item xs={4}>
              <img className={classes.img} src={homeHeaderBixImage} />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.learnMore}>
        <h2 className={classes.title}>{t('LANDING.HEAD_1')}</h2>
        <h4 className={classes.desc}>{t('LANDING.SUBHEAD_1')}</h4>
        <Button>{t('LANDING.CTA_3')}</Button>
      </div>
    </div>
  );
};
