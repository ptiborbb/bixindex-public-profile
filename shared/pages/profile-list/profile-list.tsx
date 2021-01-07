import { Paper } from '@material-ui/core';
import Head from 'next/head';
import React, { FC } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useTranslate } from '../../translate.context';
import { FeaturedCategoryGrid } from './featured-category-grid';
import { useProfileList } from './hooks/use-profile-list';
import { getMockResponse } from './mock-fetch';
import { ProfileListResults } from './profile-list-results';
import { ProfileListSearch } from './profile-list-search';
import classes from './profile-list.module.scss';

export const ProfileList: FC = () => {
  const { t } = useTranslate();
  const { searchText, resultsProps } = useProfileList();
  const categories = getMockResponse();
  return (
    <>
      <Head>
        <title>{t('COMMON.PAGE_TITLE')}</title>
        <meta name="viewport" content="width=800" />
      </Head>
      <Paper elevation={0} className={classes.headerBlock} square>
        <Container>
          <Header />
        </Container>
        <Divider />
        <SearchContainer>
          <ProfileListSearch searchText={searchText} />
        </SearchContainer>
        <Divider />
      </Paper>
      {searchText ? (
        <ResultsContainer>
          <ProfileListResults {...resultsProps} />
        </ResultsContainer>
      ) : (
        <Container>
          <FeaturedCategoryGrid categories={categories} />
        </Container>
      )}

      <Footer />
    </>
  );
};

const Divider: FC = () => <div className={classes.divider}></div>;
const Container: FC = ({ children }) => <div className={classes.container}> {children} </div>;
const SearchContainer: FC = ({ children }) => <div className={classes.headerBlockInner}> {children} </div>;
const ResultsContainer: FC = ({ children }) => <div className={classes.resultsContainer}> {children} </div>;
