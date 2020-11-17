import React, { FC } from 'react';
import { SectionHeading } from '../heading/section-heading/section-heading';
import { SectionSubHeading } from '../heading/section-sub-heading/section-sub-heading';
import classes from './page-header.module.scss';

interface IPageHeaderProps {
  id: string;
  pageTitleImage: string;
  pageTitle: string;
  mainTitle: string;
  subTitle: JSX.Element | string;
  style?: object;
  children?: unknown;
}

export const PageHeader: FC<IPageHeaderProps> = ({
  id,
  pageTitleImage,
  pageTitle,
  mainTitle,
  subTitle,
  style,
  children,
}) => (
  <section className={['header-1', classes.pageHeader].join(' ')} id={id} style={style}>
    <div className={['container', classes.pageHeaderContainer].join(' ')}>
      <div className="row" style={{ width: '100%' }}>
        <div className="col-12">
          <div className={classes.pageTitleContainer}>
            <img src={pageTitleImage} />
            <h3 className={classes.pageTitle}>{pageTitle}</h3>
          </div>
          <SectionHeading>{mainTitle}</SectionHeading>
          <SectionSubHeading>{subTitle}</SectionSubHeading>
          {children}
        </div>
      </div>
    </div>
  </section>
);
