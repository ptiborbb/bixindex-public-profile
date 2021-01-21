import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Skeleton } from '@material-ui/lab';
import { TFunction } from 'next-i18next';
import React, { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProfileListItem } from '../../../components/profile-list-item/profile-list-item';
import { useTranslate } from '../../../translate.context';
import classes from '../profile-list.module.scss';

interface ProfileListSearchResultsProps {
  totalResultCount: number | null;
  elementHeight: number;
  loading: boolean;
  onInfiniteLoad: () => void;
  profiles: IProfileSummary[] | null;
}

export const ProfileListSearchResults: FC<ProfileListSearchResultsProps> = ({
  elementHeight,
  loading,
  onInfiniteLoad,
  profiles,
  totalResultCount,
}) => {
  const { t } = useTranslate();
  return (
    <ResultsWithLoader
      count={totalResultCount}
      t={t}
      loading={loading}
      loader={<Skeleton style={{ marginTop: 30 }} height={elementHeight - 30} animation={'pulse'} variant={'rect'} />}
    >
      <InfiniteScroll
        dataLength={profiles?.length ?? 0}
        hasMore={totalResultCount > (profiles?.length ?? 0)}
        next={onInfiniteLoad}
        loader={<LinearProgress style={{ marginTop: 30 }} />}
      >
        {profiles && profiles?.map((profile) => <ProfileListItem key={profile.profile.id} profile={profile} />)}
      </InfiniteScroll>
    </ResultsWithLoader>
  );
};

const ResultsWithLoader: FC<{
  count: number | null;
  t: TFunction;
  loading: boolean;
  loader: React.ReactElement;
}> = ({ count, loader, loading, t, children }) => {
  if (count === null && loading) {
    return loader;
  }
  return (
    <>
      {count !== null && <h3 className={classes.resultsHeader}> {t('COMPANY_SEARCH.RESULTS_NUMBER', { count })} </h3>}
      {children}
    </>
  );
};
