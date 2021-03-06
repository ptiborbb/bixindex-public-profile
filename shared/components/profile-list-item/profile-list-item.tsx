import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Button, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import GradeIcon from '@material-ui/icons/Grade';
import { shuffle } from 'lodash';
import React, { FC, useMemo } from 'react';
import quoteMarkBg from '../../../public/images/quote-mark-bg.png';
import { useTranslate } from '../../translate.context';
import classes from './profile-list-item.module.scss';

interface ProfileListItemProps {
  profile: IProfileSummary;
}

export const ProfileListItem: FC<ProfileListItemProps> = ({ profile }) => {
  const { t } = useTranslate();

  const profileUrl = useMemo(() => {
    if (profile.profile.isMainProfile) {
      return `/bix-profil/${profile.company.companyAlias}`;
    } else {
      return `/bix-profil/${profile.profile.id}?by=ID`;
    }
  }, [profile]);

  const reviewUrl = useMemo(() => {
    if (profile.profile.isMainProfile) {
      return `/bix-profil/${profile.company.companyAlias}/ertekeles/${profile.defaultFormID}`;
    } else {
      return `/bix-profil/${profile.profile.id}/ertekeles/${profile.defaultFormID}?by=ID`;
    }
  }, [profile]);

  const productsAndServices = useMemo(() => {
    const joinedList = [...profile.services, ...profile.products];
    return shuffle(joinedList).slice(0, 4);
  }, [profile.products, profile.services]);

  return (
    <div className={classes.profileListItem}>
      <a href={profileUrl} target="_blank" rel="noreferrer" className={classes.leftCorner}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img alt={profile.profile.name} src={profile.profile.logo || `https://via.placeholder.com/70`} />
          </div>
          <div className={classes.title}>
            <div className={classes.name}>
              <h3>{profile.profile.name}</h3>
            </div>
            <div className={classes.starHolder}>
              {Array(5)
                .fill(0)
                .map((_, i) => {
                  return (
                    <GradeIcon
                      key={i}
                      fontSize="small"
                      className={`${classes.ratingStar}${
                        Math.round(profile.ratings.score / 2) > i ? ` ${classes.ratingStarActive}` : ''
                      }`}
                    />
                  );
                })}
            </div>
            <div className={classes.profile}>
              {t('COMPANY_SEARCH.MAIN_PROFILE')} {t(`MAIN_PROFILES.${profile?.profile?.sector}`)}
            </div>
          </div>
          <div className={classes.indexes}>
            <div className={classes.indexTitle}>{t('COMPANY_SEARCH.BIX_INDEX')}</div>
            <div className={classes.index}>
              <span className={classes.mainScore}>{Math.round(profile.ratings.score * 100) / 100}</span>/10
            </div>
            <div className={classes.count}>{t('COMPANY_SEARCH.BIX_COUNT', { count: profile.ratings.count })}</div>
          </div>
        </div>
        <div className={classes.columns}>
          <div className={classes.quote} style={{ backgroundImage: `url(${quoteMarkBg})` }}>
            {profile.goodRating && (
              <>
                <p>{profile.goodRating?.summary}</p>
                <Typography variant="caption" className={classes.reviewWriter}>
                  {'- '}
                  {profile.goodRating?.userName}
                </Typography>
              </>
            )}
          </div>
          <div className={classes.products}>
            <div className={classes.productsTitle}>{t('COMPANY_SEARCH.PRODUCTS')}</div>
            {productsAndServices.map((productOrService) => (
              <div key={productOrService.id} className={classes.product}>
                {productOrService.name}
              </div>
            ))}
          </div>
          <div className={classes.address}>
            <p>
              <Icon>location_on</Icon> {profile.company.addressZip} {profile.company.addressCity}{' '}
              {profile.company.addressStreet}
            </p>
            <p>
              <Icon>business</Icon> {profile.company.taxNumber.replace(/(\d{8})(\d{1})(\d{2})/, '$1-$2-$3')}
            </p>
            <p>
              <Icon>euro_symbol</Icon> {profile.actualRevenue.toLocaleString()} HUF
            </p>
            <p>
              <Icon>people</Icon> {profile.company.actualNumberOfEmployees} f??
            </p>
          </div>
        </div>
      </a>
      <div className={classes.rightCorner}>
        <div className={classes.writeReview}>
          <a href={reviewUrl} target="_blank" rel="noreferrer" className={classes.profileListItem}>
            <Button endIcon={<Icon>edit</Icon>}>{t('COMPANY_SEARCH.WRITE_REVIEW')}</Button>
          </a>
        </div>
        <div className={classes.goBixProfil}>
          <a href={profileUrl} target="_blank" rel="noreferrer">
            <Button variant="text" color="default" endIcon={<Icon>person</Icon>}>
              {t('COMPANY_SEARCH.BIX_PROFILE')}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
