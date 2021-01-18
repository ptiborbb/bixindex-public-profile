import { IAPIResponse } from '@codingsans/bixindex-common';
import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Paper } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProfileSearchTypes } from '../../enums/profile-search-types';
import { useTranslate } from '../../translate.context';
import { ssrBixClient } from '../../utils/ssr-bix-client';
import { Container, Divider, ResultsContainer, SearchContainer } from './components/elements';
import { ProfileListSearchResults } from './components/profile-list-search-results';
import { ProfileListSearchbar } from './components/profile-list-searchbar';
import { useProfileListSearch } from './hooks/use-profile-list-search';
import { searchProfiles } from './hooks/utils/search-profiles';
import classes from './profile-list.module.scss';

interface ProfileListSearchProps {
  profiles: IProfileSummary[] | null;
  count: number | null;
}

const ProfileListSearch: NextPage<ProfileListSearchProps> = ({ profiles, count }) => {
  const { t } = useTranslate();
  const { searchText, resultsProps } = useProfileListSearch(profiles, count);
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
      <ResultsContainer>
        <ProfileListSearchResults {...resultsProps} />
      </ResultsContainer>
      <Footer />
    </>
  );
};

ProfileListSearch.getInitialProps = async (ctx) =>
  await ssrBixClient<ProfileListSearchProps>(
    ctx,
    async (ctx, bixClient) => {
      const by = (ctx.query.by || null) as ProfileSearchTypes | null;
      const searchText = (ctx.query.searchText || '') as string;
      const { count, items: profiles } = (await searchProfiles({
        by,
        searchProfilesByName: () =>
          bixClient.publicProfile.profile.searchProfilesByName({
            filter: searchText,
            page: 1,
            pageSize: 50,
            sort: '',
          }),
        searchProfilesByCategory: () =>
          bixClient.publicProfile.profile.searchProfilesByCategory({
            category: searchText,
            page: 1,
            pageSize: 50,
          }),
      })) as IAPIResponse<IProfileSummary>;
      return {
        profiles,
        count,
      };
    },
    {
      fallback: {
        profiles: null,
        count: null,
      },
      timeoutMs: 8000,
    },
  );

export { ProfileListSearch };
