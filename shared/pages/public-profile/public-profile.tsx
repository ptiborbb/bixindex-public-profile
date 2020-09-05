import Head from 'next/head';
import { FC } from 'react';
import logo from '../../../public/bix_logo.svg';
import bizalmiKorLogo from '../../../public/bizalmi_kor.svg';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Header } from '../../components/header/header';
import classes from './public-profile.module.scss';

export const PublicProfile: FC = () => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        />
      </Head>
      <div className={classes.headerBlock}>
        <div className={classes.container}>
          <Header logoPath={logo} />
        </div>
        <div className={classes.divider}></div>
        <div className={classes.container}>
          <CompanySearch />
        </div>
        <div className={classes.container}>
          <CompanyHeader title={'Bizalmi Kor Kft.'} logoPath={bizalmiKorLogo} />
        </div>
      </div>
      <div>
        <div className={classes.container}>
          <CompanyFrame rating={8.96} ratingCount={85} company={{ name: 'Bizalmi kor Kft' }} />
        </div>
      </div>
    </div>
  );
};
