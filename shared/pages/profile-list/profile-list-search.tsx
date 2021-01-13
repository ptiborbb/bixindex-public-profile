import { Button, Grid, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import * as Yup from 'yup';
import { useConfig } from '../../config.context';
import { useTranslate } from '../../translate.context';
import classes from './profile-list.module.scss';

interface ProfileListHeaderProps {
  searchText: string;
}

export const ProfileListSearch: FC<ProfileListHeaderProps> = ({ searchText }) => {
  const { bestUserExperience } = useConfig();
  const { t } = useTranslate();
  const router = useRouter();
  return (
    <>
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
          text: searchText,
        }}
        validationSchema={Yup.object().shape({
          text: Yup.string().required(t('COMMON.REQUIRED')),
        })}
        onSubmit={(values, { setSubmitting, resetForm }: FormikHelpers<{ text: string }>) => {
          router.push('/cegkereso/[searchText]', `/cegkereso/${values.text}`);
          setSubmitting(false);
          resetForm();
        }}
        enableReinitialize
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
          {/* <SearchExamples /> */}
        </Form>
      </Formik>
    </>
  );
};
