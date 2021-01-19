import { FC } from 'react';
import classes from '../profile-list.module.scss';

export const Divider: FC = () => <div className={classes.divider}></div>;
export const Container: FC = ({ children }) => <div className={classes.container}> {children} </div>;
export const SearchContainer: FC = ({ children }) => <div className={classes.headerBlockInner}> {children} </div>;
export const ResultsContainer: FC = ({ children }) => <div className={classes.resultsContainer}> {children} </div>;

export const GridHolder: FC = ({ children }) => <div style={{ padding: '32px 0' }}> {children} </div>;
export const Gutter: FC = () => <div style={{ padding: '1.3rem 0' }}></div>;
