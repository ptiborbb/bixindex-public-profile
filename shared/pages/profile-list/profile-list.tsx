import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import * as Yup from 'yup';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProfileListItem } from '../../components/profile-list-item/profile-list-item';
import { useTranslate } from '../../translate.context';
import classes from './profile-list.module.scss';

interface ISearchTextFormValues {
  text: string;
}

export const ProfileList: FC = () => {
  const { t } = useTranslate();
  const {
    publicProfileService,
    state: {
      profileList: { page, profiles, rowsPerPage, count, loading },
    },
  } = useApp();
  const router = useRouter();
  const searchText = (router.query.searchText as string) || '';

  useEffect(() => {
    if (searchText) {
      publicProfileService.searchProfilesByName(page, rowsPerPage, searchText);
    }
  }, [publicProfileService, searchText]);

  useEffect(() => {
    return () => {
      publicProfileService.resetProfiles();
    };
  }, [publicProfileService]);

  return (
    <>
      <Head>
        <title>{t('COMMON.PAGE_TITLE')}</title>
      </Head>
      <div className={classes.headerBlock}>
        <div className={classes.container}>
          <Header logoPath={logo} />
        </div>
        <div className={classes.divider}></div>
        <div className={classes.headerBlockInner}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Typography variant="h3" align="center" className={classes.mainTitle}>
                {t('LANDING.HEAD_BOX.MAIN_1')}
              </Typography>
              <Typography variant="h3" align="center" className={classes.subTitle}>
                {t('LANDING.HEAD_BOX.MAIN_2')}
              </Typography>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              text: '',
            }}
            validationSchema={Yup.object({
              text: Yup.string().required(''),
            })}
            onSubmit={(values, { setSubmitting, resetForm }: FormikHelpers<ISearchTextFormValues>) => {
              router.push('/cegkereso/[searchText]', `/cegkereso/${values.text}`);
              setSubmitting(false);
              resetForm();
            }}
          >
            <Form className={classes.companySearch} noValidate>
              <div className={classes.searchInputBlock}>
                <Field
                  id="text"
                  name="text"
                  component={TextField}
                  className={classes.searchInput}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Button type="submit" size="small" className={classes.searchButton}>
                        <SearchIcon fontSize="large" />
                      </Button>
                    ),
                  }}
                />
              </div>
              <div className={classes.searchExamples}>
                <b>{t('COMPANY_SEARCH.QUICK_SEARCH.LABEL')}</b>
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <span
                      key={i}
                      onClick={async () => {
                        await router.push(
                          '/cegkereso/[searchText]',
                          `/cegkereso/${t(`COMPANY_SEARCH.QUICK_SEARCH.S_${i + 1}`)}`,
                        );
                      }}
                    >
                      {t(`COMPANY_SEARCH.QUICK_SEARCH.S_${i + 1}`)}
                      {i < 3 && `, `}
                    </span>
                  ))}
              </div>
            </Form>
          </Formik>
        </div>

        <div className={classes.divider}></div>
      </div>

      {profiles ? (
        <div className={classes.listWrapper}>
          <h3>{t('COMPANY_SEARCH.RESULTS_NUMBER', { count })}</h3>
          {profiles.map((profile, i) => (
            <ProfileListItem key={i} profile={profile} />
          ))}
        </div>
      ) : (
        <>
          {loading && (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          )}
        </>
      )}

      <Footer logoPath={logo}></Footer>
    </>
  );
};
