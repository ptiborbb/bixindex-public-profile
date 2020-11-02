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
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup, TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import * as Yup from 'yup';
import { useApp } from '../../app.context';
import { CustomSlider } from '../../components/slider/slider';
import { SmileyRadio } from '../../components/smiley-radio/smiley-radio';
import { mockForm } from '../../data/mockForm';
import { ELoginOrRegister } from '../../enums/login-or-register';
import { useTranslate } from '../../translate.context';
import { fbAppId, googleClientId } from '../auth/auth';
import classes from './rating.module.scss';

export const Rating: FC = () => {
  const { t, i18n } = useTranslate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const companyFormID = router.query.companyFormID as string;
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';

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

  const logout = useCallback(() => {
    authService.logout();
  }, [authService]);

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
            visibility: Yup.string().required(t('COMMON.REQUIRED')),
          })
        : Yup.object({
            comment: Yup.string().required(t('COMMON.REQUIRED')),
            auth: authValidation,
          }),
    [nps, authValidation, user],
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

  const failResponseGoogle = (reason): unknown => {
    return enqueueSnackbar(reason.details, { variant: 'error' });
  };

  useEffect(() => {
    if (!nps) {
      ratingService.getFormByID(companyFormID, i18n.language);
    }
  }, [ratingService, alias, companyFormID]);

  useEffect(() => {
    publicProfileService.getPublicProfileByIDOrAlias(alias, by);
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
            visibility: values.visibility,
            answers: values.answers.map((answer) => ({
              questionID: answer.id,
              value: parseFloat(answer.value),
            })),
          };
          await ratingService.submitReview(parsedRating);
        }
        await router.push(`/bix-profil/[companyAlias]`, `/bix-profil/${alias}`);
      } catch (err) {
        enqueueSnackbar(t(`TOAST.ERROR.${err.response.data.errorCode}`), { variant: 'error' });
        setSubmitting(false);
      }
    },
    [ratingService, authService, alias, profilePage, user],
  );

  const companyForm: Record<string, unknown> & { questions: { id: string; text: string; value: string }[] } =
    form || mockForm();

  const initialAnswers = useMemo(
    () =>
      companyForm.questions.reduce((acc, { value, ...rest }) => {
        if (value) {
          return [...acc, { ...rest, value }];
        }
        return [...acc, { ...rest }];
      }, []),
    [companyForm.questions],
  );

  const formInitialValues = useMemo(
    () => ({
      satisfaction: '',
      nps: 8,
      answers: initialAnswers,
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
      visibility: 'VISIBLE',
    }),
    [initialAnswers, ELoginOrRegister],
  );

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
    <>
      {profilePage && (
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
              initialValues={formInitialValues}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handleSubmitReview(values, setSubmitting, resetForm);
              }}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ setFieldValue, errors, submitCount, values, isValid, submitForm, validateForm }) => (
                <Form style={{ width: '100%' }}>
                  {!nps && (
                    <>
                      <Grid item xs={12}>
                        <hr className={classes.verticalSpacing} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">{t('RATING.SATISFACTION')} </Typography>
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
                          defaultValue={values.nps}
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
                        <div className={classes.user}>
                          <Avatar className={classes.avatar} src={user.image} />
                          <Typography variant="h6">{user.name}</Typography>
                        </div>
                        <Button className={classes.logButton} onClick={logout}>
                          {t('HEADER.LOGOUT')}
                          <meta name="description" content="Sikeres kijelentkezés! Viszont látásra!" />
                          <meta
                            property="og:title"
                            content="Kijelentkezés - BIX - Cégek, akikkel nyugodtan dolgozhatsz"
                          />
                          <meta property="og:description" content="Sikeres kijelentkezés! Viszont látásra!" />
                        </Button>
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
                          <Grid item xs={12}>
                            <FacebookLogin
                              appId={fbAppId}
                              autoLoad={false}
                              fields="name,email,picture"
                              callback={async (response) => {
                                await loginResponseFacebook(response);
                                await validateForm();
                              }}
                              render={(renderProps) => (
                                <button
                                  className={`${classes.socialButton} ${classes.facebook}`}
                                  onClick={renderProps.onClick}
                                >
                                  <span className={classes.iconPlaceholder}>
                                    <img src="/social/facebook-white.svg" />
                                  </span>
                                  {t('AUTH.FB_BTN_TEXT')}
                                </button>
                              )}
                            />
                          </Grid>
                          <Grid item xs={12}>
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
                              onSuccess={async (resp: GoogleLoginResponse) => {
                                await responseGoogle(resp, values.auth.loginOrRegister === ELoginOrRegister.REGISTER);
                                await validateForm();
                              }}
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
                                <Typography className={classes.summary}>{t('RATING.CONFIRM_PASSWORD')}</Typography>
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
                            </>
                          ) : (
                            <>
                              <Grid item xs={6}>
                                <Typography className={classes.summary}>{t('RATING.EMAIL')}</Typography>
                                <Field component={TextField} label="" name="auth.email" fullWidth variant="outlined" />
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
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={6}>
                    <Typography className={classes.summary}>{t('RATING.VISIBILITY')}</Typography>
                    <Typography variant="caption">{t('RATING.VISIBILITY_INFO')}</Typography>
                    <Field component={TextField} label="" name="visibility" select fullWidth variant="outlined">
                      <MenuItem value="VISIBLE">{t('RATING.PUBLIC')}</MenuItem>
                      <MenuItem value="HIDDEN">{t('RATING.ONLY_FOR_COMPANY')}</MenuItem>
                      <MenuItem value="ANONYM">{t('RATING.PRIVATE')}</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.verticalSpacing} />
                  </Grid>
                  <Grid item xs={12} className={classes.flexRight}>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        isValid ? submitForm() : enqueueSnackbar(t('RATING.INVALID_FORM'), { variant: 'warning' });
                      }}
                    >
                      {t('RATING.SEND_REVIEW')}
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </div>
      )}
    </>
  );
};
