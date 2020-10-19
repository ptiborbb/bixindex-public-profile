import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Info, ThumbDown, ThumbUp } from '@material-ui/icons';
import FacebookIcon from '@material-ui/icons/Facebook';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup, TextField } from 'formik-material-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Header } from '../../components/header/header';
import { CustomSlider } from '../../components/slider/slider';
import { SmileyRadio } from '../../components/smiley-radio/smiley-radio';
import { mockForm } from '../../data/mockForm';
import { ELoginOrRegister } from '../../enums/login-or-register';
import { useTranslate } from '../../translate.context';
import { fbAppId, googleClientId } from '../auth/auth';
import classes from './rating.module.scss';

export const Rating: FC = () => {
  const { t, i18n } = useTranslate();
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const companyFormID = router.query.companyFormID as string;

  const {
    ratingService,
    publicProfileService,
    authService,
    state: {
      rating: { form },
      publicProfile: { profilePage },
      auth: { user },
    },
  } = useApp();

  const nps = useMemo(() => companyFormID === 'nps', [companyFormID]);
  const authValidation = useMemo(
    () =>
      !user
        ? Yup.object({
            firstname: Yup.string().when('loginOrRegister', {
              is: ELoginOrRegister.REGISTER,
              then: Yup.string().required(t('COMMON.REQUIRED')),
            }),
            lastname: Yup.string().when('loginOrRegister', {
              is: ELoginOrRegister.REGISTER,
              then: Yup.string().required(t('COMMON.REQUIRED')),
            }),
            email: Yup.string().required(t('COMMON.REQUIRED')).email(),
            phone: Yup.string(),
            company: Yup.string(),
            role: Yup.string(),
            password: Yup.string().required(t('COMMON.REQUIRED')),
            confirmPassword: Yup.string().when('loginOrRegister', {
              is: ELoginOrRegister.REGISTER,
              then: Yup.string().required(t('COMMON.REQUIRED')),
            }),
            policy: Yup.boolean().when('loginOrRegister', {
              is: ELoginOrRegister.REGISTER,
              then: Yup.boolean().oneOf([true], t('COMMON.REQUIRED')),
            }),
          })
        : Yup.object(),
    [user],
  );
  const validationSchema = useMemo(
    () =>
      !nps
        ? Yup.object({
            satisfaction: Yup.string().required(),
            answers: Yup.array().of(
              Yup.object({
                id: Yup.string().required(t('COMMON.REQUIRED')),
                value: Yup.string().required(t('COMMON.REQUIRED')),
              }),
            ),
            positive: Yup.string().required(t('COMMON.REQUIRED')),
            negative: Yup.string().required(t('COMMON.REQUIRED')),
            comment: Yup.string().required(t('COMMON.REQUIRED')),
            auth: authValidation,
          })
        : Yup.object({
            comment: Yup.string().required(t('COMMON.REQUIRED')),
            auth: authValidation,
          }),
    [nps, authValidation],
  );

  const loginResponseFacebook = useCallback(
    async (response: { accessToken: string } & Record<string, unknown>) => {
      await authService.facebook(response.accessToken);
    },
    [authService],
  );

  const responseGoogle = useCallback(
    async (response: GoogleLoginResponse, _isRegister: boolean) => {
      await authService.google(response.tokenId);
    },
    [authService],
  );

  const failResponseGoogle = (): void => {
    return;
  };

  useEffect(() => {
    if (!nps) {
      ratingService.getFormByID(companyFormID, i18n.language);
    }
  }, [ratingService, alias, companyFormID]);

  useEffect(() => {
    publicProfileService.getPublicProfileByAlias(alias);
  }, [publicProfileService]);

  const handleSubmitReview = useCallback(
    async (values, setSubmitting, _resetForm) => {
      try {
        if (!user) {
          if (values.auth.loginOrRegister === ELoginOrRegister.LOGIN) {
            await authService.login(values.auth.email, values.auth.password);
          } else {
            await authService.register(
              `${values.auth.firstname} ${values.auth.lastname}`,
              values.auth.email,
              values.auth.password,
            );
          }
        }
        if (nps) {
          const parsedRating = {
            companyID: profilePage.profile.id,
            rating: values.nps,
            visibility: values.visibility,
            comment: values.comment,
          };
          await ratingService.submitNps(parsedRating);
        } else {
          const parsedRating = {
            satisfaction: parseFloat(values.satisfaction),
            nps: values.nps,
            companyFormID,
            summary: values.comment,
            positive: values.positive,
            negative: values.negative,
            reference: values.reference,
            visibility: values.visiblity,
            answers: values.answers.map((answer) => ({
              questionID: answer.id,
              value: parseFloat(answer.value),
            })),
          };
          await ratingService.submitReview(parsedRating);
        }
        await router.push(`/bix-profil/[companyAlias]`, `/bix-profil/${alias}`);
      } catch (err) {
        toast.error(t(`TOAST.ERROR.${err.response.data.errorCode}`));
        setSubmitting(false);
      }
    },
    [ratingService, authService, alias, profilePage, user],
  );

  const companyForm = form || mockForm();

  const satisfactionOptions = [
    {
      label: t('RATING.MORE_THAN_EXPECTED'),
      value: '10',
    },
    {
      label: t('RATING.EXACTLY_WHAT_EXPECTED'),
      value: '7.5',
    },
    {
      label: t('RATING.LESS_THEN_EXPECTED'),
      value: '6',
    },
  ];

  const smileys = [
    {
      value: '5',
      icon: <SentimentVeryDissatisfiedIcon />,
    },
    {
      value: '6.8',
      icon: <SentimentDissatisfiedIcon />,
    },
    {
      value: '8.3',
      icon: <SentimentSatisfiedIcon />,
    },
    {
      value: '10',
      icon: <SentimentVerySatisfiedIcon />,
    },
  ];

  return (
    <div>
      <Head>
        <title>{t('COMMON.PAGE_TITLE')}</title>
        <meta
          name="description"
          content="BIX Free csomag! Próbáld ki most ingyen a BIX-et és mérd az ügyfélelégedettséget!"
        />
        <meta property="og:title" content="Jogosultság - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
        <meta
          property="og:description"
          content="BIX Free csomag! Próbáld ki most ingyen a BIX-et és mérd az ügyfélelégedettséget!"
        />
      </Head>
      {profilePage && (
        <>
          <div className={classes.headerBlock}>
            <div className={classes.container}>
              <Header logoPath={logo} />
            </div>
            <div className={classes.divider}></div>
            <div className={classes.container}>
              <CompanySearch />
            </div>
            <div className={classes.container}>
              <CompanyHeader
                companyAlias={alias}
                companyFormID={companyFormID}
                title={profilePage.profile.name}
                logoPath={profilePage.profile.logo}
                companyType={profilePage.profile.type}
                activate={async (fragment) => {
                  await router.push('/bix-profil/[companyAlias]', `/bix-profil/${alias}#${fragment}`);
                }}
              />
            </div>
          </div>
          <div className={classes.frameFix}>
            <div className={classes.container}>
              <CompanyFrame
                profile={profilePage.profile}
                stats={profilePage.stats}
                productsAndServices={profilePage.productsAndServices}
              >
                <div className={classes.root}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6">{t('RATING.WRITING_REVIEW_ON')}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" className={classes.companyName}>
                        {profilePage.profile.name}
                      </Typography>
                    </Grid>
                    <Formik
                      initialValues={{
                        satisfaction: '',
                        nps: 4,
                        answers: companyForm.questions,
                        positive: '',
                        negative: '',
                        comment: '',
                        reference: '',
                        auth: {
                          loginOrRegister: ELoginOrRegister.REGISTER,
                          firstname: '',
                          lastname: '',
                          email: '',
                          phone: '',
                          password: '',
                          confirmPassword: '',
                          policy: false,
                        },
                        visibility: '',
                      }}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        await handleSubmitReview(values, setSubmitting, resetForm);
                      }}
                      validationSchema={validationSchema}
                      enableReinitialize
                    >
                      {({ setFieldValue, errors, submitCount, values }) => (
                        <Form style={{ width: '100%' }}>
                          {!nps && (
                            <>
                              <Grid item xs={12}>
                                <hr className={classes.verticalSpacing} />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6">{t('RATING.SATISFACTION')} </Typography>
                                <meta
                                  name="description"
                                  content="Nézd át potenciális partneredről az eddigi tapasztalatokat, véleményeket és válaszd ki a legjobbat!"
                                />
                                <meta property="og:title" content="Automazitált elégedettség mérés és B2B Rating" />
                                <meta
                                  property="og:description"
                                  content="Automatizáld az ügyfélelégedettség mérést a cégedben!"
                                />
                                <meta property="og:image" content="https://cdn.bixindex.hu/images/bixindex-og.png" />
                              </Grid>
                              <Grid item xs={12}>
                                <Field component={RadioGroup} name="satisfaction">
                                  {satisfactionOptions.map((option) => (
                                    <FormControlLabel
                                      key={option.value}
                                      value={option.value}
                                      control={<Radio />}
                                      label={option.label}
                                    />
                                  ))}
                                </Field>
                                <FormHelperText className={classes.errorMsg}>
                                  {errors?.satisfaction && !!submitCount ? t('COMMON.REQUIRED') : ''}
                                </FormHelperText>
                              </Grid>
                            </>
                          )}

                          <Grid item xs={12}>
                            <hr className={classes.verticalSpacing} />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h6">{t('RATING.WOULD_YOU_RECOMMEND')}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={0} justify="space-between">
                              <Grid item xs={12}>
                                <CustomSlider
                                  defaultValue={4}
                                  name="nps"
                                  valueLabelDisplay="auto"
                                  step={1}
                                  marks
                                  min={0}
                                  max={10}
                                  track={false}
                                  onChange={(event, value) => setFieldValue('nps', value)}
                                  className={classes.npsSlider}
                                />
                              </Grid>
                              <Grid item>
                                <Typography variant="h6">{1}</Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="h6">{10}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          {!nps && (
                            <>
                              <Grid item xs={12}>
                                <hr className={classes.verticalSpacing} />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6">{t('RATING.WHAT_DO_YOU_THINK')}</Typography>
                              </Grid>
                              <FieldArray name="answers">
                                {() => (
                                  <>
                                    {companyForm.questions.map((question, index) => (
                                      <Grid item xs={12} key={question.id}>
                                        {question.text}
                                        <Field component={RadioGroup} name={`answers.${index}.value`}>
                                          <div>
                                            {smileys.map((option) => (
                                              <FormControlLabel
                                                key={option.value}
                                                value={option.value}
                                                label=""
                                                control={<SmileyRadio smiley={option.icon} />}
                                              />
                                            ))}
                                          </div>
                                        </Field>
                                        <FormHelperText className={classes.errorMsg}>
                                          {errors?.answers && !!submitCount ? t('COMMON.REQUIRED') : ''}
                                        </FormHelperText>
                                      </Grid>
                                    ))}
                                  </>
                                )}
                              </FieldArray>

                              <Grid item xs={12}>
                                <hr className={classes.verticalSpacing} />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.positive}>
                                  <ThumbUp className={classes.spacingRight} />
                                  {t('RATING.POSITIVE')}
                                </Typography>
                                <Field
                                  component={TextField}
                                  label=""
                                  name="positive"
                                  fullWidth
                                  multiline
                                  rows={5}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography className={classes.negative}>
                                  <ThumbDown className={classes.spacingRight} />
                                  {t('RATING.NEGATIVE')}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  component={TextField}
                                  label=""
                                  name="negative"
                                  fullWidth
                                  multiline
                                  rows={5}
                                  variant="outlined"
                                />
                              </Grid>
                            </>
                          )}
                          <Grid item xs={12}>
                            <Typography className={classes.summary}>{t('RATING.COMMENT')}</Typography>
                            <Field
                              component={TextField}
                              label=""
                              name="comment"
                              fullWidth
                              multiline
                              rows={2}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <hr className={classes.verticalSpacing} />
                          </Grid>
                          {user ? (
                            <>
                              <Typography variant="h5" className={classes.summary}>
                                {t('RATING.LOGGED_IN_AS')}
                              </Typography>
                              <div className={classes.user}>
                                <Avatar className={classes.avatar} />
                                <Typography variant="h6">{user.name}</Typography>
                              </div>
                              <div className={classes.userWarning}>
                                <Info className={classes.spacingRight} />
                                <Typography>{t('RATING.SAVING_REVIEW_AS')}</Typography>
                              </div>
                            </>
                          ) : (
                            <>
                              <Grid item xs={12}>
                                <Field component={RadioGroup} name="auth.loginOrRegister">
                                  <FormControlLabel
                                    key="REGISTER"
                                    value="REGISTER"
                                    control={<Radio />}
                                    label={t('RATING.NO_ACCOUNT_YET')}
                                  />
                                  <FormControlLabel
                                    key="LOGIN"
                                    value="LOGIN"
                                    control={<Radio />}
                                    label={t('RATING.HAVE_A_BIX_ACCOUNT')}
                                  />
                                </Field>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid container spacing={1}>
                                  <Grid item xs={12}>
                                    <Typography variant="h5" className={classes.summary}>
                                      {t('RATING.AUTHENTICATION')}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} className={classes.icons}>
                                    <FacebookLogin
                                      appId={fbAppId}
                                      autoLoad={false}
                                      fields="name,email,picture"
                                      callback={loginResponseFacebook}
                                      render={(renderProps) => (
                                        <FacebookIcon
                                          onClick={renderProps.onClick}
                                          color="primary"
                                          fontSize="large"
                                          className={classes.icon}
                                        />
                                      )}
                                    />
                                    <GoogleLogin
                                      clientId={googleClientId}
                                      render={(renderProps) => (
                                        <img
                                          src="/social/Google.svg"
                                          className={`${classes.icon} ${classes.google}`}
                                          onClick={renderProps.onClick}
                                        />
                                      )}
                                      onSuccess={(resp: GoogleLoginResponse) =>
                                        responseGoogle(resp, values.auth.loginOrRegister === ELoginOrRegister.REGISTER)
                                      }
                                      onFailure={failResponseGoogle}
                                      cookiePolicy={'single_host_origin'}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="h5" className={classes.summary}>
                                      {t('RATING.REFERENCE')}
                                    </Typography>
                                    <Field component={RadioGroup} name="reference">
                                      <FormControlLabel
                                        key="INDIVIDUAL"
                                        value="INDIVIDUAL"
                                        control={<Radio />}
                                        label={t('RATING.PERSONAL')}
                                      />
                                      <FormControlLabel
                                        key="COMPANY"
                                        value="COMPANY"
                                        control={<Radio />}
                                        label={t('RATING.AS_COMPANY')}
                                      />
                                    </Field>
                                  </Grid>
                                  {values.auth.loginOrRegister === ELoginOrRegister.REGISTER ? (
                                    <>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.LASTNAME')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.lastname"
                                          fullWidth
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.FIRSTNAME')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.firstname"
                                          fullWidth
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.EMAIL')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.email"
                                          type="email"
                                          fullWidth
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.PHONE')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.phone"
                                          fullWidth
                                          variant="outlined"
                                          InputProps={{
                                            startAdornment: <InputAdornment position="start">+</InputAdornment>,
                                            endAdornment: (
                                              <Tooltip
                                                title="Telefonszámod soha nem lesz nyilvános. Kizárólag a BIX Hungary kft munkatársai számára elérhető, az értékelés telefonos hitelesítése céljából"
                                                arrow
                                                placement="top"
                                              >
                                                <Info style={{ color: '#595959' }} />
                                              </Tooltip>
                                            ),
                                          }}
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.PASSWORD')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.password"
                                          fullWidth
                                          type="password"
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>
                                          {t('RATING.CONFIRM_PASSWORD')}
                                        </Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.confirmPassword"
                                          fullWidth
                                          type="password"
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={12} className={classes.alignCenter}>
                                        <a href={`/adatvedelmi-tajekoztato`} target="_blank" rel="noreferrer">
                                          <Checkbox
                                            checked={values.auth.policy}
                                            onChange={(event, value) => {
                                              setFieldValue('auth.policy', value);
                                            }}
                                            name="checkedB"
                                            color="primary"
                                          />
                                          <span className={classes.link}>{t('RATING.PRIVACY_POLICY')}</span>
                                        </a>
                                        <FormHelperText className={classes.errorMsg}>
                                          {errors?.auth?.policy && !!submitCount ? t('RATING.POLICy_REQUIRED') : ''}
                                        </FormHelperText>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.VISIBILITY')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="visibility"
                                          select
                                          fullWidth
                                          variant="outlined"
                                        >
                                          <MenuItem value="PUBLIC">{t('RATING.PUBLIC')}</MenuItem>
                                          <MenuItem value="COMPANY">{t('RATING.ONLY_FOR_COMPANY')}</MenuItem>
                                          <MenuItem value="PRIVATE">{t('RATING.PRIVATE')}</MenuItem>
                                        </Field>
                                      </Grid>
                                    </>
                                  ) : (
                                    <>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.EMAIL')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.email"
                                          fullWidth
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.PASSWORD')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="auth.password"
                                          type="password"
                                          fullWidth
                                          variant="outlined"
                                        />
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography className={classes.summary}>{t('RATING.VISIBILITY')}</Typography>
                                        <Field
                                          component={TextField}
                                          label=""
                                          name="visibility"
                                          select
                                          fullWidth
                                          variant="outlined"
                                        >
                                          <MenuItem value="PUBLIC">{t('RATING.PUBLIC')}</MenuItem>
                                          <MenuItem value="COMPANY">{t('RATING.ONLY_FOR_COMPANY')}</MenuItem>
                                          <MenuItem value="PRIVATE">{t('RATING.PRIVATE')}</MenuItem>
                                        </Field>
                                      </Grid>{' '}
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </>
                          )}
                          <Grid item xs={12}>
                            <div className={classes.verticalSpacing} />
                          </Grid>
                          <Grid item xs={12} className={classes.flexRight}>
                            <Button size="large" variant="contained" type="submit" color="primary">
                              {t('RATING.SEND_REVIEW')}
                            </Button>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </Grid>
                </div>
              </CompanyFrame>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
