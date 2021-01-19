import { IHighlightedCategoryWithCompany } from '@codingsans/bixindex-common/lib/interfaces/highlighted-category';
import { Paper } from '@material-ui/core';
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useTranslate } from '../../translate.context';
import { ssrBixClient } from '../../utils/ssr-bix-client';
import { Container, Divider, SearchContainer } from './components/elements';
import { FeaturedCategoryGrid } from './components/featured-category-grid';
import { ProfileListSearchbar } from './components/profile-list-searchbar';
import { useProfileListHome } from './hooks/use-profile-list-home';
import classes from './profile-list.module.scss';

interface ProfileListHomeProps {
  highlightedCategories: IHighlightedCategoryWithCompany[] | null;
}

export const ProfileListHome: NextPage<ProfileListHomeProps> = ({ highlightedCategories }) => {
  const { t } = useTranslate();
  const { searchText, featuredProps } = useProfileListHome(highlightedCategories);
  return (
    <>
      <Head>
        <title>{t('COMMON.PAGE_TITLE')}</title>
      </Head>
      <Paper elevation={0} className={classes.headerBlock} square>
        <Container>
          <Header />
        </Container>
        <Divider />
        <SearchContainer>
          <ProfileListSearchbar searchText={searchText} />
        </SearchContainer>
        <Divider />
      </Paper>
      <Container>
        <FeaturedCategoryGrid {...featuredProps} />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<ProfileListHomeProps> = async (ctx) => ({
  props: await ssrBixClient<ProfileListHomeProps, GetStaticPropsContext>(
    ctx,
    async (_, bixClient) => {
      const { highlightedCategories } = await bixClient.publicProfile.featured.getHighlighetdCategories();
      console.log(highlightedCategories);
      return {
        highlightedCategories,
      };
    },
    {
      fallback: { highlightedCategories: null },
    },
  ),
  revalidate: 60,
});
