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
  rating: {
    value: number;
    count: number;
  };
  profile: IProfile;
}

export const CompanyFrame: FC<CompanyFrameProps> = ({ rating, profile }) => {
  const router = useRouter();
  const hash = useMemo(() => router.asPath.split('#')[1], [router.asPath]);
  const contentSegment = useMemo(() => {
    switch (hash) {
      case 'reviews':
        return <Reviews />;
      case 'awards':
        return <Awards />;
      case 'news':
        return <News />;
      case 'products':
        return <Products />;
      default:
        return <Reviews />;
    }
  }, [hash]);

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
          <div className={classes.ratingCounter}>{rating.value}</div>
          <div className={classes.captionText}>ÖSSZESEN {rating.count} DB ÉRTÉKELÉS</div>
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
            {profile.products.map((product, i) => (
              <Chip key={i} text={product.name} />
            ))}
          </div>

          <div className={classes.blockLabel}>Szakterület</div>

          <div className={classes.chipBlock}>
            {profile.services.map((service, i) => (
              <Chip key={i} text={service.name} />
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