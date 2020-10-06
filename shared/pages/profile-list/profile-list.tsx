import { FC, useEffect } from 'react';
import { useApp } from '../../app.context';
import { useRouter } from 'next/router';
import classes from './profile-list.module.scss';
import { ProfileListItem } from '../../components/profile-list-item/profile-list-item';

export const ProfileList: FC = () => {
  const {
    publicProfileService,
    state: {
      profileList: { page, profiles, rowsPerPage, count },
    },
  } = useApp();
  const router = useRouter();
  const searchText = router.query.searchText as string;
  useEffect(() => {
    if (searchText) {
      publicProfileService.searchProfilesByName(page, rowsPerPage, searchText);
    }
  }, [publicProfileService]);

  return (
    <div className={classes.listWrapper}>
      {profiles && profiles.map((profile, i) => <ProfileListItem key={i} profile={profile} />)}
    </div>
  );
};
