import { Button, FormControl, FormHelperText, Grid, InputAdornment, makeStyles, Paper } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import { AxiosError } from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { get } from 'lodash/fp';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import * as Yup from 'yup';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useConfig } from '../../config.context';
import { useTranslate } from '../../translate.context';
import classes from './auth.module.scss';

const useInputFieldStyle = makeStyles({
  root: {
    color: '#c8c8c8',
    borderRadius: '2px',
    borderColor: '#c8c8c8',
    backgroundColor: '#fafafa',
  },
  input: {
    color: '#5e5e5e',
    paddingTop: '14px',
    paddingBottom: '14px',
  },
});

const useInputLabelStyle = makeStyles({
  root: {
    fontSize: '14px',
    color: '#5e5e5e',
    transform: 'translateY(-20px) scale(1)',
  },
});

export const Auth: FunctionComponent = () => {
  const { fbAppId, googleClientId, customerPortalUrl } = useConfig();
  const { t } = useTranslate();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { authService } = useApp();
  const companyFormID = useMemo(() => get('query.companyFormID', router), [router]);
  const companyAlias = useMemo(() => get('query.companyAlias', router), [router]);

  const login = useCallback(
    (email: string, password: string) => {
      return authService
        .login(email, password)
        .then(() => setLoginError({ isError: false, message: '' }))
        .catch((error) => {
          setLoginError({ isError: true, message: t('AUTH.INVALID_EMAIL_OR_PASSWORD') });
          throw error;
        });
    },
    [authService],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      return authService
        .register(name, email, password)
        .then(() => setRegisterError({ isError: false, message: '' }))
        .catch((error: AxiosError) => {
          const errorDetail = error?.response?.data?.details?.entityName || 'UNKNOWN_ERROR';
          setRegisterError({ isError: true, message: t(`COMMON.ERROR.${errorDetail}`) });
          throw error;
        });
    },
    [authService],
  );

  const [showRegisterForm, setRegisterForm] = useState(false);
  const [showLoginForm, setLoginForm] = useState(false);

  const responseFacebook = useCallback(
    (response: { accessToken: string } & Record<string, unknown>, isRegister: boolean) => {
      return authService
        .facebook(response.accessToken)
        .then(() =>
          companyFormID
            ? isRegister
              ? router.push(`/rating/${companyFormID}`)
              : router.push(`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`)
            : router.push('/'),
        )
        .catch(() => enqueueSnackbar(t(`TOAST.ERROR.INTERNAL_SERVER_ERROR`), { variant: 'error' }));
    },
    [authService],
  );

  const responseGoogle = useCallback(
    (response: GoogleLoginResponse, isRegister: boolean) => {
      return authService
        .google(response.tokenId)
        .then(() =>
          companyFormID
            ? isRegister
              ? router.push(`/rating/${companyFormID}`)
              : router.push(`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`)
            : router.push('/'),
        )
        .catch(() => enqueueSnackbar(t(`TOAST.ERROR.INTERNAL_SERVER_ERROR`), { variant: 'error' }));
    },
    [authService],
  );

  const failResponseGoogle = (reason): unknown => {
    return enqueueSnackbar(t('COMMON.ERROR.GOOGLE_ERROR'), { variant: 'error' });
  };

  const [loginError, setLoginError] = useState({ isError: false, message: '' });

  const loginValidationSchema = Yup.object({
    email: Yup.string().email(t('AUTH.INVALID_EMAIL')).required(t('AUTH.REQUIRED')),
    password: Yup.string().required(t('AUTH.REQUIRED')),
  });

  const [registerError, setRegisterError] = useState({ isError: false, message: '' });

  const registerValidationSchema = Yup.object({
    email: Yup.string().email(t('AUTH.INVALID_EMAIL')).required(t('AUTH.REQUIRED')),
    password: Yup.string().required(t('AUTH.REQUIRED')),
    name: Yup.string().required(t('AUTH.REQUIRED')),
  });

  const inputFieldStyle = useInputFieldStyle();
  const inputLabelStyle = useInputLabelStyle();

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
    <section className={classes.pageWrapper}>
      <div className={classes.headerBlock}>
        <div className={classes.container}>
          <Header logoPath={logo} />
        </div>
        <div className={classes.divider}></div>
      </div>
      <meta name="description" content="Jelentkezz be a BIX ügyfélkapujába!" />
      <meta property="og:title" content="Bejelentkezés - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
      <meta property="og:description" content="Jelentkezz be a BIX ügyfélkapujába!" />
      <meta name="viewport" content="width=800" />

      <div className={`container ${classes.pageContent}`}>
        <h1 className={classes.pageTitle}>{t('AUTH.PAGE_TITLE')}</h1>
        <Grid container justify="center" spacing={3}>
          <Grid item xs md={5}>
            <Paper className={classes.paper}>
              <h2 className={classes.title}>
                <span>{t('AUTH.NO_BIX_ACCOUNT_COLOR_PART')}</span> {t('AUTH.NO_BIX_ACCOUNT_PART_2')}
              </h2>
              <div className={classes.blockTitle}>
                <span>{t('AUTH.CREATE')}</span>
              </div>

              <FacebookLogin
                appId={fbAppId}
                autoLoad={false}
                fields="name,email,picture"
                callback={(resp) => responseFacebook(resp, true)}
                isMobile={false}
                render={(renderProps) => (
                  <button className={`${classes.socialButton} ${classes.facebook}`} onClick={renderProps.onClick}>
                    <span className={classes.iconPlaceholder}>
                      <img src="/social/facebook-white.svg" />
                    </span>
                    {t('AUTH.FB_BTN_TEXT')}
                  </button>
                )}
              />

              <GoogleLogin
                clientId={googleClientId}
                render={(renderProps) => (
                  <button
                    className={`${classes.socialButton} ${classes.google}`}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <span className={classes.iconPlaceholder}>
                      <img src="/social/google-white.svg" />
                    </span>
                    Google fiókkal
                  </button>
                )}
                onSuccess={(resp: GoogleLoginResponse) => responseGoogle(resp, true)}
                onFailure={failResponseGoogle}
                cookiePolicy={'single_host_origin'}
              />

              <div
                className={`${classes.blockTitle} ${showRegisterForm ? '' : classes.collapsed} ${classes.clickable}`}
                onClick={() => setRegisterForm(!showRegisterForm)}
              >
                <span>{t('AUTH.IDENTIFICATION_WITH_EMAIL')}</span>
              </div>
              {showRegisterForm && (
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                  }}
                  validationSchema={registerValidationSchema}
                  validateOnMount={true}
                  onSubmit={(
                    values: IRegisterFormValues,
                    { setSubmitting, resetForm }: FormikHelpers<IRegisterFormValues>,
                  ) => {
                    return register(values.name, values.email, values.password).then(() => {
                      setSubmitting(false);
                      resetForm();
                      return companyFormID ? router.push(`/rating/${companyFormID}`) : router.push('/');
                    });
                  }}
                >
                  {({ isValid, isSubmitting }) => (
                    <Form className={classes.form} noValidate>
                      <FormControl error={registerError.isError} fullWidth>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          label={t('AUTH.NAME')}
                          component={TextField}
                          fullWidth
                          className={classes.formInput}
                          InputLabelProps={{ classes: inputLabelStyle, shrink: false }}
                          InputProps={{
                            classes: inputFieldStyle,
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
                          type="email"
                          label={t('AUTH.EMAIL')}
                          component={TextField}
                          fullWidth
                          className={classes.formInput}
                          InputLabelProps={{ classes: inputLabelStyle, shrink: false }}
                          InputProps={{
                            classes: inputFieldStyle,
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
                          className={classes.formInput}
                          InputLabelProps={{ classes: inputLabelStyle, shrink: false }}
                          InputProps={{
                            classes: inputFieldStyle,
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText>{registerError.message}</FormHelperText>
                      </FormControl>
                      <div className={classes.button}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          disabled={!isValid || isSubmitting}
                        >
                          {t('AUTH.REGISTER')}
                        </Button>
                        <meta name="description" content="Regisztrálj a BIX ügyfélkapujába!" />
                        <meta property="og:title" content="Regisztráció - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
                        <meta property="og:description" content="Regisztrálj be a BIX ügyfélkapujába!" />
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.paper}>
              <h2 className={classes.title}>
                <span>{t('AUTH.HAS_BIX_ACCOUNT_COLOR_PART')}</span> {t('AUTH.HAS_BIX_ACCOUNT_PART_2')}
              </h2>
              <div className={classes.blockTitle}>
                <span>{t('AUTH.SOCIAL_LOGIN')}</span>
              </div>
              <FacebookLogin
                appId={fbAppId}
                autoLoad={false}
                fields="name,email,picture"
                callback={(resp) => responseFacebook(resp, false)}
                isMobile={false}
                render={(renderProps) => (
                  <button className={`${classes.socialButton} ${classes.facebook}`} onClick={renderProps.onClick}>
                    <span className={classes.iconPlaceholder}>
                      <img src="/social/facebook-white.svg" />
                    </span>
                    {t('AUTH.FB_BTN_TEXT')}
                  </button>
                )}
              />

              <GoogleLogin
                clientId={googleClientId}
                render={(renderProps) => (
                  <button
                    className={`${classes.socialButton} ${classes.google}`}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <span className={classes.iconPlaceholder}>
                      <img src="/social/google-white.svg" />
                    </span>
                    {t('AUTH.GOOGLE_BTN_TEXT')}
                  </button>
                )}
                onSuccess={(resp: GoogleLoginResponse) => responseGoogle(resp, false)}
                onFailure={failResponseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <div
                className={`${classes.blockTitle} ${showLoginForm ? '' : classes.collapsed} ${classes.clickable}`}
                onClick={() => setLoginForm(!showLoginForm)}
              >
                <span>{t('AUTH.LOGIN_WITH_EMAIL')}</span>
              </div>
              {showLoginForm && (
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  validationSchema={loginValidationSchema}
                  validateOnMount={true}
                  onSubmit={(
                    values: ILoginFormValues,
                    { setSubmitting, resetForm }: FormikHelpers<ILoginFormValues>,
                  ) => {
                    return login(values.email, values.password).then(() => {
                      setSubmitting(false);
                      resetForm();
                      return companyFormID
                        ? router.push(`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`)
                        : router.push('/');
                    });
                  }}
                >
                  {({ isValid, isSubmitting }) => (
                    <Form className={classes.form} noValidate>
                      <FormControl error={loginError.isError} fullWidth>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          label={t('AUTH.EMAIL')}
                          component={TextField}
                          fullWidth
                          className={classes.formInput}
                          InputLabelProps={{ classes: inputLabelStyle, shrink: false }}
                          InputProps={{
                            classes: inputFieldStyle,
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
                          className={classes.formInput}
                          InputLabelProps={{ classes: inputLabelStyle, shrink: false }}
                          InputProps={{
                            classes: inputFieldStyle,
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <FormHelperText>{loginError.message}</FormHelperText>
                      </FormControl>
                      <a
                        href={`${customerPortalUrl}/forgot-password`}
                        target="_blank"
                        rel="noreferrer"
                        className={classes.forgotPassword}
                      >
                        {t('AUTH.FORGOT_PASSWORD')}
                      </a>
                      <meta name="description" content="Állítson be új jelszót a fiókjához!" />
                      <meta
                        property="og:title"
                        content="Új jelszó beállítása - BIX - Cégek, akikkel nyugodtan dolgozhatsz"
                      />
                      <meta property="og:description" content="Állítson be új jelszót a fiókjához!" />
                      <div className={classes.button}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          disabled={!isValid || isSubmitting}
                        >
                          {t('AUTH.LOGIN')}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Footer logoPath={logo}></Footer>
    </section>
  );
};
