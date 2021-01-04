import { createBixindexClient } from '@codingsans/bixindex-common';
import { CircularProgress } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { LocalBusiness, WithContext } from 'schema-dts';
import logo from '../../../public/bix_logo.svg';
import ogProfileBg from '../../../public/images/bix_profil_og.png';
import { useApp } from '../../app.context';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Awards } from '../../components/fragments/awards/awards';
import { News } from '../../components/fragments/news/news';
import { Products } from '../../components/fragments/products/products';
import { Reviews } from '../../components/fragments/reviews/reviews';
import { Header } from '../../components/header/header';
import { PageNotFound } from '../../components/page-not-found/page-not-found';
import { useConfig } from '../../config.context';
import { EReviewFilterType } from '../../enums/review-filter-type';
import { ProfilePage } from '../../interfaces/profile-page';
import { useTranslate } from '../../translate.context';
import { timeoutPromise } from '../../utils/timeout-promise';
import { Rating } from '../rating/rating';
import classes from './public-profile.module.scss';

type PublicProfileProps = { profilePage?: ProfilePage };

const useRatingStructuralData = (profilePage: ProfilePage | null): ReactNode => {
  const localBuisnessStructuredData: WithContext<LocalBusiness> | null = useMemo(
    () =>
      profilePage && {
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
          streetAddress: profilePage.profile.details.address,
        },
      },
    [profilePage],
  );

  return useMemo(
    () => (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBuisnessStructuredData),
        }}
      ></script>
    ),
    [localBuisnessStructuredData],
  );
};

type OgMetaProperties = 'og:url' | 'og:type' | 'og:title' | 'og:image' | 'og:description';

type IOgMetaData = [OgMetaProperties, string];

const useOgMetaData = (profilePage: ProfilePage | null): IOgMetaData[] => {
  const { publicProfileUrl } = useConfig();
  const { asPath, route } = useRouter();
  return useMemo(
    () =>
      profilePage && route === '/bix-profil/[companyAlias]/ertekeles/[companyFormID]'
        ? [
            ['og:url', publicProfileUrl ? `${publicProfileUrl}${asPath}` : ''],
            ['og:type', 'website'],
            ['og:title', `Jelölt vagyok a Legjobb Ügyfélélmény díjra!`],
            [
              'og:description',
              `Készíts értékelést a ${profilePage.profile.name}-vel való együttműködésről, és segítsd, hogy megnyerje a Legjobb Ügyfélélmény díjat! `,
            ],
            ['og:image', ogProfileBg],
          ]
        : [
            ['og:url', publicProfileUrl ? `${publicProfileUrl}${asPath}` : ''],
            ['og:type', 'website'],
            ['og:title', `${profilePage?.profile?.name}: Vélemények, értékelések, céginformációk`],
            [
              'og:description',
              `Ezen az oldalon ${profilePage?.ratings?.count} db értékelést olvashatsz a ${profilePage?.profile?.name}-ről! Érdekel mit mondanak a partnerei? Olvass bele az értékelésekbe!`,
            ],
            ['og:image', ogProfileBg],
          ],
    [profilePage, route],
  );
};

const useOgMetaElements = (metadata: IOgMetaData[] | null): ReactNode =>
  useMemo(() => metadata && metadata.map((data, i) => <meta key={i} property={data[0]} content={data[1]} />), [
    metadata,
  ]);

export const PublicProfile: NextPage<PublicProfileProps> = ({ profilePage: ssrProfilePage }) => {
  const { t } = useTranslate();
  const router = useRouter();
  const alias = router.query.companyAlias as string;
  const hash = router.asPath.split('#')[1];
  const by = (router.query.by as 'ID' | 'ALIAS') || 'ALIAS';

  const {
    publicProfileService,
    state: {
      publicProfile: { profilePage: clientProfilePage, loading },
    },
  } = useApp();
  const [activeFragment, setFragment] = useState('reviews');

  const profilePage = clientProfilePage || ssrProfilePage;

  useEffect(() => {
    hash ? setFragment(hash) : 'reviews';
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
    productOrServiceID: '',
    stars: undefined,
    date: '',
    pageNumber: 1,
    isNPS: EReviewFilterType.ALL,
  });

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    return publicProfileService.getRatingsByProfile(
      alias,
      by,
      20,
      (filter.pageNumber - 1) * 20,
      filter.stars,
      filter.productOrServiceID,
      filter.date,
      filter.name,
      filter.isNPS === EReviewFilterType.NPS ? true : filter.isNPS === EReviewFilterType.BIX ? false : undefined,
    );
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
            productsAndServices={profilePage.productsAndServices}
            filterChanged={setFilter}
            lastRating={profilePage.lastRating}
          />
        );
      case 'awards':
        return <Awards awards={profilePage.awards} />;
      case 'news':
        return <News articles={profilePage.articles} />;
      case 'products':
        return (
          <Products
            productsAndServices={profilePage.productsAndServices}
            companyFormID={profilePage.profile.defaultFormID}
          />
        );
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
            productsAndServices={profilePage.productsAndServices}
            lastRating={profilePage.lastRating}
          />
        );
    }
  }, [activeFragment, profilePage]);

  const ratingStructuralData = useRatingStructuralData(profilePage);

  const ogMetaData = useOgMetaData(profilePage);
  const ogMetaElements = useOgMetaElements(ogMetaData);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=800" />
        <title>{`${profilePage?.profile?.name}: Vélemények, értékelések, céginformációk`}</title>
        <meta
          name="description"
          content={`Ezen az oldalon ${profilePage?.ratings?.count} db értékelést olvashatsz a ${profilePage?.profile?.name}-ről! Érdekel mit mondanak a partnerei? Olvass bele az értékelésekbe!`}
        />
        {ratingStructuralData}
        {ogMetaElements}
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
                activeTab={activeFragment}
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
                {router.route === '/bix-profil/[companyAlias]/ertekeles/[companyFormID]' ? <Rating /> : contentSegment}
              </CompanyFrame>
            </div>
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <CircularProgress className={classes.spinner} />
          ) : (
            <PageNotFound text={t('PUBLIC_PROFILE.PROFILE_NOT_FOUND')} />
          )}
        </>
      )}
    </div>
  );
};

const FIVE_SECONDS = 5000;

PublicProfile.getInitialProps = async (ctx) => {
  const { backendUrl } = useConfig();
  if (!(process && process.env && backendUrl) || !ctx.req) {
    return {
      profilePage: null,
    };
  }
  const bixClient = createBixindexClient({
    baseURL: backendUrl,
    responseInterceptors: [],
  });
  const alias = ctx.query.companyAlias as string;
  const by = (ctx.query.by as 'ID' | 'ALIAS') || 'ALIAS';
  const profilePage = await timeoutPromise<ProfilePage>(
    bixClient.publicProfile.profile.getProfileByCompany(alias, by).catch((_) => null) as Promise<ProfilePage | null>,
    FIVE_SECONDS,
  );
  return {
    profilePage,
  };
};
