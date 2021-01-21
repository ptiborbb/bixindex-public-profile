import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Announcement, BusinessCenter, DoneAll, ThumbUp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { CompanyIdentity } from '../../../utils/use-company-identity';
import { ContentSegmentTypes } from '../hooks/use-content-segment';
import classes from '../public-profile.module.scss';

interface BottomNavigationBarProps {
  activeSegment: ContentSegmentTypes;
  companyIdentity: CompanyIdentity;
}

export const BottomNavigationBar: FC<BottomNavigationBarProps> = ({
  activeSegment,
  companyIdentity: { alias, by },
}) => {
  const router = useRouter();
  return (
    <BottomNavigation
      className={classes.bottomNav}
      value={activeSegment}
      onChange={async (_, newValue) =>
        await router.push(`/bix-profil/[companyAlias]?by=${by}`, `/bix-profil/${alias}?by=${by}#segment=${newValue}`)
      }
    >
      <BottomNavigationAction
        classes={{ selected: classes.selected }}
        label="Értékelések"
        value={ContentSegmentTypes.REVIEWS}
        icon={<ThumbUp />}
      />
      <BottomNavigationAction
        classes={{ selected: classes.selected }}
        label="Díjak"
        value={ContentSegmentTypes.AWARDS}
        icon={<DoneAll />}
      />
      <BottomNavigationAction
        classes={{ selected: classes.selected }}
        label="Hírek"
        value={ContentSegmentTypes.NEWS}
        icon={<Announcement />}
      />
      <BottomNavigationAction
        classes={{ selected: classes.selected }}
        label="Termékek"
        value={ContentSegmentTypes.PRODUCTS}
        icon={<BusinessCenter />}
      />
    </BottomNavigation>
  );
};
