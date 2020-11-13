import { Divider, Typography } from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import React, { FC } from 'react';
import logo from '../../../public/bix_logo.svg';
import { useTranslate } from '../../translate.context';
import { Header } from '../header/header';
import classes from './page-not-found.module.scss';

interface IPageNotFoundProps {
  text?: string;
}

export const PageNotFound: FC<IPageNotFoundProps> = ({ text }) => {
  const { t } = useTranslate();
  return (
    <div className={classes.root}>
      <div className={classes.headerContainer}>
        <Header logoPath={logo} />
      </div>
      <Divider />
      <div className={classes.main}>
        <div className={classes.mainPaper}>
          <div className={classes.paperContent}>
            <WarningRoundedIcon className={classes.warningIcon} />
            <Typography variant="h5">{text || t('COMMON.PAGE_NOT_FOUND')}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
