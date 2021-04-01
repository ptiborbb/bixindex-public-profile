import { CircularProgress, Hidden } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import logo from '../../../public/bix_logo.svg';
import { CompanyFrame } from '../../components/company-frame/company-frame';
import { CompanyHeader } from '../../components/company-header/company-header';
import { Header } from '../../components/header/header';
import { PageNotFound } from '../../components/page-not-found/page-not-found';
import { ProfilePage } from '../../interfaces/profile-page';
import { useTranslate } from '../../translate.context';
import { ssrBixClient } from '../../utils/ssr-bix-client';
import { Rating } from '../rating/rating';
import { BottomNavigationBar } from './components/bottom-navigation-bar';
import { ContentSegment } from './components/content-segments';
import { Container, Divider, HeaderBackground } from './components/elements';
import { useOgMetaElements } from './hooks/use-og-metadata';
import { usePublicProfile } from './hooks/use-public-profile';
import { useRatingStructuralData } from './hooks/use-rating-structural-data';
import classes from './public-profile.module.scss';

type PublicProfileProps = { profilePage?: ProfilePage };

export const PublicProfile: NextPage<PublicProfileProps> = ({ profilePage: ssrProfilePage }) => {
  const { t } = useTranslate();
  const router = useRouter();
  const {
    activeSegment,
    companyIdentity: { alias, by },
    filter,
    loading,
    profilePage,
    ratings,
  } = usePublicProfile(ssrProfilePage);

  const ratingStructuralData = useRatingStructuralData(profilePage);
  const ogMetaElements = useOgMetaElements(profilePage);

  return (
    <div>
      <Head>
        <title>{`${profilePage?.profile?.name}: Vélemények, értékelések, céginformációk`}</title>
        <meta
          name="description"
          content={`Ezen az oldalon ${profilePage?.ratingCount} db értékelést olvashatsz a ${profilePage?.profile?.name}-ről! Érdekel mit mondanak a partnerei? Olvass bele az értékelésekbe!`}
        />
        {ratingStructuralData}
        {ogMetaElements}
      </Head>
      {profilePage ? (
        <>
          <HeaderBackground>
            <Container>
              <Header logoPath={logo} />
            </Container>
            <Divider />
            <Container>
              <CompanyHeader
                companyAlias={alias}
                companyFormID={profilePage.profile.defaultFormID}
                title={profilePage.profile.name}
                logoPath={profilePage.profile.logo}
                companyType={profilePage.profile.type}
                activeTab={activeSegment}
                activate={async (segment) => {
                  await router.push(
                    `/bix-profil/[companyAlias]?by=${by}`,
                    `/bix-profil/${alias}?by=${by}&segment=${segment}`,
                  );
                }}
              />
            </Container>
          </HeaderBackground>
          <div className={classes.frameFix}>
            <Container>
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
                    filter={filter}
                    profilePage={profilePage}
                    ratings={ratings}
                  />
                )}
              </CompanyFrame>
            </Container>
          </div>
          <Hidden lgUp>
            <BottomNavigationBar activeSegment={activeSegment} companyIdentity={{ alias, by }} />
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
