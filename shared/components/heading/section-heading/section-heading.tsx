import { FC } from 'react';
import classes from './section-heading.module.scss';

export const SectionHeading: FC = ({ children }) => <h2 className={classes.sectionHeading}>{children}</h2>;
