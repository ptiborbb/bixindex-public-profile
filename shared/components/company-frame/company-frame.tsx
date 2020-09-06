import AssignmentIcon from '@material-ui/icons/Assignment';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GradeIcon from '@material-ui/icons/Grade';
import PlaceIcon from '@material-ui/icons/Place';
import SettingsIcon from '@material-ui/icons/Settings';
import LanguageIcon from '@material-ui/icons/Language';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { FC } from 'react';
import { CompanyDetailItem } from '../company-detail-item/company-detail-item';
import classes from './company-frame.module.scss';
import { SocialIcon } from '../social-icon/social-icon';

interface CompanyFrameProps {
  rating: number;
  ratingCount: number;
  company: {
    name: string;
  };
}

export const CompanyFrame: FC<CompanyFrameProps> = ({ rating, ratingCount, company }) => {
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
          <div className={classes.ratingCounter}>{rating}</div>
          <div className={classes.captionText}>ÖSSZESEN {ratingCount} DB ÉRTÉKELÉS</div>
        </div>

        <div className={classes.detailsTitle}>Cégadatok</div>
        <div className={classes.detailsBlock}>
          <div className={classes.companyName}>{company.name}</div>
          <CompanyDetailItem icon={<SupervisorAccountIcon />} label={'Létszám'} value={'10 fő'} change={'up'} />
          <CompanyDetailItem
            icon={<AutorenewIcon />}
            label={'Eves forgalom'}
            value={'10 000 000 000 HUF'}
            change={'down'}
          />
          <CompanyDetailItem icon={<AssignmentIcon />} label={'Adoszam'} value={'14780846-2-43'} />
          <CompanyDetailItem icon={<PlaceIcon />} label={'Cim'} value={'1095. Soroksári út 48. 10. ép. 2. em. 20'} />
          <CompanyDetailItem icon={<SettingsIcon />} label={'Foprofil'} value={'Rendezvényszervezés'} />
          <CompanyDetailItem icon={<LanguageIcon />} label={'Honlap'} value={'www.bizalmikor.hu'} />
          <CompanyDetailItem icon={<AssignmentIndIcon />} label={'Kapcsolódó profilok'} value={'cégnév1, cégnév2'} />
          <div>
            <SocialIcon type={'facebook'} />
            <SocialIcon type={'google'} />
            <SocialIcon type={'linkedin'} />
          </div>
        </div>
      </div>
      <div className={classes.companyContent}>CONTENT</div>
    </div>
  );
};
