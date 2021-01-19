import { FC } from 'react';
import classes from '../public-profile.module.scss';

export const Container: FC = ({ children }) => <div className={classes.container}> {children} </div>;
export const Divider: FC = ({ children }) => <div className={classes.divider}> {children} </div>;
export const HeaderBackground: FC = ({ children }) => <div className={classes.headerBlock}> {children} </div>;
