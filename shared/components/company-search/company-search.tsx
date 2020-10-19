import { Button, FormControl } from '@material-ui/core';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import classes from './company-search.module.scss';

interface CompanySearchProps {}

export const CompanySearch: FC<CompanySearchProps> = () => {
  const router = useRouter();
  const searchValidationSchema = Yup.object({
    text: Yup.string().required(''),
  });
  const [error] = useState({ isError: false, message: '' });

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
        router.push('/cegkereso/[searchText]', `/cegkereso/${values.text}`);
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form className={classes.companySearch} noValidate>
        <label htmlFor="search-input">Cégkereső</label>
        <div className={classes.searchInputBlock}>
          <FormControl className={classes.searchControl} error={error.isError}>
            <Field id="text" name="text" component={TextField} className={classes.searchInput} />
          </FormControl>
          <div>
            <Button type="submit" className={classes.searchButton}>
              Keresés
            </Button>
          </div>
        </div>
        <div className={classes.searchExamples}>
          <b>Gyorskeresés:</b> Könyvelők, Marketingesek, HR szolgáltatók, Építőipar
        </div>
      </Form>
    </Formik>
  );
};
