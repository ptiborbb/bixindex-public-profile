import { FC } from "react";
import classes from "./header.module.scss";

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
        <div className={classes.link}>link</div>
        <div className={classes.link}>link</div>
        <div className={classes.link}>link</div>
        <div className={classes.link}>link</div>
        <div className={classes.link}>link</div>
      </div>
      <div className={classes.cta}>cta</div>
    </header>
  );
};
