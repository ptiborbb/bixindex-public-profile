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

  const validationSchema = Yup.object({
    email: Yup.string().email(t('LOGIN.INVALID_EMAIL')).required(t('LOGIN.REQUIRED')),
    password: Yup.string().required(t('LOGIN.REQUIRED')),
  });

  interface ILoginFormValues {
    email: string;
    password: string;
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
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
              <Field id="email" name="email" label={t('LOGIN.EMAIL')} component={TextField} fullWidth />
              <Field
                id="password"
                type="password"
                name="password"
                label={t('LOGIN.PASSWORD')}
                component={TextField}
                fullWidth
              />
              <FormHelperText>{error.message}</FormHelperText>
            </FormControl>
            <div className={classes.button}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {t('LOGIN.SUBMIT')}
              </Button>
            </div>
            <div className={classes.container}>
              <Link href="/forgot-password">
                <a>{t('LOGIN.FORGOT_PASSWORD')}</a>
              </Link>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};
