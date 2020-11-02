import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Button, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import GradeIcon from '@material-ui/icons/Grade';
import React, { FC } from 'react';
import quoteMarkBg from '../../../public/images/quote-mark-bg.png';
import { useTranslate } from '../../translate.context';
import classes from './profile-list-item.module.scss';

interface ProfileListItemProps {
  profile: IProfileSummary;
}

export const ProfileListItem: FC<ProfileListItemProps> = ({ profile }) => {
  const { t } = useTranslate();
  return (
    <div className={classes.profileListItem}>
      <a
        href={`/bix-profil/${profile.company.companyAlias}`}
        target="_blank"
        rel="noreferrer"
        className={classes.leftCorner}
      >
        <div className={classes.header}>
          <div className={classes.logo}>
            <img alt={profile.profile.name} src={profile.profile.logo || `https://via.placeholder.com/70`} />
          </div>
          <div className={classes.title}>
            <div className={classes.name}>
              <h3>{profile.profile.name}</h3>
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
            </div>
            <div className={classes.profile}>
              {t('COMPANY_SEARCH.MAIN_PROFILE')} {t(`MAIN_PROFILES.${profile?.company?.sector}`)}
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
                <p>{profile.goodRating?.positive}</p>
                <Typography variant="caption" className={classes.reviewWriter}>
                  {'- '}
                  {profile.goodRating?.userName}
                </Typography>
              </>
            )}
          </div>
          <div className={classes.products}>
            <div className={classes.productsTitle}>{t('COMPANY_SEARCH.PRODUCTS')}</div>
            {profile.products.slice(0, 2).map((product) => (
              <div key={product.id} className={classes.product}>
                {product.name}
              </div>
            ))}
            {profile.services.slice(0, 2).map((service) => (
              <div key={service.id} className={classes.product}>
                {service.name}
              </div>
            ))}
          </div>
          <div className={classes.address}>
            <p>
              <Icon>location_on</Icon> {profile.company.addressZip} {profile.company.addressCity}{' '}
              {profile.company.addressStreet}
            </p>
            <p>
              <Icon>business</Icon> {profile.company.taxNumber}
            </p>
            <p>
              <Icon>euro_symbol</Icon> {profile.actualRevenue}
            </p>
            <p>
              <Icon>people</Icon> {profile.company.actualNumberOfEmployees}
            </p>
          </div>
        </div>
      </a>
      <div className={classes.rightCorner}>
        <div className={classes.writeReview}>
          <a
            href={`/bix-profil/${profile.company.companyAlias}/ertekeles/${profile.defaultFormID}`}
            target="_blank"
            rel="noreferrer"
            className={classes.profileListItem}
          >
            <Button endIcon={<Icon>edit</Icon>}>{t('COMPANY_SEARCH.WRITE_REVIEW')}</Button>
          </a>
        </div>
        <div className={classes.goBixProfil}>
          <a
            href={`/bix-profil/${profile.company.companyAlias}`}
            target="_blank"
            rel="noreferrer"
            className={classes.leftCorner}
          >
            <Button variant="text" color="default" endIcon={<Icon>person</Icon>}>
              {t('COMPANY_SEARCH.BIX_PROFILE')}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
