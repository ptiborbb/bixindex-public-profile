import React, { FC, useEffect } from 'react';
import { useApp } from '../../app.context';
import { useRouter } from 'next/router';
import classes from './profile-list.module.scss';
import { ProfileListItem } from '../../components/profile-list-item/profile-list-item';
import { Header } from '../../components/header/header';
import logo from '../../../public/bix_logo.svg';
import { Button, FormControl, Grid, Typography } from '@material-ui/core';
import { useTranslate } from '../../translate.context';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import SearchIcon from '@material-ui/icons/Search';
import * as Yup from 'yup';

interface ISearchTextFormValues {
  text: string;
}

export const ProfileList: FC = () => {
  const { t } = useTranslate();
  const {
    publicProfileService,
    state: {
      profileList: { page, profiles, rowsPerPage, count },
    },
  } = useApp();
  const router = useRouter();
  const searchText = router.query.searchText as string;
  useEffect(() => {
    if (searchText) {
      publicProfileService.searchProfilesByName(page, rowsPerPage, searchText);
    }
  }, [publicProfileService, searchText]);

  return (
    <>
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
                <b>Gyorskeresés:</b> Könyvelők, Marketingesek, HR szolgáltatók, Építőipar
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      <div className={classes.listWrapper}>
        {profiles && profiles.map((profile, i) => <ProfileListItem key={i} profile={profile} />)}
      </div>
    </>
  );
};
