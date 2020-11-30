import { Button, Grid, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import Infinite from 'react-infinite';
import * as Yup from 'yup';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProfileListItem } from '../../components/profile-list-item/profile-list-item';
import { useConfig } from '../../config.context';
import { useTranslate } from '../../translate.context';
import classes from './profile-list.module.scss';

interface ISearchTextFormValues {
  text: string;
}

export const ProfileList: FC = () => {
  const { bestUserExperience } = useConfig();
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
      publicProfileService.searchProfilesByName(1, rowsPerPage, searchText);
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
        <meta name="viewport" content="width=800" />
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
                {t('COMPANY_SEARCH.MAIN_TITLE')}
              </Typography>
              <Typography variant="h3" align="center" className={classes.subTitle}>
                {t('COMPANY_SEARCH.SUB_TITLE')}
                <a style={{ textDecoration: 'underline' }} href={`${bestUserExperience}/nevezd-a-kedvenc-ceged/`}>
                  {t('COMPANY_SEARCH.WIN')}
                </a>
                !
              </Typography>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              text: '',
            }}
            validationSchema={Yup.object().shape({
              text: Yup.string().required(t('COMMON.REQUIRED')),
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

      <div className={classes.listWrapper}>
        {count !== null && <h3>{t('COMPANY_SEARCH.RESULTS_NUMBER', { count })}</h3>}
        <Infinite
          elementHeight={360}
          containerHeight={Math.max(720, (profiles?.length + 1) * 360)}
          loadingSpinnerDelegate={
            <Skeleton style={{ marginTop: 30 }} height={330} animation={'pulse'} variant={'rect'} />
          }
          isInfiniteLoading={loading}
          onInfiniteLoad={() => {
            if (searchText) {
              publicProfileService.searchProfilesByName(page + 1, rowsPerPage, searchText);
            }
          }}
          useWindowAsScrollContainer={true}
          infiniteLoadBeginEdgeOffset={page * rowsPerPage >= count ? null : 200}
        >
          {profiles?.map((profile, i) => (
            <ProfileListItem key={i} profile={profile} />
          ))}
        </Infinite>
      </div>

      <Footer logoPath={logo}></Footer>
    </>
  );
};
