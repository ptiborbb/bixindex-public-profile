import Button from '@material-ui/core/Button';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import PhoneIcon from '@material-ui/icons/Phone';
import { FC } from 'react';
import { useTranslate } from '../../translate.context';
import classes from './header.module.scss';

interface HeaderProps {
  logoPath: string;
}

export const Header: FC<HeaderProps> = ({ logoPath }) => {
  const { t } = useTranslate();
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img alt="bix-logo" src={logoPath} />
      </div>
      <div className={classes.links}>
        <div className={classes.link}>{t('HEADER.FUNCTIONS')}</div>
        <div className={classes.link}>{t('HEADER.SUBSCRIPTION')}</div>
        <div className={classes.link}>{t('HEADER.BLOG')}</div>
        <div className={classes.link}>{t('HEADER.COMPANY_SEARCH')}</div>
        <div className={classes.link}>
          <PhoneIcon />
        </div>
        <div className={classes.link}>
          <EmojiEventsIcon />
        </div>
      </div>
      <div className={classes.cta}>
        <Button className={classes.ctaButton}>{t('HEADER.CUSTOMER_PORTAL')}</Button>
      </div>
    </header>
  );
};
