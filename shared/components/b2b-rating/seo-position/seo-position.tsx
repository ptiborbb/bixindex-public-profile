import clx from 'classnames';
import React, { FC } from 'react';
import seoPosotion from '../../../../public/images/b2b-rating/seo-position.png';
import classes from './seo-position.module.scss';

interface SeoPositionProps {
  id: string;
}

export const SeoPosition: FC<SeoPositionProps> = ({ id }) => (
  <div className={classes.seoPosotionContainer} id={id}>
    <div className={clx('row mt-120', classes.seoPosotion)}>
      <div className={clx('col-12 col-md-6', classes.seoPositionText)}>
        <h3>A BIX külső hivatkozásként erősíti a SEO pozíciódat!</h3>
        <p>A BIX profilt a Google kiemelten kezeli, ezáltal hatékonyan képes támogatni a saját weboldaladat!</p>
        <p>
          Számos esetben előfordul, hogy a BIX profil a cég weboldala előtt jön a Google-ben, ezzel is támogatva cég
          saját weboldalát.
        </p>
      </div>
      <div className="col-12 col-md-6 mobile-margin-top-30">
        <img src={seoPosotion} alt="image" />
      </div>
    </div>
  </div>
);
