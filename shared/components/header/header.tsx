import Button from '@material-ui/core/Button';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import PhoneIcon from '@material-ui/icons/Phone';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import { useApp } from '../../app.context';
import { useTranslate } from '../../translate.context';
import classes from './header.module.scss';

interface HeaderProps {
  logoPath: string;
}

export const Header: FC<HeaderProps> = ({ logoPath }) => {
  const { t } = useTranslate();
  const {
    state: {
      auth: { user },
    },
    authService,
  } = useApp();

  const logout = useCallback(() => {
    authService.logout();
  }, [authService]);

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>
          <img alt="bix-logo" src={logoPath} />
        </div>
      </Link>
      <div className={classes.links}>
        <Link href="/cegkereso">
          <a className={classes.link}>{t('HEADER.COMPANY_SEARCH')}</a>
        </Link>
        <div className={classes.icons}>
          <div className={classes.link}>
            <PhoneIcon />
          </div>
          <div className={classes.link}>
            <EmojiEventsIcon />
          </div>
        </div>
      </div>
      <div className={classes.cta}>
        <Link href="https://ugyfelkapu.bixindex.hu">
          <Button className={classes.ctaButton}>{t('HEADER.CUSTOMER_PORTAL')}</Button>
        </Link>
      </div>
      <div className={classes.cta}>
        {user ? (
          <Button className={classes.logButton} onClick={logout}>
            {t('HEADER.LOGOUT')}
            <meta name="description" content="Sikeres kijelentkezés! Viszont látásra!" />
            <meta property="og:title" content="Kijelentkezés - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
            <meta property="og:description" content="Sikeres kijelentkezés! Viszont látásra!" />
          </Button>
        ) : (
          <Link href="/auth">
            <Button className={classes.logButton}>{t('HEADER.LOGIN')}</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
