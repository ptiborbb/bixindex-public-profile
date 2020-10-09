import {
  Avatar,
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  ListItem,
  MenuItem,
  Radio,
  Slider,
  Typography,
} from '@material-ui/core';
import { Info, ThumbDown, ThumbUp } from '@material-ui/icons';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup, TextField } from 'formik-material-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Header } from '../../components/header/header';
import { CustomSlider } from '../../components/slider/slider';
import { SmileyRadio } from '../../components/smiley-radio/smiley-radio';
import { mockForm } from '../../data/mockForm';
import { useTranslate } from '../../translate.context';
import classes from './rating.module.scss';
import * as Yup from 'yup';

export const Rating: FC = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const companyFormID = router.query.companyFormID as string;

  const {
    ratingService,
    publicProfileService,
    state: {
      rating: { form },
      publicProfile: { profilePage },
      auth: { user },
    },
  } = useApp();

  const nps = useMemo(() => companyFormID === 'nps', [companyFormID]);
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
          })
        : Yup.object({
            comment: Yup.string().required(t('COMMON.REQUIRED')),
          }),
    [nps],
  );

  useEffect(() => {
    if (!nps) {
      ratingService.getFormByID(companyFormID, 'hu');
    }
  }, [ratingService, alias, companyFormID]);

  useEffect(() => {
    publicProfileService.getPublicProfileByAlias(alias);
  }, [publicProfileService]);

  const handleSubmitReview = useCallback(
    (rating) => {
      if (nps) {
        ratingService.submitNps(rating);
      } else {
        ratingService.submitReview(rating);
      }
      return router.push(`/bix-profil/[companyAlias]`, `/bix-profil/${alias}`);
    },
    [ratingService, alias],
  );

  const companyForm = form || mockForm();

  const satisfactionOptions = [
    {
      label: 'Többet kaptam, mint vártam',
      value: '10',
    },
    {
      label: 'Pont annyit kaptam, mint vártam',
      value: '7.5',
    },
    {
      label: 'Kevesebbet kaptam, mint vártam',
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
                      <Typography variant="h6">A következő cégről írsz értékelést: </Typography>
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
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        const parsedValues = {
                          ...values,
                          satisfaction: parseFloat(values.satisfaction),
                          companyFormID,
                          companyID: profilePage.profile.id,
                          answers: values.answers.map((answer) => ({
                            questionID: answer.id,
                            value: parseFloat(answer.value),
                          })),
                        };
                        handleSubmitReview(parsedValues);
                        setSubmitting(false);
                        resetForm();
                      }}
                      validationSchema={validationSchema}
                      enableReinitialize
                    >
                      {({ setFieldValue, errors, submitCount }) => (
                        <Form style={{ width: '100%' }}>
                          {!nps && (
                            <>
                              <Grid item xs={12}>
                                <hr className={classes.verticalSpacing} />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6">Összességében mennyire elégedett? </Typography>
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
                            <Typography variant="h6">
                              Mennyire valószínű, hogy ajánlaná a cég termékeit / szolgáltatásait illetve magát a céget
                              barátainak/kollégáinak?
                            </Typography>
                          </Grid>
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
                          {!nps && (
                            <>
                              <Grid item xs={12}>
                                <hr className={classes.verticalSpacing} />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6">Mit gondol az alábbiakról?</Typography>
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
                                  Kérjük, néhány karakterben mondja el pozitív tapasztalatait:
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
                                  Kérjük, néhány karakterben mondja el negatív tapasztalatait:
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
                            <Typography className={classes.summary}>
                              Egy rövid mondatban foglalja össze tapasztalatát az együttműködésről
                            </Typography>
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
                                Be vagy jelentkezve a következő néven
                              </Typography>
                              <div className={classes.user}>
                                <Avatar className={classes.avatar} />
                                <Typography variant="h6">{user.name}</Typography>
                              </div>
                              <div className={classes.userWarning}>
                                <Info className={classes.spacingRight} />
                                <Typography>Az értékelésedet ezen a néven rögzítjük!</Typography>
                              </div>
                            </>
                          ) : (
                            <>
                              <Grid item xs={12}>
                                <Grid container spacing={1}>
                                  <Grid item xs={12}>
                                    <Typography variant="h5" className={classes.summary}>
                                      Azonosítás
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <div>fb google linkedin...</div>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <div>cégként magánszemélyként</div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.summary}>Vezetéknév</Typography>
                                    <Field
                                      component={TextField}
                                      label=""
                                      name="lastname"
                                      fullWidth
                                      variant="outlined"
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.summary}>Keresztnév</Typography>
                                    <Field
                                      component={TextField}
                                      label=""
                                      name="firstname"
                                      fullWidth
                                      variant="outlined"
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.summary}>E-mail</Typography>
                                    <Field component={TextField} label="" name="email" fullWidth variant="outlined" />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.summary}>Telefonszám</Typography>
                                    <Field component={TextField} label="" name="phone" fullWidth variant="outlined" />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.summary}>Cégnév</Typography>
                                    <Field component={TextField} label="" name="company" fullWidth variant="outlined" />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.summary}>Beosztás</Typography>
                                    <Field
                                      component={TextField}
                                      label=""
                                      name="position"
                                      fullWidth
                                      variant="outlined"
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className={classes.summary}>Nyilvánosság</Typography>
                                    <Field
                                      component={TextField}
                                      label=""
                                      name="public"
                                      select
                                      fullWidth
                                      variant="outlined"
                                    >
                                      <MenuItem value="PUBLIC">Nyilvános</MenuItem>
                                      <MenuItem value="COMPANY">Csak a cég számára</MenuItem>
                                      <MenuItem value="ANONYMUS">Anoním</MenuItem>
                                    </Field>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </>
                          )}
                          <Grid item xs={12}>
                            <div className={classes.verticalSpacing} />
                          </Grid>
                          <Grid item xs={12} className={classes.flexRight}>
                            <Button size="large" variant="contained" type="submit" color="primary">
                              Értékelés küldése
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
