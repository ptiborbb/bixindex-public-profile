import Head from 'next/head';
import { FC, useMemo, useState, useEffect, useCallback } from 'react';
import logo from '../../../public/bix_logo.svg';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Header } from '../../components/header/header';
import classes from './public-profile.module.scss';
import { useApp } from '../../app.context';
import { useRouter } from 'next/router';

export const PublicProfile: FC = () => {
  const {
    publicProfileService,
    state: {
      publicProfile: { profilePage },
    },
  } = useApp();
  const [activeFragment, setFragment] = useState(() => 'reviews');
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const companyFormID = 'companyFormID';
  useEffect(() => {
    publicProfileService.getPublicProfileByAlias(alias);
  }, [publicProfileService]);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        />
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
                activate={(fragment) => setFragment(fragment)}
              />
            </div>
          </div>
          <div className={classes.frameFix}>
            <div className={classes.container}>
              <CompanyFrame
                companyAlias={alias}
                companyFormID={companyFormID}
                activeFragment={activeFragment}
                ratings={profilePage.ratings}
                profile={profilePage.profile}
                awards={profilePage.awards}
                articles={profilePage.articles}
                stats={profilePage.stats}
                npsRates={profilePage.npsRates}
                productsAndServices={profilePage.productsAndServices}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
