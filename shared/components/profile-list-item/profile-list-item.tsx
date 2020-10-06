import { FC } from 'react';
import { IProfile } from '@codingsans/bixindex-common';
import classes from './profile-list-item.module.scss';

interface ProfileListItemProps {
  profile: IProfile;
}

export const ProfileListItem: FC<ProfileListItemProps> = ({ profile }) => {
  return <div className={classes.profileListItem}>{JSON.stringify(profile)}</div>;
};
