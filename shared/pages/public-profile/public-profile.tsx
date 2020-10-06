import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Awards } from '../../components/fragments/awards/awards';
import { News } from '../../components/fragments/news/news';
import { Products } from '../../components/fragments/products/products';
import { Reviews } from '../../components/fragments/reviews/reviews';
import { Header } from '../../components/header/header';
import classes from './public-profile.module.scss';

export const PublicProfile: FC = () => {
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const companyFormID = 'companyFormID';
  const hash = router.asPath.split('#')[1];

  const {
    publicProfileService,
    state: {
      publicProfile: { profilePage },
    },
  } = useApp();
  const [activeFragment, setFragment] = useState(() => hash || 'reviews');

  useEffect(() => {
    setFragment(hash);
  }, [hash]);

  useEffect(() => {
    publicProfileService.getPublicProfileByAlias(alias);
  }, [publicProfileService]);

  const contentSegment = useMemo(() => {
    if (!profilePage) {
      return undefined;
    }

    switch (activeFragment) {
      case 'reviews':
        return (
          <Reviews
            companyAlias={alias}
            companyFormID={companyFormID}
            ratings={profilePage.ratings}
            stats={profilePage.stats}
            npsRates={profilePage.npsRates}
          />
        );
      case 'awards':
        return <Awards awards={profilePage.awards} />;
      case 'news':
        return <News articles={profilePage.articles} />;
      case 'products':
        return <Products productsAndServices={profilePage.productsAndServices} />;
      default:
        return (
          <Reviews
            companyAlias={alias}
            companyFormID={companyFormID}
            ratings={profilePage.ratings}
            stats={profilePage.stats}
            npsRates={profilePage.npsRates}
          />
        );
    }
  }, [activeFragment, profilePage]);

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
                {contentSegment}
              </CompanyFrame>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
