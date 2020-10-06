import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Grid, Typography } from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import { FC } from 'react';
import classes from './profile-list-item.module.scss';
import { useRouter } from 'next/router';

interface ProfileListItemProps {
  profile: IProfileSummary;
}

export const ProfileListItem: FC<ProfileListItemProps> = ({ profile }) => {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        await router.push('/bix-profil/[companyAlias]', `/bix-profil/${profile.company.companyAlias}`);
      }}
      className={classes.profileListItem}
    >
      <Grid container spacing={2}>
        <Grid container item md={12}>
          <Grid className={classes.header} item md={8}>
            <div className={classes.logo}>
              <img alt={profile.profile.name} src="https://via.placeholder.com/100" />
            </div>
            <Grid container spacing={1} direction="column" justify="center">
              <Grid container direction="column" justify="center" spacing={1} item>
                <Grid item className={classes.title}>
                  <Typography noWrap variant="h5">
                    {profile.profile.name}
                  </Typography>
                  <div className={classes.starHolder}>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => {
                        return (
                          <GradeIcon
                            key={i}
                            className={`${classes.ratingStar}${
                              Math.round(profile.ratings.score / 2) > i ? ' ' + classes.ratingStarActive : ''
                            }`}
                          />
                        );
                      })}
                  </div>
                </Grid>
                <Grid item>
                  <span>Főprofil: {profile.company.industry}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} className={classes.ratingDetails}>
            <p>BIZALMI INDEX</p>
            <span>{profile.ratings.score}</span>
            <p>ÖSSZESEN {profile.ratings.count} DB ÉRTÉKELÉS</p>
          </Grid>
          <Grid container spacing={2}>
            <Grid></Grid>
            <Grid></Grid>
            <Grid></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
