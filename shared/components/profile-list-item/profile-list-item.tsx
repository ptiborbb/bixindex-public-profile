import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import GradeIcon from '@material-ui/icons/Grade';
import { useRouter } from 'next/router';
import { FC } from 'react';
import quoteMarkBg from '../../../public/images/quote-mark-bg.png';
import { useTranslate } from '../../translate.context';
import classes from './profile-list-item.module.scss';

interface ProfileListItemProps {
  profile: IProfileSummary;
}

export const ProfileListItem: FC<ProfileListItemProps> = ({ profile }) => {
  const { t } = useTranslate();
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        await router.push('/bix-profil/[companyAlias]', `/bix-profil/${profile.company.companyAlias}`);
      }}
      className={classes.profileListItem}
    >
      <div className={classes.leftCorner}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img alt={profile.profile.name} src="https://via.placeholder.com/70" />
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
              {t('COMPANY_SEARCH.MAIN_PROFILE')} {profile.company.industry}
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
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium hic, quae ex officia natus harum vel
              facere reiciendis temporibus quod ad et esse autem! Numquam ut earum veritatis corporis aliquid?
            </p>
            <p>
              <b>Teszt Elek</b>, CEO
            </p>
          </div>
          <div className={classes.products}>
            <div className={classes.productsTitle}>{t('COMPANY_SEARCH.PRODUCTS')}</div>
            <div className={classes.product}>Kecske</div>
            <div className={classes.product}>Béka</div>
            <div className={classes.product}>Kredenc</div>
            <div className={classes.product}>Rezsó</div>
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
              <Icon>euro_symbol</Icon> 420 000 000 Ft {/* {profile.company.actualRevenue} */}
            </p>
            <p>
              <Icon>people</Icon> {profile.company.actualNumberOfEmployees}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.rightCorner}>
        <div className={classes.writeReview}>
          <Button endIcon={<Icon>edit</Icon>}>{t('COMPANY_SEARCH.WRITE_REVIEW')}</Button>
        </div>
        <div className={classes.goBixProfil}>
          <Button variant="text" color="default" endIcon={<Icon>person</Icon>}>
            {t('COMPANY_SEARCH.BIX_PROFILE')}
          </Button>
        </div>
      </div>
    </div>
  );
};
