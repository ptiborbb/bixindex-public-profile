import { Button, Grid, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import * as Yup from 'yup';
import { useConfig } from '../../../config.context';
import { ProfileSearchTypes } from '../../../enums/profile-search-types';
import { useTranslate } from '../../../translate.context';
import classes from '../profile-list.module.scss';

interface ProfileListSearchbarProps {
  searchText: string | null;
}

export const ProfileListSearchbar: FC<ProfileListSearchbarProps> = ({ searchText }) => {
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
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          text: searchText ?? '',
        }}
        validationSchema={Yup.object().shape({
          text: Yup.string().required(t('COMMON.REQUIRED')),
        })}
        onSubmit={(values, { setSubmitting, resetForm }: FormikHelpers<{ text: string | null }>) => {
          values?.text && router.push(`/cegkereso/${values?.text}?by=${ProfileSearchTypes.NAME}`);
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
