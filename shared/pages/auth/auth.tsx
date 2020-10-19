import { Button, FormControl, FormHelperText, Grid, InputAdornment, makeStyles, Paper } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import * as Yup from 'yup';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useTranslate } from '../../translate.context';
import classes from './auth.module.scss';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import Link from 'next/link';

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

export const fbAppId = 294368951892091;
export const googleClientId = '386971335373-1sucn46b83mgl1cjm84qbp7j7445r0i1.apps.googleusercontent.com';

export const Auth: FunctionComponent = () => {
  const { t } = useTranslate();
  const router = useRouter();

  const { authService } = useApp();
  const companyFormID = router.query.companyFormID as string;
  const companyAlias = router.query.companyAlias as string;

  const login = useCallback(
    (email: string, password: string) => {
      return authService
        .login(email, password)
        .then(() =>
          companyFormID ? router.push(`/bix-profil/${companyAlias}/ertekeles/${companyFormID}`) : router.push('/'),
        )
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
    },
    [authService, companyFormID, companyAlias],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      return authService
        .register(name, email, password)
        .then(() => (companyFormID ? router.push(`/rating/${companyFormID}`) : router.push('/')))
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
    },
    [authService, companyFormID, companyAlias],
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
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
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
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
    },
    [authService],
  );

  const failResponseGoogle = (): void => {
    return setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') });
  };

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
        <div className="container">
          <Header logoPath={logo} />
        </div>
        <div className={classes.divider}></div>
      </div>
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
                      <FormHelperText>{error.message}</FormHelperText>
                    </FormControl>
                    <div className={classes.button}>
                      <Button type="submit" variant="contained" color="secondary" fullWidth>
                        {t('AUTH.REGISTER')}
                      </Button>
                    </div>
                  </Form>
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
                      <FormHelperText>{error.message}</FormHelperText>
                    </FormControl>
                    <Link href="/forgot-password">
                      <a className={classes.forgotPassword}>{t('AUTH.FORGOT_PASSWORD')}</a>
                    </Link>
                    <div className={classes.button}>
                      <Button type="submit" variant="contained" color="secondary" fullWidth>
                        {t('AUTH.LOGIN')}
                      </Button>
                    </div>
                  </Form>
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
