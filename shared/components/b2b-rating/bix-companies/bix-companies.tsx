import clx from 'classnames';
import React, { FC } from 'react';
import bixCompaniesImage from '../../../../public/images/b2b-rating/bixprofil.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import classes from './bix-companies.module.scss';
interface IBixCompaniesProps {
  id: string;
}

export const BixCompanies: FC<IBixCompaniesProps> = ({ id }) => (
  <section className={classes.bixCompanies} id={id} style={{ padding: '80px 0' }}>
    <div className="container">
      <div className="row">
        <div className={clx('col-12 text-center', classes.bixCompaniesContent)}>
          <SectionHeading>BIX cégek</SectionHeading>
          <SectionSubHeading style={{ marginBottom: '96px' }}>
            Nézz meg néhány valódi cégprofilt - képzeld el, Te mit kezdenél vele!
          </SectionSubHeading>
          <div className="col-12 col-md-10 mobile-margin-top-30">
            <img src={bixCompaniesImage} alt="bix-cégek" />
          </div>
          <p className="mt-88 mb-88 fs-32">
            <span className="hashtag-color">#ésnemállunkmeg:</span> március 1.-én jön a BIX cégkereső!
          </p>
        </div>
      </div>
    </div>
  </section>
);
