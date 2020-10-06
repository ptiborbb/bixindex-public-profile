import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import { FunctionComponent } from 'react';
import logo from '../../../public/bix_logo.svg';
import b2bRatingImage from '../../../public/images/landing/b2b-rating-image.png';
import barabasArpad from '../../../public/images/landing/barabas-arpad.png';
import cserpesIstvan from '../../../public/images/landing/cserpes-istvan.png';
import customQuestionsIcon from '../../../public/images/landing/custom-questions-icon.png';
import customerGateIcon from '../../../public/images/landing/customer-gate-icon.png';
import customerThoughts from '../../../public/images/landing/customer-thoughts.png';
import emailSignIcon from '../../../public/images/landing/email-sign-icon.png';
import extraDataIcon from '../../../public/images/landing/extra-data-icon.png';
import gatherReviewIcon from '../../../public/images/landing/gather-review-icon.png';
import googleIcon from '../../../public/images/landing/google-icon.png';
import homeHeaderBixImage from '../../../public/images/landing/home-header-bix-image.png';
import horizontalStars from '../../../public/images/landing/horizontal-stars.png';
import iconGears from '../../../public/images/landing/icon-gears.png';
import iconGlass from '../../../public/images/landing/icon-glass.png';
import iconReport from '../../../public/images/landing/icon-report.png';
import iconStars from '../../../public/images/landing/icon-stars.png';
import indexLogo from '../../../public/images/landing/index-logo.png';
import integrationIcon from '../../../public/images/landing/integration-icon.png';
import leadGeneratingIcon from '../../../public/images/landing/lead-generating-icon.png';
import leaderReportExplained from '../../../public/images/landing/leader-report-explained.png';
import leaderReport from '../../../public/images/landing/leader-report.png';
import mainFeaturesDatacontrol from '../../../public/images/landing/main-features-datacontrol.png';
import mainFeaturesGears from '../../../public/images/landing/main-features-gears.png';
import mainFeaturesReport from '../../../public/images/landing/main-features-report.png';
import markovichBela from '../../../public/images/landing/markovich-bela.png';
import onlyGlassIcon from '../../../public/images/landing/only-glass-icon.png';
import opinionGalleryIcon from '../../../public/images/landing/opinion-gallery-icon.png';
import piacProfitLogo from '../../../public/images/landing/piac-profit-logo.png';
import reviewRenewIcon from '../../../public/images/landing/review-renew-icon.png';
import trendfmLogo from '../../../public/images/landing/trendfm-logo.png';
import userCircleIcon from '../../../public/images/landing/user-circle-icon.png';
import vilaggazdasagLogo from '../../../public/images/landing/vilaggazdasag-logo.png';
import { Header } from '../../components/header/header';
import { LandingFeatureCard } from '../../components/landing-feature-card/landing-feature-card';
import { LandingFeatureFlatCard } from '../../components/landing-feature-flat-card/landing-feature-flat-card';
import { LandingTestimonialCard } from '../../components/landing-testimonial-card/landing-testimonial-card';
import { useTranslate } from '../../translate.context';
import classes from './landing.module.scss';

export const Landing: FunctionComponent = () => {
  const { t } = useTranslate();
  return (
    <div className={classes.baseSize}>
      <Head>
        <title>{t('COMMON.PAGE_TITLE')}</title>
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
            <Grid item sm={8}>
              <h1 className={classes.mainTitle}>{t('LANDING.HEAD_BOX.MAIN_1')}</h1>
              <h1 className={classes.mainTitle}>{t('LANDING.HEAD_BOX.MAIN_2')}</h1>
              <h2 className={classes.mainDesc}>{t('LANDING.HEAD_BOX.MAIN_3')}</h2>
              <Button>{t('LANDING.HEAD_BOX.CTA_1')}</Button>
              <Button variant="text" color="default" className={classes.learnMoreBtn}>
                {t('LANDING.HEAD_BOX.CTA_2')}
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
            <Grid item sm={4}>
              <img className={classes.img} src={homeHeaderBixImage} alt="homeHeaderBixImage" />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.learnMore}>
        <h2 className={classes.title}>{t('LANDING.MAIN_FEATURES_BOX.HEAD')}</h2>
        <h4 className={classes.desc}>{t('LANDING.MAIN_FEATURES_BOX.SUBHEAD')}</h4>
        <Button>{t('LANDING.MAIN_FEATURES_BOX.CTA')}</Button>
        <Grid container spacing={3} className={classes.mt40}>
          <Grid item sm={3}>
            <LandingFeatureCard
              icon={mainFeaturesGears}
              title={t('LANDING.MAIN_FEATURES_BOX.FEATURE_1.TITLE')}
              desc={t('LANDING.MAIN_FEATURES_BOX.FEATURE_1.DESC')}
              cta={t('LANDING.MAIN_FEATURES_BOX.FEATURE_1.CTA')}
            ></LandingFeatureCard>
          </Grid>
          <Grid item sm={3}>
            <LandingFeatureCard
              icon={mainFeaturesDatacontrol}
              title={t('LANDING.MAIN_FEATURES_BOX.FEATURE_2.TITLE')}
              desc={t('LANDING.MAIN_FEATURES_BOX.FEATURE_2.DESC')}
              cta={t('LANDING.MAIN_FEATURES_BOX.FEATURE_2.CTA')}
            ></LandingFeatureCard>
          </Grid>
          <Grid item sm={3}>
            <LandingFeatureCard
              icon={mainFeaturesReport}
              title={t('LANDING.MAIN_FEATURES_BOX.FEATURE_3.TITLE')}
              desc={t('LANDING.MAIN_FEATURES_BOX.FEATURE_3.DESC')}
              cta={t('LANDING.MAIN_FEATURES_BOX.FEATURE_3.CTA')}
            ></LandingFeatureCard>
          </Grid>
          <Grid item sm={3}>
            <LandingFeatureCard
              icon={horizontalStars}
              title={t('LANDING.MAIN_FEATURES_BOX.FEATURE_4.TITLE')}
              desc={t('LANDING.MAIN_FEATURES_BOX.FEATURE_4.DESC')}
              cta={t('LANDING.MAIN_FEATURES_BOX.FEATURE_4.CTA')}
            ></LandingFeatureCard>
          </Grid>
        </Grid>
      </div>
      <div className={classes.testimonials}>
        <h2 className={classes.hashtag}>{t('LANDING.MAIN_TESTIMONIAL_BOX.HASHTAG')}</h2>
        <h2 className={classes.title}>{t('LANDING.MAIN_TESTIMONIAL_BOX.HEAD')}</h2>
        <h4 className={classes.desc}>{t('LANDING.MAIN_TESTIMONIAL_BOX.SUBHEAD')}</h4>
        <Grid container spacing={3} className={classes.mt40}>
          <Grid item sm={4}>
            <LandingTestimonialCard
              avatar={barabasArpad}
              name={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_1.NAME')}
              title={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_1.TITLE')}
              desc={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_1.DESC')}
              hashtag={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_1.HASHTAG')}
            ></LandingTestimonialCard>
          </Grid>
          <Grid item sm={4}>
            <LandingTestimonialCard
              avatar={cserpesIstvan}
              name={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_2.NAME')}
              title={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_2.TITLE')}
              desc={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_2.DESC')}
              hashtag={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_2.HASHTAG')}
            ></LandingTestimonialCard>
          </Grid>
          <Grid item sm={4}>
            <LandingTestimonialCard
              avatar={markovichBela}
              name={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_3.NAME')}
              title={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_3.TITLE')}
              desc={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_3.DESC')}
              hashtag={t('LANDING.MAIN_TESTIMONIAL_BOX.TESTIMONIAL_3.HASHTAG')}
            ></LandingTestimonialCard>
          </Grid>
        </Grid>
      </div>
      <div className={classes.highlightedBlock}>
        <div className={classes.highlightedBlockInner}>
          <h1 className={classes.highlightedTitle}>{t('LANDING.HIGHLIGHTED_1.TITLE')}</h1>
          <Button className={classes.highlightedCta}>{t('LANDING.HIGHLIGHTED_1.CTA')}</Button>
        </div>
      </div>
      <div className={classes.heros}>
        <Grid container spacing={5} className={classes.mt40}>
          <Grid item sm={6}>
            <h4 className={classes.heroSubtitle} style={{ backgroundImage: `url(${iconGears})` }}>
              {t('LANDING.HEROS.HERO_1.SUBTITLE')}
            </h4>
            <h2 className={classes.title}>{t('LANDING.HEROS.HERO_1.TITLE')}</h2>
            <h4 className={classes.desc}>{t('LANDING.HEROS.HERO_1.DESC')}</h4>
            <h4 className={classes.desc}>
              <b>{t('LANDING.HEROS.HERO_1.Q')}</b>
            </h4>
            <ul>
              <li>{t('LANDING.HEROS.HERO_1.A.A_1')}</li>
              <li>{t('LANDING.HEROS.HERO_1.A.A_2')}</li>
              <li>{t('LANDING.HEROS.HERO_1.A.A_3')}</li>
              <li>{t('LANDING.HEROS.HERO_1.A.A_4')}</li>
            </ul>
            <div className={classes.mt40}>
              <Button>{t('LANDING.HEROS.HERO_1.CTA.CTA_1')}</Button>
              <Button>{t('LANDING.HEROS.HERO_1.CTA.CTA_2')}</Button>
            </div>
          </Grid>
          <Grid item sm={6}>
            <img className={classes.img} src={customerThoughts} alt="customerThoughts" />
          </Grid>
        </Grid>
        <Grid container spacing={5} className={classes.mt150}>
          <Grid item sm={6}>
            <img className={classes.img} src={leaderReport} alt="customerThoughts" />
          </Grid>
          <Grid item sm={6}>
            <h4 className={classes.heroSubtitle} style={{ backgroundImage: `url(${iconGlass})` }}>
              {t('LANDING.HEROS.HERO_2.SUBTITLE')}
            </h4>
            <h2 className={classes.title}>{t('LANDING.HEROS.HERO_2.TITLE')}</h2>
            <h4 className={classes.desc}>{t('LANDING.HEROS.HERO_2.DESC')}</h4>
            <h4 className={classes.desc}>
              <b>{t('LANDING.HEROS.HERO_2.Q')}</b>
            </h4>
            <ul>
              <li>{t('LANDING.HEROS.HERO_2.A.A_1')}</li>
              <li>{t('LANDING.HEROS.HERO_2.A.A_2')}</li>
              <li>{t('LANDING.HEROS.HERO_2.A.A_3')}</li>
              <li>{t('LANDING.HEROS.HERO_2.A.A_4')}</li>
            </ul>
            <div className={classes.mt40}>
              <Button>{t('LANDING.HEROS.HERO_2.CTA.CTA_1')}</Button>
              <Button>{t('LANDING.HEROS.HERO_2.CTA.CTA_2')}</Button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5} className={classes.mt150}>
          <Grid item sm={6}>
            <h4 className={classes.heroSubtitle} style={{ backgroundImage: `url(${iconReport})` }}>
              {t('LANDING.HEROS.HERO_3.SUBTITLE')}
            </h4>
            <h2 className={classes.title}>{t('LANDING.HEROS.HERO_3.TITLE')}</h2>
            <h4 className={classes.desc}>{t('LANDING.HEROS.HERO_3.DESC')}</h4>
            <h4 className={classes.desc}>
              <b>{t('LANDING.HEROS.HERO_3.Q')}</b>
            </h4>
            <ul>
              <li>{t('LANDING.HEROS.HERO_3.A.A_1')}</li>
              <li>{t('LANDING.HEROS.HERO_3.A.A_2')}</li>
              <li>{t('LANDING.HEROS.HERO_3.A.A_3')}</li>
              <li>{t('LANDING.HEROS.HERO_3.A.A_4')}</li>
            </ul>
            <div className={classes.mt40}>
              <Button>{t('LANDING.HEROS.HERO_3.CTA.CTA_1')}</Button>
              <Button>{t('LANDING.HEROS.HERO_3.CTA.CTA_2')}</Button>
            </div>
          </Grid>
          <Grid item sm={6}>
            <img className={classes.img} src={leaderReportExplained} alt="customerThoughts" />
          </Grid>
        </Grid>
        <Grid container spacing={5} className={classes.mt150}>
          <Grid item sm={6}>
            <img className={classes.img} src={b2bRatingImage} alt="customerThoughts" />
          </Grid>
          <Grid item sm={6}>
            <h4 className={classes.heroSubtitle} style={{ backgroundImage: `url(${iconStars})` }}>
              {t('LANDING.HEROS.HERO_4.SUBTITLE')}
            </h4>
            <h2 className={classes.title}>{t('LANDING.HEROS.HERO_4.TITLE')}</h2>
            <h4 className={classes.desc}>{t('LANDING.HEROS.HERO_4.DESC')}</h4>
            <h4 className={classes.desc}>
              <b>{t('LANDING.HEROS.HERO_4.Q')}</b>
            </h4>
            <ul>
              <li>{t('LANDING.HEROS.HERO_4.A.A_1')}</li>
              <li>{t('LANDING.HEROS.HERO_4.A.A_2')}</li>
              <li>{t('LANDING.HEROS.HERO_4.A.A_3')}</li>
              <li>{t('LANDING.HEROS.HERO_4.A.A_4')}</li>
            </ul>
            <div className={classes.mt40}>
              <Button>{t('LANDING.HEROS.HERO_4.CTA.CTA_1')}</Button>
              <Button>{t('LANDING.HEROS.HERO_4.CTA.CTA_2')}</Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.highlightedBlock}>
        <div className={classes.highlightedBlockInner}>
          <h1 className={classes.highlightedTitle}>{t('LANDING.HIGHLIGHTED_2.TITLE')}</h1>
          <Button className={classes.highlightedCta}>{t('LANDING.HIGHLIGHTED_2.CTA')}</Button>
        </div>
      </div>
      <div className={classes.features}>
        <h2 className={classes.hashtag}>{t('LANDING.FEATURES_BOX.HASHTAG')}</h2>
        <h2 className={classes.title}>{t('LANDING.FEATURES_BOX.HEAD')}</h2>
        <h4 className={classes.desc}>{t('LANDING.FEATURES_BOX.SUBHEAD')}</h4>
        <Grid container spacing={3} className={classes.mt40}>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={googleIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_1.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_1.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_1.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={onlyGlassIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_2.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_2.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_2.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={userCircleIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_3.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_3.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_3.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.mt40}>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={customQuestionsIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_4.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_4.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_4.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={customerGateIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_5.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_5.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_5.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={extraDataIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_6.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_6.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_6.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.mt40}>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={gatherReviewIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_7.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_7.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_7.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={reviewRenewIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_8.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_8.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_8.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={leadGeneratingIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_9.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_9.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_9.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.mt40}>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={emailSignIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_10.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_10.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_10.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={integrationIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_11.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_11.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_11.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
          <Grid item sm={4}>
            <LandingFeatureFlatCard
              icon={opinionGalleryIcon}
              title={t('LANDING.FEATURES_BOX.FEATURE_12.TITLE')}
              desc={t('LANDING.FEATURES_BOX.FEATURE_12.DESC')}
              cta={t('LANDING.FEATURES_BOX.FEATURE_12.CTA')}
            ></LandingFeatureFlatCard>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
