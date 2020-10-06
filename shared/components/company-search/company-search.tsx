import { FC, useState } from 'react';
import classes from './company-search.module.scss';
import { useRouter } from 'next/router';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslate } from '../../translate.context';
import { FormControl, FormHelperText, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

interface CompanySearchProps {}

export const CompanySearch: FC<CompanySearchProps> = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const searchValidationSchema = Yup.object({
    text: Yup.string().required('Ez a mező kötelező'),
  });
  const [error, setError] = useState({ isError: false, message: '' });

  interface ISearchTextFormValues {
    text: string;
  }
  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validationSchema={searchValidationSchema}
      onSubmit={(values: ISearchTextFormValues, { setSubmitting, resetForm }: FormikHelpers<ISearchTextFormValues>) => {
        router.push('/profiles/[searchText]', `/profiles/${values.text}`);
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form className={classes.companySearch} noValidate>
        <label htmlFor="search-input">Cégkereső</label>
        <div className={classes.searchInputBlock}>
          <FormControl className={classes.searchControl} error={error.isError}>
            <Field id="text" name="text" component={TextField} className={classes.searchInput} />
            <FormHelperText>{error.message}</FormHelperText>
          </FormControl>
          <Button type="submit" className={classes.searchButton}>
            Keresés
          </Button>
        </div>
        <div className={classes.searchExamples}>
          <b>Gyorskeresés:</b> Könyvelők, Marketingesek, HR szolgáltatók, Építőipar
        </div>
      </Form>
    </Formik>
  );
};
