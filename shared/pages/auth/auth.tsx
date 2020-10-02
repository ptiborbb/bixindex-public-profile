import { Button, FormControl, FormHelperText } from '@material-ui/core';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useApp } from '../../app.context';
import { useTranslate } from '../../translate.context';
import classes from './auth.module.scss';

export const Auth: FunctionComponent = () => {
  const { t } = useTranslate();
  const router = useRouter();

  const { authService } = useApp();
  const companyFormID = router.query.companyFormID as string;

  const login = useCallback(
    (email: string, password: string) => {
      return authService
        .login(email, password)
        .then(() => (companyFormID ? router.push(`/rating/${companyFormID}`) : router.push('')))
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
    },
    [authService],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      return authService
        .register(name, email, password)
        .then(() => (companyFormID ? router.push(`/rating/${companyFormID}`) : router.push('')))
        .then(() => setError({ isError: false, message: '' }))
        .catch(() => setError({ isError: true, message: t('COMMON.UNKOWN_ERROR') }));
    },
    [authService],
  );

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
    <div>
      <div>
        <h2 className={classes.title}>Login</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values: ILoginFormValues, { setSubmitting, resetForm }: FormikHelpers<ILoginFormValues>) => {
            return login(values.email, values.password).then(() => {
              setSubmitting(false);
              resetForm();
            });
          }}
        >
          <div className={classes.container}>
            <Form className={classes.form} noValidate>
              <FormControl error={error.isError}>
                <Field id="email" name="email" label={t('AUTH.EMAIL')} component={TextField} fullWidth />
                <Field
                  id="password"
                  type="password"
                  name="password"
                  label={t('AUTH.PASSWORD')}
                  component={TextField}
                  fullWidth
                />
                <FormHelperText>{error.message}</FormHelperText>
              </FormControl>
              <div className={classes.button}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {t('AUTH.LOGIN')}
                </Button>
              </div>
            </Form>
          </div>
        </Formik>
      </div>
      <div>
        <h2 className={classes.title}>Register</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={registerValidationSchema}
          onSubmit={(values: IRegisterFormValues, { setSubmitting, resetForm }: FormikHelpers<IRegisterFormValues>) => {
            return register(values.name, values.email, values.password).then(() => {
              setSubmitting(false);
              resetForm();
            });
          }}
        >
          <div className={classes.container}>
            <Form className={classes.form} noValidate>
              <FormControl error={error.isError}>
                <Field id="name" name="name" label={t('AUTH.NAME')} component={TextField} fullWidth />
                <Field id="email" name="email" label={t('AUTH.EMAIL')} component={TextField} fullWidth />
                <Field
                  id="password"
                  type="password"
                  name="password"
                  label={t('AUTH.PASSWORD')}
                  component={TextField}
                  fullWidth
                />
                <FormHelperText>{error.message}</FormHelperText>
              </FormControl>
              <div className={classes.button}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {t('AUTH.REGISTER')}
                </Button>
              </div>
            </Form>
          </div>
        </Formik>
      </div>
    </div>
  );
};
