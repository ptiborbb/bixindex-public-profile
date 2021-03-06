import { getFullName } from '@codingsans/bixindex-common';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Hidden,
  MenuItem,
  Radio,
  Typography
} from '@material-ui/core';
import { Announcement, Info, LiveHelp, ThumbDown, ThumbUp, WarningRounded } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup, Select, TextField } from 'formik-material-ui';
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
import { EAuthTypes } from '../../services/auth.service';
import { useTranslate } from '../../translate.context';
import { useFormDetails } from './hooks/use-form-details';
import { useSubmitRating } from './hooks/use-submit-rating';
import { ICompanyFormQuestion, ICompanyFormQuestionMapped } from './interfaces/questions.interface';
import { IRatingFormValues } from './interfaces/rating-form-values.interface';
import classes from './rating.module.scss';

export const Rating: FC = () => {
  const dialog = useDialog();
  const { fbAppId, googleClientId, customerPortalUrl } = useConfig();
  const { t, i18n } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const { by, companyAlias: alias, companyFormID, productOrServiceID, isNps, partnerID } = useFormDetails();

  const {
    ratingService,
    publicProfileService,
    authService,
    state: {
      rating: { form, partner },
      publicProfile: { profilePage },
      auth: { user },
    },
  } = useApp();

  const logout = useCallback(() => {
    authService.logout();
  }, [authService]);

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
            company: Yup.string(),
            role: Yup.string(),
            password: Yup.string().when('loginOrRegister', {
              is: ELoginOrRegister.LOGIN,
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
      !isNps
        ? Yup.object({
            satisfaction: Yup.string().required(),
            answers: Yup.array().of(
              Yup.object({
                id: Yup.string().required(t('COMMON.REQUIRED')),
                value: Yup.string().required(t('COMMON.REQUIRED')),
              }),
            ),

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
    [isNps, authValidation, user],
  );

  const loginResponseFacebook = useCallback(
    async (response: { accessToken: string } & Record<string, unknown>, isRegister: boolean) =>
      isRegister
        ? await authService.register(EAuthTypes.FACEBOOK, { accessToken: response.accessToken })
        : await authService.login(EAuthTypes.FACEBOOK, { accessToken: response.accessToken }),
    [authService],
  );

  const responseGoogle = useCallback(
    async (response: GoogleLoginResponse, isRegister: boolean) =>
      isRegister
        ? await authService.register(EAuthTypes.GOOGLE, { accessToken: response.tokenId })
        : await authService.login(EAuthTypes.GOOGLE, { accessToken: response.tokenId }),
    [authService],
  );

  const failResponseGoogle = (_): unknown => {
    return enqueueSnackbar(t('COMMON.ERROR.GOOGLE_ERROR'), { variant: 'error' });
  };

  const checkPartnerRegistration = useCallback(() => {
    if (partnerID && companyFormID) {
      ratingService.checkPartnerRegistration(partnerID, companyFormID);
    }
  }, [ratingService, partnerID, companyFormID]);

  useEffect(() => {
    checkPartnerRegistration();
  }, [checkPartnerRegistration]);

  useEffect(() => {
    if (!isNps) {
      ratingService.getFormByID(companyFormID, i18n.language);
    }
  }, [ratingService, alias, companyFormID]);

  useEffect(() => {
    publicProfileService.getPublicProfileByIDOrAlias(alias, by);
  }, [publicProfileService]);

  const notifyUserUponRatingSubmission = async (): Promise<void> => {
    await dialog({
      variant: DialogType.ALERT,
      title: <Typography className="text-white font-weight-bold">{t('RATING.WE_GOT_YOUR_REVIEW')}</Typography>,
      text: (
        <>
          <Typography>{t('RATING.THANK_YOU_RATING_RECEIVED')}</Typography>
          <Typography>{t('RATING.BIX_CHECKS_REVIEW')}</Typography>
          <Typography>{t('RATING.UNTIL')}</Typography>
          <ul>
            <li>{t('RATING.WRITE_ANOTHER')}</li>
            <li>
              <a href={customerPortalUrl} target="blank" rel="noreferrer">
                {t('RATING.VERIFY_YOUR_PROFILE')}
              </a>
            </li>
          </ul>
          <Typography>{t('RATING.BIX_TEAM')}</Typography>
        </>
      ),
      submitButtonLabel: t('COMMON.OK'),
      headerColor: '#56AAA6',
    });
  };

  const handleSubmitReview = useSubmitRating()(notifyUserUponRatingSubmission);

  const companyForm: Record<string, unknown> & { questions: ICompanyFormQuestion[] } = form || mockForm();

  const initialAnswers: ICompanyFormQuestionMapped[] = useMemo(
    () =>
      companyForm.questions.reduce((acc, { value, ...rest }) => {
        if (value) {
          return [...acc, { ...rest, value }];
        }
        return [...acc, { ...rest }];
      }, []),
    [companyForm.questions],
  );

  const formInitialValues: IRatingFormValues = useMemo(
    () => ({
      satisfaction: '',
      nps: 8,
      answers: initialAnswers,
      positive: '',
      negative: '',
      comment: '',
      ratedProductOrService: productOrServiceID || '',
      reference: '',
      auth: {
        loginOrRegister: partner?.isRegistered ? ELoginOrRegister.LOGIN : ELoginOrRegister.REGISTER,
        firstname: '',
        lastname: '',
        email: partner?.email ?? '',
        password: '',
        policy: false,
      },
      visibility: 'VISIBLE',
    }),
    [initialAnswers, ELoginOrRegister, partner],
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
              <>
                <span>
                  {t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_1')}
                  <span className="font-weight-bold">{t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_2')}</span>
                  {t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_3')}
                </span>
                <Divider className={classes.tipDivider} />
                <span className="d-flex mt-2">
                  <span className={`border bg-white ${classes.announcementWrapper} `}>
                    <Announcement className={`${classes.announcementIcon} ${classes.redAnnouncement}`} />
                  </span>
                  <span className={`${classes.toolTip} ${classes.redAnnouncement}`}>
                    {t('RATING.CONFIRM_DIALOG.HINT')}
                  </span>
                </span>
                <div className="d-flex mt-2 align-items-center">
                  <img src={disappointedIcon} className={classes.emoji} />
                  <span className="ml-3">
                    {t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_4')}
                    <span className="font-weight-bold">{t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_5')}</span>
                    {t('RATING.CONFIRM_DIALOG.NEGATIVE_TEXT_6')}
                  </span>
                </div>
              </>
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
      label: t('RATING.DISAPPOINTED'),
    },
    {
      value: EReviewValues.BAD,
      icon: <img src={badIcon} className={classes.emoji} />,
      label: t('RATING.BAD'),
    },
    {
      value: EReviewValues.MEDIOCRE,
      icon: <img src={mediocreIcon} className={classes.emoji} />,
      label: t('RATING.MEDIOCRE'),
    },
    {
      value: EReviewValues.GOOD,
      icon: <img src={goodIcon} className={classes.emoji} />,
      label: t('RATING.GOOD'),
    },
    {
      value: EReviewValues.EXCELLENT,
      icon: <img src={excellentIcon} className={classes.emoji} />,
      label: t('RATING.EXCELLENT'),
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
                    <Announcement className={`${classes.announcementIcon} ${classes.greenAnnouncement}`} />
                  </span>
                  <span className={`${classes.toolTip} ${classes.greenAnnouncement}`}>
                    {t('RATING.CONFIRM_DIALOG.HINT')}
                  </span>
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
      label: t('RATING.EXTRA'),
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
              onSubmit={async (values, { setSubmitting }) => {
                await handleSubmitReview(values, setSubmitting);
              }}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ setFieldValue, errors, submitCount, values, isValid, submitForm, validateForm, isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                  {!isNps && (
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
                        <Typography variant="h6">{0}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">{10}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {!isNps && (
                    <>
                      <Grid item xs={12}>
                        <hr className={classes.verticalSpacing} />
                      </Grid>
                      <Grid item xs={12}>
                        <div className={`d-flex ${classes.perfectReviewWarning} mb-3`}>
                          <div className={`${classes.triangleWrapper}`}>
                            <WarningRounded className={classes.triangle} />
                          </div>
                          <div className={`d-flex flex-column justify-content-around p-3`}>
                            <span className={classes.title}>{t('RATING.NO_PERFECT_RATING')}</span>
                            <span className={classes.text}>{t('RATING.EVERYONE_WANTS_YOUR_EXPERIENCE')}</span>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} className="mb-3">
                        <Typography variant="h6">{t('RATING.WHAT_DO_YOU_THINK')}</Typography>
                      </Grid>
                      <FieldArray name="answers">
                        {({ form: { values } }) => (
                          <>
                            {companyForm.questions.map((question, index) => (
                              <Grid item xs={12} key={question.id}>
                                <span className="position-absolute">{question.text}</span>
                                <Field component={RadioGroup} name={`answers.${index}.value`}>
                                  <div className="row mx-0 justify-content-center d-flex">
                                    <FormControlLabel
                                      className="m-0 mt-4 mt-xl-0 col-12 col-lg-4"
                                      value={EReviewValues.NO_EXPERIENCE}
                                      label="  "
                                      labelPlacement="top"
                                      control={
                                        <Radio
                                          disableRipple
                                          color="default"
                                          style={{ borderRadius: '8px' }}
                                          className="col-12"
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
                                        className="m-0"
                                        key={option.value}
                                        value={option.value}
                                        label={
                                          <>
                                            <Hidden lgUp>
                                              <span
                                                className={
                                                  option.value !== values?.answers[index]?.value ? 'd-none' : undefined
                                                }
                                              >
                                                {option.label}
                                              </span>
                                            </Hidden>
                                            <Hidden mdDown>
                                              <span className={index !== 0 ? 'invisible' : undefined}>
                                                {option.label}
                                              </span>
                                            </Hidden>
                                          </>
                                        }
                                        labelPlacement="top"
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
                      inputProps={{ maxLength: 150 }}
                    />
                  </Grid>
                  {!isNps && profilePage?.productsAndServices.length > 0 && (
                    <>
                      <Divider className={classes.verticalSpacing} />
                      <Grid item xs={12}>
                        <Typography className={classes.summary}>{t('RATING.WHICH_PRODUCT')}</Typography>
                        <Grid container spacing={4}>
                          <Grid item xs={12} lg={6}>
                            <Field
                              component={Select}
                              select
                              name="ratedProductOrService"
                              fullWidth
                              variant="outlined"
                              disabled={!!productOrServiceID}
                              displayEmpty
                            >
                              <MenuItem value="">
                                <em>{t('RATING.GENERAL_REVIEW')}</em>
                              </MenuItem>
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
                          <Typography variant="h6">{getFullName(user)}</Typography>
                        </div>
                        <Button className={classes.logButton} onClick={logout}>
                          {t('HEADER.LOGOUT')}
                          <meta name="description" content="Sikeres kijelentkez??s! Viszont l??t??sra!" />
                          <meta
                            property="og:title"
                            content="Kijelentkez??s - BIX - C??gek, akikkel nyugodtan dolgozhatsz"
                          />
                          <meta property="og:description" content="Sikeres kijelentkez??s! Viszont l??t??sra!" />
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
                                await loginResponseFacebook(
                                  response,
                                  values.auth.loginOrRegister === ELoginOrRegister.REGISTER,
                                );
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
                              <Grid item xs={12} lg={6}>
                                <Typography className={classes.summary}>{t('RATING.LASTNAME')}</Typography>
                                <Field
                                  component={TextField}
                                  label=""
                                  name="auth.lastname"
                                  type="text"
                                  fullWidth
                                  variant="outlined"
                                  inputProps={{
                                    autoComplete: 'family-name',
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} lg={6}>
                                <Typography className={classes.summary}>{t('RATING.FIRSTNAME')}</Typography>
                                <Field
                                  component={TextField}
                                  label=""
                                  name="auth.firstname"
                                  type="text"
                                  fullWidth
                                  variant="outlined"
                                  inputProps={{
                                    autoComplete: 'given-name',
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} lg={6}>
                                <Typography className={classes.summary}>{t('RATING.EMAIL')}</Typography>
                                <Field
                                  component={TextField}
                                  label=""
                                  name="auth.email"
                                  type="email"
                                  fullWidth
                                  variant="outlined"
                                  inputProps={{
                                    autoComplete: 'email',
                                  }}
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
                                <Field
                                  component={TextField}
                                  label=""
                                  name="auth.email"
                                  fullWidth
                                  variant="outlined"
                                  inputProps={{
                                    autoComplete: 'email',
                                  }}
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
                                  inputProps={{
                                    autoComplete: 'current-password',
                                  }}
                                />
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Typography className={classes.summary}>{t('RATING.VISIBILITY')}</Typography>
                    <Typography variant="caption">{t('RATING.VISIBILITY_INFO')}</Typography>
                    <Field component={TextField} label="" name="visibility" select fullWidth variant="outlined">
                      <MenuItem value="VISIBLE">{t('RATING.PUBLIC')}</MenuItem>
                      <MenuItem value="HIDDEN">{t('RATING.ONLY_FOR_COMPANY')}</MenuItem>
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
                        if (!isValid) {
                          enqueueSnackbar(t('RATING.INVALID_FORM'), { variant: 'warning' });
                        }
                        submitForm();
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
