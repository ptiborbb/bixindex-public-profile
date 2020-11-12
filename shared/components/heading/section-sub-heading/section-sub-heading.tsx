import { FC } from 'react';
import classes from './section-sub-heading.module.scss';

interface ISectionSubHeading {
  style?: Record<string, string | number>;
}

export const SectionSubHeading: FC<ISectionSubHeading> = ({ children, ...props }) => (
  <h4 className={classes.sectionSubHeading} {...props}>
    {children}
  </h4>
);
