import { Grid } from '@material-ui/core';
import Link from 'next/link';
import { FC } from 'react';
import classes from './functions-dropdown.module.scss';

export const FunctionsDropdown: FC = () => {
  return (
    <>
      <Grid container direction="column" className={classes.dropwdownContainer}>
        <Grid container item wrap="nowrap" spacing={2} className={classes.upperMenuItems}>
          <Grid container item xs direction="column">
            <Grid item>
              <h4>
                <Link href="/automatizalt-elegedettsegmeres#automatedReviewHeader">
                  <span>
                    Automatizált
                    <span>Elégedettség mérés</span>
                  </span>
                </Link>
              </h4>
            </Grid>
            <Grid item>
              <Link href="/automatizalt-elegedettsegmeres#partnerList">Partnerlista</Link>
            </Grid>
            <Grid item>
              <Link href="/automatizalt-elegedettsegmeres#automatization">Automatizáció</Link>
            </Grid>
            <Grid item>
              <Link href="/automatizalt-elegedettsegmeres#handleReviews">Értékelések kezelése</Link>
            </Grid>
          </Grid>
          <Grid container item xs direction="column">
            <Grid item>
              <h4>
                <Link href="/ellenorzott-adatok#dataControlHeader">Ellenőrzött adatok</Link>
              </h4>
            </Grid>
            <Grid item>
              <Link href="/ellenorzott-adatok#reviewDescription">Értékelő űrlapok</Link>
            </Grid>
            <Grid item>
              <Link href="/ellenorzott-adatok#phoneControl">Telefonos ellenőrzés</Link>
            </Grid>
            <Grid item>
              <Link href="/ellenorzott-adatok#benchmark">Bisnode integráció</Link>
            </Grid>
          </Grid>
          <Grid container item xs direction="column">
            <Grid item>
              <h4>
                <Link href="/vezetoi-riport#leaderReportHeader">Vezetői riport</Link>
              </h4>
            </Grid>
            <Grid item>
              <Link href="/vezetoi-riport#userTypes">Felhasználó típusok</Link>
            </Grid>
            <Grid item>
              <Link href="/vezetoi-riport#leaderReportInformation">Havi vezetői riport</Link>
            </Grid>
          </Grid>
          <Grid container item xs direction="column">
            <Grid item>
              <h4>
                <Link href="/b2b-rating#b2bRatingHeader">B2B rating</Link>
              </h4>
            </Grid>
            <Grid item>
              <Link href="/b2b-rating#googleIntegration">Google integráció</Link>
            </Grid>
            <Grid item>
              <Link href="/b2b-rating#bixCompanies">BIX Toplista</Link>
            </Grid>
            <Grid item>
              <Link href="/b2b-rating#bixCompanies">BIX Cégkereső</Link>
            </Grid>
            <Grid item>
              <Link href="/b2b-rating#seoPosition">SEO</Link>
            </Grid>
            <Grid item>
              <Link href="/b2b-rating#widgetInfo">Widget, e-mail aláírás</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item className={classes.lowerMenuItems}>
          <Grid item xs={12}>
            <h4>Szeretném:</h4>
          </Grid>
          <Grid container item>
            <Grid item xs>
              <Link href="/automatizalt-elegedettsegmeres">
                <a>
                  Automatizálni <br /> az elégedettségmérést
                </a>
              </Link>
            </Grid>
            <Grid item xs>
              <Link href="/ellenorzott-adatok">
                <a>
                  Ellenőrzött adatok <br /> alapján dönteni
                </a>
              </Link>
            </Grid>
            <Grid item xs>
              <Link href="/vezetoi-riport">
                <a>
                  Ismerni a vevőim <br /> véleményét
                </a>
              </Link>
            </Grid>
            <Grid item xs>
              <Link href="/b2b-rating">
                <a>
                  Új leadeket <br /> szerezni
                </a>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
