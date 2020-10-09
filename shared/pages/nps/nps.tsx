import { Button, FormControlLabel, FormHelperText, Grid, Radio, Slider, Typography } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup, TextField } from 'formik-material-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect } from 'react';
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
import classes from './nps.module.scss';
import * as Yup from 'yup';

export const NPS: FC = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const companyFormID = router.query.companyFormID as string;
  console.log({ query: router });

  const {
    ratingService,
    publicProfileService,
    state: {
      rating: { form },
      publicProfile: { profilePage },
    },
  } = useApp();

  useEffect(() => {
    publicProfileService.getPublicProfileByAlias(alias);
  }, [publicProfileService]);

  const handleSubmitReview = useCallback(
    async (rating) => {
      ratingService.submitReview(rating);
      await router.push(`/bix-profil/${alias}`);
    },
    [ratingService],
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
                        {companyForm.companyName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <hr className={classes.verticalSpacing} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Összességében mennyire elégedett? </Typography>
                    </Grid>
                    <Formik
                      initialValues={{
                        satisfaction: '',
                        nps: 4,
                        answers: companyForm.questions,
                        positive: '',
                        negative: '',
                        summary: '',
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        const parsedValues = {
                          ...values,
                          satisfaction: parseFloat(values.satisfaction),
                          companyFormID,
                          answers: values.answers.map((answer) => ({
                            questionID: answer.id,
                            value: parseFloat(answer.value),
                          })),
                        };
                        handleSubmitReview(parsedValues);
                        setSubmitting(false);
                        resetForm();
                      }}
                      validationSchema={Yup.object({
                        satisfaction: Yup.string().required(),
                        answers: Yup.array().of(
                          Yup.object({
                            id: Yup.string().required(t('COMMON.REQUIRED')),
                            value: Yup.string().required(t('COMMON.REQUIRED')),
                          }),
                        ),
                        positive: Yup.string().required(t('COMMON.REQUIRED')),
                        negative: Yup.string().required(t('COMMON.REQUIRED')),
                        summary: Yup.string().required(t('COMMON.REQUIRED')),
                      })}
                      enableReinitialize
                    >
                      {({ setFieldValue, errors, submitCount }) => (
                        <Form style={{ width: '100%' }}>
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
                              <ThumbUp className={classes.spacingRight} />
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
                          <Grid item xs={12}>
                            <Typography className={classes.summary}>
                              Egy rövid mondatban foglalja össze tapasztalatát az együttműködésről
                            </Typography>
                            <Field
                              component={TextField}
                              label=""
                              name="summary"
                              fullWidth
                              multiline
                              rows={2}
                              variant="outlined"
                            />
                          </Grid>
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
