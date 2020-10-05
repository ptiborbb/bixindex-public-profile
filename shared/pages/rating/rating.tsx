import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, Slider, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup, TextField } from 'formik-material-ui';
import React, { FC, useCallback, useEffect } from 'react';
import { SmileyRadio } from '../../components/smiley-radio/smiley-radio';
import classes from './rating.module.scss';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { mockForm } from '../../data/mockForm';
import { useApp } from '../../app.context';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export const Rating: FC = (props) => {
  const router = useRouter();
  const companyFormID = router.query.companyFormID as string;

  const {
    ratingService,
    state: {
      rating: { form },
    },
  } = useApp();

  useEffect(() => {
    ratingService.getFormByID(companyFormID, 'hu');
  }, [ratingService]);

  const handleSubmitReview = useCallback(
    (rating) => {
      ratingService.submitReview(rating);
    },
    [ratingService],
  );

  const companyForm = form || mockForm();

  const satisfactionOptions = [
    {
      label: 'Többet kaptam, mint vártam',
      value: 'MORE',
    },
    {
      label: 'Pont annyit kaptam, mint vártam',
      value: 'SAME',
    },
    {
      label: 'Kevesebbet kaptam, mint vártam',
      value: 'LESS',
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
            comment: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const parsedValues = {
              ...values,
              companyFormID,
              answers: values.answers.map((answer) => ({ questionID: answer.id, value: parseFloat(answer.value) })),
            };
            handleSubmitReview(parsedValues);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ setFieldValue }) => (
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
                <Slider
                  defaultValue={4}
                  name="nps"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                  onChange={(event, value) => setFieldValue('nps', value)}
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
                      </Grid>
                    ))}
                  </>
                )}
              </FieldArray>

              <Grid item xs={12}>
                <hr className={classes.verticalSpacing} />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  label="Kérük röviden foglalja össze tapasztalait"
                  name="comment"
                  fullWidth
                  multiline
                  rows={10}
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
  );
};
