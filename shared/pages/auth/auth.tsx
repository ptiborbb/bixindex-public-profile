import { Button, FormControl, FormHelperText, Grid, InputAdornment, Paper } from '@material-ui/core';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useApp } from '../../app.context';
import { Header } from '../../components/header/header';
import { useTranslate } from '../../translate.context';
import classes from './auth.module.scss';
import logo from '../../../public/bix_logo.svg';
import Head from 'next/head';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

export const Auth: FunctionComponent = () => {
  const { t } = useTranslate();
  const router = useRouter();

  const { authService } = useApp();
  const companyFormID = router.query.companyFormID as string;

  const login = useCallback(
    (email: string, password: string) => {
      return authService
        .login(email, password)
        .then(() => (companyFormID ? router.push(`/rating/${companyFormID}`) : router.push('')))
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
    },
    [authService],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      return authService
        .register(name, email, password)
        .then(() => (companyFormID ? router.push(`/rating/${companyFormID}`) : router.push('')))
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
    },
    [authService],
  );

  const [error, setError] = useState({ isError: false, message: '' });

  const loginValidationSchema = Yup.object({
    email: Yup.string().email(t('AUTH.INVALID_EMAIL')).required(t('AUTH.REQUIRED')),
    password: Yup.string().required(t('AUTH.REQUIRED')),
  });

  const registerValidationSchema = Yup.object({
    email: Yup.string().email(t('AUTH.INVALID_EMAIL')).required(t('AUTH.REQUIRED')),
    password: Yup.string().required(t('AUTH.REQUIRED')),
    name: Yup.string().required(t('AUTH.REQUIRED')),
  });

  interface ILoginFormValues {
    email: string;
    password: string;
  }

  interface IRegisterFormValues {
    name: string;
    email: string;
    password: string;
  }

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        />
      </Head>
      <>
        <div className={classes.headerBlock}>
          <div className={classes.container}>
            <Header logoPath={logo} />
          </div>
          <div className={classes.divider}></div>
        </div>
        <div className={classes.container}>
          <h1 className={classes.pageTitle}>Azonosítás</h1>
          <Grid container justify="center" spacing={3}>
            <Grid item xs md={5}>
              <Paper className={classes.paper}>
                <h2 className={classes.title}>
                  <span>Nincs</span> még BIX accountod?
                </h2>
                <div className={classes.description}>
                  <span>Azonosítás e-mail címmel</span>
                </div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                  }}
                  validationSchema={registerValidationSchema}
                  onSubmit={(
                    values: IRegisterFormValues,
                    { setSubmitting, resetForm }: FormikHelpers<IRegisterFormValues>,
                  ) => {
                    return register(values.name, values.email, values.password).then(() => {
                      setSubmitting(false);
                      resetForm();
                    });
                  }}
                >
                  <Form className={classes.form} noValidate>
                    <FormControl error={error.isError} fullWidth>
                      <Field
                        id="name"
                        name="name"
                        label={t('AUTH.NAME')}
                        component={TextField}
                        fullWidth
                        // variant="outlined"
                        // className={classes.formInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field
                        id="email"
                        name="email"
                        label={t('AUTH.EMAIL')}
                        component={TextField}
                        fullWidth
                        // variant="outlined"
                        // className={classes.formInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        label={t('AUTH.PASSWORD')}
                        component={TextField}
                        fullWidth
                        // variant="outlined"
                        // className={classes.formInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText>{error.message}</FormHelperText>
                    </FormControl>
                    <div className={classes.button}>
                      <Button type="submit" variant="contained" color="secondary" fullWidth>
                        {t('AUTH.REGISTER')}
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper}>
                <Grid container justify="center" spacing={3}>
                  <h2 className={classes.title}>
                    <span>Van</span> már BIX accountod?
                  </h2>
                  <div className={classes.description}>
                    <span>Belépés e-mail címmel</span>
                  </div>
                  <Formik
                    initialValues={{
                      email: '',
                      password: '',
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={(
                      values: ILoginFormValues,
                      { setSubmitting, resetForm }: FormikHelpers<ILoginFormValues>,
                    ) => {
                      return login(values.email, values.password).then(() => {
                        setSubmitting(false);
                        resetForm();
                      });
                    }}
                  >
                    <Form className={classes.form} noValidate>
                      <FormControl error={error.isError} fullWidth>
                        <Field
                          id="email"
                          name="email"
                          label={t('AUTH.EMAIL')}
                          component={TextField}
                          fullWidth
                          // variant="outlined"
                          // className={classes.formInput}
                          InputProps={{
                            shrink: 'true',
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <Field
                          id="password"
                          type="password"
                          name="password"
                          label={t('AUTH.PASSWORD')}
                          component={TextField}
                          fullWidth
                          // className={classes.formInput}
                          InputProps={{
                            shrink: 'true',
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText>{error.message}</FormHelperText>
                      </FormControl>
                      <div className={classes.button}>
                        <Button type="submit" variant="contained" color="secondary" fullWidth>
                          {t('AUTH.LOGIN')}
                        </Button>
                      </div>
                    </Form>
                  </Formik>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    </div>
  );
};
