import { Drawer, Hidden, IconButton, List } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneIcon from '@material-ui/icons/Phone';
import Link from 'next/link';
import React, { FC, useCallback, useState } from 'react';
import { useApp } from '../../app.context';
import { useConfig } from '../../config.context';
import { useTranslate } from '../../translate.context';
import Functions from './functions/functions';
import classes from './header.module.scss';
import LinkItem from './LinkItem/LinkItem';

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

  const [mobileOpen, setMobileOpen] = useState(false);

  const links = (
    <>
      <LinkItem title={t('HEADER.HOME')} route={'/'} />
      <LinkItem title={t('HEADER.BLOG')} route={blogUrl} onNewTab />
      <LinkItem title={t('HEADER.COMPANY_SEARCH')} route={'/cegkereso'} />
      <Functions />
    </>
  );
  const icons = (
    <>
      <LinkItem title={<PhoneIcon />} route={'/'} />
      <LinkItem title={<EmojiEventsIcon />} route={'https://legjobbugyfelelmeny.hu'} />
    </>
  );
  const buttons = (
    <>
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
    </>
  );

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>
          <img alt="bix-logo" src={logoPath} />
        </div>
      </Link>
      <Hidden mdDown>
        <div className={classes.links}>
          <div className={classes.headerButtons}>{links}</div>
          <div className={classes.icons}>{icons}</div>
        </div>
        {buttons}
      </Hidden>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={classes.menuButton}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <List>
            {links}
            {icons}
            {buttons}
          </List>
        </Drawer>
      </Hidden>
    </header>
  );
};
