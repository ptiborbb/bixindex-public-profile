import { FC } from 'react';
import classes from './section-heading.module.scss';

export const SectionHeading: FC<Record<string, unknown>> = ({ children, ...props }) => (
  <h2 className={classes.sectionHeading} {...props}>
    {children}
  </h2>
);
