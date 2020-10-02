import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import React, { FC } from 'react';
import { SmileyRadio } from '../../components/smiley-radio/smiley-radio';
import classes from './rating.module.scss';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { createAuthRouteComponent } from '../../utils/auth-route';

interface RatingProps {
  form: any;
}

export const Rating: FC<RatingProps> = (props) => {
  const satisfactionOptions = [
    {
      label: 'Többet kaptam, mint vártam',
      value: '10',
    },
    {
      label: 'Pont annyit kaptam, mint vártam',
      value: '8.3',
    },
    {
      label: 'Kevesebbet kaptam, mint vártam',
      value: '5',
    },
  ];

  const form = {
    id: 'e74bf648-c432-42ce-9cda-a83cec34bb9d',
    companyName: 'Some company',
    questions: [
      {
        id: 'dd11c5f5-7c80-40e4-b73f-716ca180f2c0',
        text: 'Value for Money',
        value: '',
      },
      {
        id: 'f8d38fa0-ca16-4d42-9cae-1074d5171b53',
        text: 'Quality',
        value: '',
      },
      {
        id: '6794e478-3170-4967-a7a2-b44c7f8b2585',
        text: 'Warranty',
        value: '',
      },
      {
        id: '729694c5-2b94-4c25-809b-99aad87ce653',
        text: 'Communication',
        value: '',
      },
    ],
  };

  const smileys = [
    {
      value: '0',
      icon: <SentimentVeryDissatisfiedIcon />,
    },
    {
      value: '3',
      icon: <SentimentDissatisfiedIcon />,
    },
    {
      value: '6',
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
            {form.companyName}
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
            answers: form.questions,
          }}
          onSubmit={(values) => console.log(values)}
        >
          <Form style={{ width: '100%' }}>
            <Grid item xs={12}>
              <Field component={RadioGroup} name="satisfaction">
                {satisfactionOptions.map((option) => (
                  <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                ))}
              </Field>
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
                  {form.questions.map((question, index) => (
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
              <Button size="large" variant="contained" type="submit">
                Értékelés küldése
              </Button>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </div>
  );
};
