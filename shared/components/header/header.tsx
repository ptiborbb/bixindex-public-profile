import { Popover } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import PhoneIcon from '@material-ui/icons/Phone';
import Link from 'next/link';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { useApp } from '../../app.context';
import { useConfig } from '../../config.context';
import { useTranslate } from '../../translate.context';
import { FunctionsDropdown } from './functions-dropdown/functions-dropdown';
import classes from './header.module.scss';

interface HeaderProps {
  logoPath: string;
}

export const Header: FC<HeaderProps> = ({ logoPath }) => {
  const { blogUrl, customerPortalUrl } = useConfig();
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

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>
          <img alt="bix-logo" src={logoPath} />
        </div>
      </Link>
      <div className={classes.links}>
        <div className={classes.headerButtons}>
          <Link href="/">
            <div className={classes.link}>{t('HEADER.HOME')}</div>
          </Link>
          <a href={blogUrl} target="_blank" rel="noreferrer">
            <span className={classes.link}>{t('HEADER.BLOG')}</span>
          </a>
          <Link href="/cegkereso">
            <span className={classes.link}>{t('HEADER.COMPANY_SEARCH')}</span>
          </Link>
          <span className={classes.link} onMouseEnter={handleClick}>
            {t('HEADER.FUNCTIONS')}
          </span>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <FunctionsDropdown />
          </Popover>
        </div>
        <div className={classes.icons}>
          <div className={classes.link}>
            <PhoneIcon />
          </div>
          <Link href="https://legjobbugyfelelmeny.hu">
            <div className={classes.link}>
              <EmojiEventsIcon />
            </div>
          </Link>
        </div>
      </div>
      <div className={classes.cta}>
        <a target="_blank" rel="noreferrer" href={customerPortalUrl}>
          <Button className={classes.ctaButton}>{t('HEADER.CUSTOMER_PORTAL')}</Button>
        </a>
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
