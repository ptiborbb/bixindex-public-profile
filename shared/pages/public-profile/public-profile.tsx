import { BottomNavigation, BottomNavigationAction, CircularProgress, Hidden } from '@material-ui/core';
import { Announcement, BusinessCenter, DoneAll, ThumbUp } from '@material-ui/icons';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import logo from '../../../public/bix_logo.svg';
import { useApp } from '../../app.context';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { CompanySearch } from '../../components/company-search/company-search';
import { Header } from '../../components/header/header';
import { PageNotFound } from '../../components/page-not-found/page-not-found';
import { ProfilePage } from '../../interfaces/profile-page';
import { useTranslate } from '../../translate.context';
import { ssrBixClient } from '../../utils/ssr-bix-client';
import { useCompanyIdentity } from '../../utils/use-company-identity';
import { Rating } from '../rating/rating';
import { ContentSegment } from './components/content-segments';
import { usePublicProfileEffects } from './hooks/public-profile-effects';
import { ContentSegmentTypes, useContentSegment } from './hooks/use-content-segment';
import { useFilter } from './hooks/use-filter';
import { useOgMetaElements } from './hooks/use-og-metadata';
import { useProfilePage } from './hooks/use-profile-page';
import { useRatingStructuralData } from './hooks/use-rating-structural-data';
import classes from './public-profile.module.scss';

type PublicProfileProps = { profilePage?: ProfilePage };

export const PublicProfile: NextPage<PublicProfileProps> = ({ profilePage: ssrProfilePage }) => {
  const { t } = useTranslate();
  const router = useRouter();
  const { publicProfileService } = useApp();
  const { alias, by } = useCompanyIdentity();
  const { activeSegment } = useContentSegment(ContentSegmentTypes.REVIEWS);
  const { loading, profilePage } = useProfilePage(ssrProfilePage);
  const { filter, setFilter } = useFilter();
  usePublicProfileEffects({ ssrProfilePage, publicProfileService, filter, companyIdentity: { alias, by } });

  const ratingStructuralData = useRatingStructuralData(profilePage);
  const ogMetaElements = useOgMetaElements(profilePage);

  return (
    <div>
      <Head>
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
                activeTab={activeSegment}
                activate={async (fragment) => {
                  await router.push(
                    `/bix-profil/[companyAlias]?by=${by}`,
                    `/bix-profil/${alias}?by=${by}#segment=${fragment}`,
                  );
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
                {router.route === '/bix-profil/[companyAlias]/ertekeles/[companyFormID]' ? (
                  <Rating />
                ) : (
                  <ContentSegment
                    activeSegment={activeSegment}
                    alias={alias}
                    filter={{ filter, setFilter }}
                    profilePage={profilePage}
                  />
                )}
              </CompanyFrame>
            </div>
          </div>
          <Hidden lgUp>
            <BottomNavigation
              className={classes.bottomNav}
              value={activeSegment}
              onChange={async (changeEvent, newValue) =>
                await router.push(
                  `/bix-profil/[companyAlias]?by=${by}`,
                  `/bix-profil/${alias}?by=${by}#segment=${newValue}`,
                )
              }
            >
              <BottomNavigationAction
                classes={{ selected: classes.selected }}
                label="Értékelések"
                value="reviews"
                icon={<ThumbUp />}
              />
              <BottomNavigationAction
                classes={{ selected: classes.selected }}
                label="Díjak"
                value="awards"
                icon={<DoneAll />}
              />
              <BottomNavigationAction
                classes={{ selected: classes.selected }}
                label="Hírek"
                value="news"
                icon={<Announcement />}
              />
              <BottomNavigationAction
                classes={{ selected: classes.selected }}
                label="Termékek"
                value="products"
                icon={<BusinessCenter />}
              />
            </BottomNavigation>
          </Hidden>
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

PublicProfile.getInitialProps = async (ctx) =>
  await ssrBixClient(
    ctx,
    async (ctx, bixClient) => {
      const alias = ctx.query.companyAlias as string;
      const by = (ctx.query.by as 'ID' | 'ALIAS') || 'ALIAS';
      const profilePage = (await bixClient.publicProfile.profile
        .getProfileByCompany(alias, by)
        .catch((_) => null)) as ProfilePage | null;
      return {
        profilePage,
      };
    },
    {
      fallback: {
        profilePage: null,
      },
    },
  );
