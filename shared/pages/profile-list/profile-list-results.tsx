import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Skeleton } from '@material-ui/lab';
import { TFunction } from 'next-i18next';
import React, { FC } from 'react';
import Infinite from 'react-infinite';
import { ProfileListItem } from '../../components/profile-list-item/profile-list-item';
import { useTranslate } from '../../translate.context';
import classes from './profile-list.module.scss';

interface ProfileListListProps {
  totalResultCount: number;
  elementHeight: number;
  containerHeight: number;
  loading: boolean;
  onInfiniteLoad: () => void;
  loadOffset: number;
  profiles: IProfileSummary[];
}

export const ProfileListResults: FC<ProfileListListProps> = ({
  containerHeight,
  elementHeight,
  loadOffset,
  loading,
  onInfiniteLoad,
  profiles,
  totalResultCount,
}) => {
  const { t } = useTranslate();
  return (
    <ResultsWithHeader count={totalResultCount} t={t}>
      <Infinite
        elementHeight={elementHeight}
        containerHeight={containerHeight}
        loadingSpinnerDelegate={
          <Skeleton style={{ marginTop: 30 }} height={elementHeight - 30} animation={'pulse'} variant={'rect'} />
        }
        isInfiniteLoading={loading}
        onInfiniteLoad={onInfiniteLoad}
        useWindowAsScrollContainer={true}
        infiniteLoadBeginEdgeOffset={loadOffset}
      >
        {profiles?.map((profile) => (
          <ProfileListItem key={profile.profile.id} profile={profile} />
        ))}
      </Infinite>
    </ResultsWithHeader>
  );
};

const ResultsWithHeader: FC<{ count: number | null; t: TFunction }> = ({ count, t, children }) => (
  <>
    {count !== null && <h3 className={classes.resultsHeader}> {t('COMPANY_SEARCH.RESULTS_NUMBER', { count })} </h3>}
    {children}
  </>
);
