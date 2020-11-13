import { FC } from 'react';
import logo from '../../../public/bix_logo.svg';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import classes from './page-frame.module.scss';

export const PageFrame: FC = ({ children }) => {
  return (
    <div className={classes.headerBlock}>
      <div className={classes.container}>
        <Header logoPath={logo} />
      </div>
      <div className={classes.divider}></div>
      {children}
      <Footer logoPath={logo}></Footer>
    </div>
  );
};
