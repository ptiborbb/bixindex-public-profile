import { IProfile } from '@codingsans/bixindex-common';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GradeIcon from '@material-ui/icons/Grade';
import LanguageIcon from '@material-ui/icons/Language';
import PlaceIcon from '@material-ui/icons/Place';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { Chip } from '../chip/chip';
import { CompanyDetailItem } from '../company-detail-item/company-detail-item';
import { ContactItem } from '../contact-item/contact-item';
import { Awards } from '../fragments/awards/awards';
import { News } from '../fragments/news/news';
import { Products } from '../fragments/products/products';
import { Reviews } from '../fragments/reviews/reviews';
import { SocialIcon } from '../social-icon/social-icon';
import classes from './company-frame.module.scss';

interface CompanyFrameProps {
  companyAlias: string;
  companyFormID: string;
  ratings: {
    items: any[];
    count: number;
  };
  profile: any;
  awards: any[];
  articles: any[];
  productsAndServices: any[];
  stats: any;
  npsRates: number[];
  activeFragment: string;
}

export const CompanyFrame: FC<CompanyFrameProps> = ({
  companyAlias,
  companyFormID,
  ratings,
  profile,
  awards,
  articles,
  productsAndServices,
  stats,
  npsRates,
  activeFragment,
}) => {
  const contentSegment = useMemo(() => {
    switch (activeFragment) {
      case 'reviews':
        return (
          <Reviews
            companyAlias={companyAlias}
            companyFormID={companyFormID}
            ratings={ratings}
            stats={stats}
            npsRates={npsRates}
          />
        );
      case 'awards':
        return <Awards awards={awards} />;
      case 'news':
        return <News articles={articles} />;
      case 'products':
        return <Products productsAndServices={productsAndServices} />;
      default:
        return (
          <Reviews
            companyAlias={companyAlias}
            companyFormID={companyFormID}
            ratings={ratings}
            stats={stats}
            npsRates={npsRates}
          />
        );
    }
  }, [activeFragment]);
  console.log(productsAndServices);
  return (
    <div className={classes.companyFrame}>
      <div className={classes.companySidebar}>
        <div className={classes.ratingBlock}>
          <div>
            <GradeIcon className={`${classes.ratingStar} ${classes.ratingStarActive}`} />
            <GradeIcon className={`${classes.ratingStar} ${classes.ratingStarActive}`} />
            <GradeIcon className={`${classes.ratingStar} ${classes.ratingStarActive}`} />
            <GradeIcon className={`${classes.ratingStar} ${classes.ratingStarActive}`} />
            <GradeIcon className={`${classes.ratingStar} `} />
          </div>
          <div className={classes.captionText}>Bizalmi index</div>
          <div className={classes.ratingCounter}>{stats.index.score}</div>
          <div className={classes.captionText}>ÖSSZESEN {stats.index.ratingCount} DB ÉRTÉKELÉS</div>
        </div>

        <div className={classes.detailsTitle}>Cégadatok</div>
        <div className={classes.detailsBlock}>
          <div className={classes.companyName}>{profile.name}</div>
          <CompanyDetailItem
            icon={<SupervisorAccountIcon />}
            label={'Létszám'}
            value={`${profile.details.employees.value} fő`}
            change={profile.details.employees.change}
          />
          <CompanyDetailItem
            icon={<AutorenewIcon />}
            label={'Éves forgalom'}
            value={`${profile.details.yearlyIncome.value} HUF`}
            change={profile.details.yearlyIncome.change}
          />
          <CompanyDetailItem icon={<AssignmentIcon />} label={'Adoszam'} value={profile.details.taxNumber} />
          <CompanyDetailItem icon={<PlaceIcon />} label={'Cim'} value={profile.details.address} />
          <CompanyDetailItem icon={<SettingsIcon />} label={'Foprofil'} value={profile.details.mainProfile} />
          <CompanyDetailItem icon={<LanguageIcon />} label={'Honlap'} value={profile.website} />
          <CompanyDetailItem icon={<AssignmentIndIcon />} label={'Kapcsolódó profilok'} value={'cégnév1, cégnév2'} />
          <div>
            {profile.fb && <SocialIcon type={'facebook'} />}
            {profile.insta && <SocialIcon type={'insta'} />}
            {profile.linkedin && <SocialIcon type={'linkedin'} />}
          </div>

          <div className={classes.separator}></div>

          <div className={classes.blockLabel}>Termékek és szolgáltatások</div>

          <div className={classes.chipBlock}>
            {productsAndServices.map((product, i) => (
              <Chip key={i} text={product.name} />
            ))}
          </div>

          <div className={classes.separator}></div>

          <div className={classes.blockLabel}>Kapcsolattartó</div>

          {profile.contacts.map((contact, i) => (
            <ContactItem
              key={i}
              image={contact.image}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
            />
          ))}
        </div>
      </div>

      <div className={classes.companyContent}>{contentSegment}</div>
    </div>
  );
};
