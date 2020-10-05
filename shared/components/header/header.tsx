import Button from '@material-ui/core/Button';
import { FC } from 'react';
import classes from './header.module.scss';
import PhoneIcon from '@material-ui/icons/Phone';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

interface HeaderProps {
  logoPath: string;
}

export const Header: FC<HeaderProps> = ({ logoPath }) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img alt="bix-logo" src={logoPath} />
      </div>
      <div className={classes.links}>
        <div className={classes.link}>Funkciók</div>
        <div className={classes.link}>Elõfizetés</div>
        <div className={classes.link}>Blog</div>
        <div className={classes.link}>Cégkeresõ</div>
        <div className={classes.link}>
          <PhoneIcon />
        </div>
        <div className={classes.link}>
          <EmojiEventsIcon />
        </div>
      </div>
      <div className={classes.cta}>
        <Button className={classes.ctaButton}>
          Ügyfélkapu
        </Button>
      </div>
    </header>
  );
};
