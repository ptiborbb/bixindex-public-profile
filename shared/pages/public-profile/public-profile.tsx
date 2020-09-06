import { ECompanyTypes, IProduct, IProfile, IService } from '@codingsans/bixindex-common';
import Head from 'next/head';
import { FC, useMemo } from 'react';
import avatar from '../../../public/avatar.png';
import bizalmiKorLogo from '../../../public/bizalmi_kor.svg';
import logo from '../../../public/bix_logo.svg';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Header } from '../../components/header/header';
import classes from './public-profile.module.scss';

export const PublicProfile: FC = () => {
  const publicProfile = useMemo(
    () =>
      ({
        profile: {
          fb: 'google.com',
          insta: 'google.com',
          linkedin: 'google.com',
          website: 'bixindex.hu',
          name: 'Bizalmi Kör Kft.',
          type: ECompanyTypes.COMPANY,
          logo: bizalmiKorLogo,

          details: {
            employees: {
              value: 10,
              change: 'up',
            },
            yearlyIncome: {
              value: 100000000,
              change: 'down',
            },
            taxNumber: '14780846-2-43',
            address: '1095. Soroksári út 48. 10. ép. 2. em. 20',
            mainProfile: 'Rendezvényszervezés',
          },
          products: [
            { name: 'mrd+ vezetői klub' },
            { name: 'bizalom gála' },
            { name: 'bix' },
            { name: 'TOP Vezetői klub' },
          ],
          services: [{ name: 'értékesítés' }, { name: 'marketing' }],
          contacts: [
            {
              name: 'Letenovics - Nagy Roland',
              email: 'roland.letenovics@bizalmikor.hu',
              phone: '+36 30 2203 203',
              image: avatar,
            },
          ],
        },
        rating: {
          value: 8.96,
          count: 85,
        },
      } as {
        rating: {
          value: number;
          count: number;
        };
        profile: IProfile;
      }),
    [],
  );

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
          <CompanyHeader
            title={publicProfile.profile.name}
            logoPath={publicProfile.profile.logo}
            companyType={publicProfile.profile.type}
          />
        </div>
      </div>
      <div className={classes.frameFix}>
        <div className={classes.container}>
          <CompanyFrame rating={publicProfile.rating} profile={publicProfile.profile} />
        </div>
      </div>
    </div>
  );
};
