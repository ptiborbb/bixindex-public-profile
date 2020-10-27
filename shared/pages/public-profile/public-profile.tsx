import { createBixindexClient } from '@codingsans/bixindex-common';
import { CircularProgress } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LocalBusiness, WithContext } from 'schema-dts';
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
import { ProfilePage } from '../../interfaces/profile-page';
import { useTranslate } from '../../translate.context';
import classes from './public-profile.module.scss';

type PublicProfileProps = { profilePage?: ProfilePage };

const useRatingStructuralData = (profilePage: ProfilePage): React.ReactNode => {
  const localBuisnessStructuredData: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': profilePage.profile.website,
    name: profilePage.profile.name,
    image: profilePage.profile.logo || 'https://via.placeholder.com/100',
    telephone: profilePage.profile.contacts[0].phone,
    ...(profilePage.ratings.count
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingCount: profilePage.ratings.count,
            reviewCount: profilePage.ratings.count,
            ratingValue: profilePage.stats.index.score,
            worstRating: 0,
            bestRating: 10,
          },
          review: {
            '@type': 'Review',
            // itemReviewed: {
            //   '@type': 'Thing',
            //   name: 'Service',
            // },
            author: { '@type': 'Person', name: profilePage.ratings.items[0].name },
            datePublished: profilePage.ratings.items[0].date,
            reviewBody: profilePage.ratings.items[0].summary,
            publisher: { '@type': 'Organization', name: 'Bixindex', sameAs: 'https://bixindex.hu/' },
          },
        }
      : {}),
    url: profilePage.profile.website,
    address: {
      '@type': 'PostalAddress',
      // addressCountry: profilePage.profile.details.address,
      streetAddress: profilePage.profile.details.address,
    },
    // description
  };

  return useMemo(
    () => (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBuisnessStructuredData),
        }}
      ></script>
    ),
    [profilePage],
  );
};

export const PublicProfile: NextPage<PublicProfileProps> = ({ profilePage: ssrProfilePage }) => {
  const { t } = useTranslate();
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const hash = router.asPath.split('#')[1];
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';

  const {
    publicProfileService,
    state: {
      publicProfile: { profilePage: clientProfilePage },
    },
  } = useApp();
  const [activeFragment, setFragment] = useState(() => hash || 'reviews');

  const profilePage = clientProfilePage || ssrProfilePage;

  useEffect(() => {
    setFragment(hash);
  }, [hash]);

  useEffect(() => {
    if (ssrProfilePage) {
      publicProfileService.setPublicProfile(ssrProfilePage);
    } else {
      publicProfileService.getPublicProfileByIDOrAlias(alias, by);
    }
  }, [publicProfileService]);

  const [filter, setFilter] = useState({
    name: '',
    productId: undefined,
    productOrService: undefined,
    stars: undefined,
    date: undefined,
    pageNumber: 1,
  });
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    return publicProfileService.getRatingsByProfile(alias, by, 20, (filter.pageNumber - 1) * 20, filter.stars);
  }, [publicProfileService, filter]);

  const contentSegment = useMemo(() => {
    if (!profilePage) {
      return undefined;
    }

    switch (activeFragment) {
      case 'reviews':
        return (
          <Reviews
            companyAlias={alias}
            companyFormID={profilePage.profile?.defaultFormID}
            ratings={profilePage.ratings}
            stats={profilePage.stats}
            npsRates={profilePage.npsRates}
            filter={filter}
            filterChanged={setFilter}
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
            companyFormID={profilePage.profile?.defaultFormID}
            ratings={profilePage.ratings}
            stats={profilePage.stats}
            npsRates={profilePage.npsRates}
            filter={filter}
            filterChanged={setFilter}
          />
        );
    }
  }, [activeFragment, profilePage]);

  const ratingStructuralData = useRatingStructuralData(profilePage);

  return (
    <div>
      <Head>
        <title>{t('COMMON.PAGE_TITLE')}</title>
        {ratingStructuralData}
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

PublicProfile.getInitialProps = async (ctx) => {
  if (!(process && process.env)) {
    return {};
  }
  const bixApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const bixClient = createBixindexClient({
    baseURL: bixApiUrl,
    responseInterceptors: [],
  });
  const alias = ctx.query.companyAlias as string;
  const by = (ctx.query.by as 'ID' | 'ALIAS') || 'ALIAS';
  const profilePage = (await bixClient.publicProfile.profile.getProfileByCompany(alias, by)) as ProfilePage;

  return {
    profilePage,
  };
};
