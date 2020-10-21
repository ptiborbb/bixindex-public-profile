import { CircularProgress } from '@material-ui/core';
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
import { useTranslate } from '../../translate.context';
import classes from './public-profile.module.scss';

export const PublicProfile: FC = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const hash = router.asPath.split('#')[1];
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';

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
    publicProfileService.getPublicProfileByIDOrAlias(alias, by);
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
            companyFormID={profilePage.profile.defaultFormID}
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
            companyFormID={profilePage.profile.defaultFormID}
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
        <title>{t('COMMON.PAGE_TITLE')}</title>
      </Head>
      {profilePage ? (
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
                companyFormID={profilePage.profile.defaultFormID}
                title={profilePage.profile.name}
                logoPath={profilePage.profile.logo}
                companyType={profilePage.profile.type}
                activate={async (fragment) => {
                  await router.push(`/bix-profil/[companyAlias]?by=${by}`, `/bix-profil/${alias}?by=${by}#${fragment}`);
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
      ) : (
        <CircularProgress className={classes.spinner} />
      )}
    </div>
  );
};
