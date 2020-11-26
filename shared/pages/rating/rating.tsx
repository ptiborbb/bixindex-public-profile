import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Announcement, Info, LiveHelp, ThumbDown, ThumbUp } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup, TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import * as Yup from 'yup';
import badIcon from '../../../public/images/smiley/bad.png';
import disappointedIcon from '../../../public/images/smiley/disappointed.png';
import excellentIcon from '../../../public/images/smiley/excellent.png';
import extraIcon from '../../../public/images/smiley/extra.png';
import goodIcon from '../../../public/images/smiley/good.png';
import mediocreIcon from '../../../public/images/smiley/mediocre.png';
import { useApp } from '../../app.context';
import { DialogType } from '../../components/bix-dialog/bix-dialog';
import { CustomSlider } from '../../components/slider/slider';
import { SmileyRadio } from '../../components/smiley-radio/smiley-radio';
import { useConfig } from '../../config.context';
import { mockForm } from '../../data/mockForm';
import { useDialog } from '../../dialog.context';
import { ELoginOrRegister } from '../../enums/login-or-register';
import { EReviewValues } from '../../enums/review-values';
import { useTranslate } from '../../translate.context';
import classes from './rating.module.scss';

export const Rating: FC = () => {
  const dialog = useDialog();
  const { fbAppId, googleClientId } = useConfig();
  const { t, i18n } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
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
            comment: Yup.string()
              .required(t('COMMON.REQUIRED'))
              .test('len', t('COMMON.FORM_VALIDATION.MAX_LENGTH', { number: 150 }), (val) => val?.length <= 150),
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
            ratedProductOrService: values.ratedProductOrService,
            reference: values.reference,
            visibility: values.visibility,
            answers: values.answers
              .filter((answer) => answer.value !== EReviewValues.NO_EXPERIENCE)
              .map((answer) => ({
                questionID: answer.id,
                value: parseFloat(answer.value),
              })),
          };
          await ratingService.submitReview(parsedRating);
        }
        await router.push(`/bix-profil/[companyAlias]`, `/bix-profil/${alias}`);
      } catch (error) {
        const errorDetail = error?.response?.data?.details?.entityName || 'UNKNOWN_ERROR';
        enqueueSnackbar(t(`COMMON.ERROR.${errorDetail}`), { variant: 'error' });
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
      ratedProductOrService: '',
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

  const [negativeDialogShown, setNegativeDialogShown] = useState(false);
  const [positiveDialogShown, setPositiveDialogShown] = useState(false);

  const smileys = [
    {
      value: EReviewValues.DISAPPOINTED,
      icon: <img src={disappointedIcon} className={classes.emoji} />,
      clickHandler: async () => {
        !negativeDialogShown &&
          (await dialog({
            variant: DialogType.ALERT,
            text: (
              <span>
                {t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_1')}
                <span className="font-weight-bold">{t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_2')}</span>
                {t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_3')}
              </span>
            ),
            buttonClasses: classes.dialogConfirmButton,
            headerColor: '#C60203',
            submitButtonLabel: t('RATING.CONFIRM_DIALOG.I_UNDERSTAND'),
            title: (
              <span className="text-white d-flex align-items-center">
                <LiveHelp className="mr-2" /> {t('RATING.CONFIRM_DIALOG.ARE_YOU_SURE')}
              </span>
            ),
          }).then(() => setNegativeDialogShown(true)));
      },
    },
    {
      value: EReviewValues.BAD,
      icon: <img src={badIcon} className={classes.emoji} />,
    },
    {
      value: EReviewValues.MEDIOCRE,
      icon: <img src={mediocreIcon} className={classes.emoji} />,
    },
    {
      value: EReviewValues.GOOD,
      icon: <img src={goodIcon} className={classes.emoji} />,
    },
    {
      value: EReviewValues.EXCELLENT,
      icon: <img src={excellentIcon} className={classes.emoji} />,
    },
    {
      value: EReviewValues.EXTRA,
      icon: <img src={extraIcon} className={classes.emoji} />,
      clickHandler: async () => {
        !positiveDialogShown &&
          (await dialog({
            variant: DialogType.ALERT,
            text: (
              <>
                <span className="mb-2">
                  <span className="font-weight-bold">{t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_1')}</span>
                  {t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_2')}
                  <span className="font-weight-bold">{t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_3')}</span>
                  {t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_4')}
                </span>
                <Divider className={classes.tipDivider} />
                <span className="d-flex mt-2">
                  <span className={`border bg-white ${classes.announcementWrapper}`}>
                    <Announcement className={classes.announcementIcon} />
                  </span>
                  <span className={classes.toolTip}>{t('RATING.CONFIRM_DIALOG.HINT')}</span>
                </span>
                <div className="d-flex mt-2 align-items-center">
                  <img src={extraIcon} className={classes.emoji} />
                  <span className="ml-3">
                    {t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_5')}
                    <span className="font-weight-bold">{t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_6')}</span>
                    {t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_7')}
                    <span className="font-weight-bold">{t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_8')}</span>
                    {t('RATING.CONFIRM_DIALOG.POSITIVE_TEXT_9')}
                  </span>
                </div>
              </>
            ),
            buttonClasses: classes.dialogConfirmButton,
            headerColor: '#01953F',
            submitButtonLabel: t('RATING.CONFIRM_DIALOG.I_UNDERSTAND'),
            title: (
              <span className="text-white d-flex align-items-center">
                <LiveHelp className="mr-2" /> {t('RATING.CONFIRM_DIALOG.ARE_YOU_SURE')}
              </span>
            ),
          }).then(() => setPositiveDialogShown(true)));
      },
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
              {({ setFieldValue, errors, submitCount, values, isValid, submitForm, validateForm, isSubmitting }) => (
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
                                    <FormControlLabel
                                      value={EReviewValues.NO_EXPERIENCE}
                                      label=""
                                      control={
                                        <Radio
                                          disableRipple
                                          color="default"
                                          style={{ borderRadius: '8px' }}
                                          checkedIcon={
                                            <span className={`${classes.noExperienceButton} ${classes.checked}`}>
                                              {t('RATING.NO_EXPERIENCE')}
                                            </span>
                                          }
                                          icon={
                                            <span className={`${classes.noExperienceButton} ${classes.unchecked}`}>
                                              {t('RATING.NO_EXPERIENCE')}
                                            </span>
                                          }
                                        />
                                      }
                                    />
                                    {smileys.map((option) => (
                                      <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        label=""
                                        onClick={option.clickHandler}
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
                      rows={3}
                      variant="outlined"
                    />
                  </Grid>
                  {profilePage?.productsAndServices.length > 0 && (
                    <>
                      <Divider className={classes.verticalSpacing} />
                      <Grid item xs={12}>
                        <Typography className={classes.summary}>{t('RATING.WHICH_PRODUCT')}</Typography>
                        <Grid container spacing={4}>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              select
                              name="ratedProductOrService"
                              fullWidth
                              variant="outlined"
                            >
                              {profilePage.productsAndServices.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Field>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <Divider className={classes.verticalSpacing} />
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
                      disabled={isSubmitting}
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
