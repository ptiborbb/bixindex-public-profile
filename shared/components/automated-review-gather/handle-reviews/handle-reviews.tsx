import clx from 'classnames';
import React, { FC } from 'react';
import handleReviewBanner from '../../../../public/images/automated-gather-review/handle-review-banner.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import { PopularAdvantage } from '../../popular-advantage/popular-advantage';
import classes from './handle-reviews.module.scss';

interface IHandleReviewProps {
  id: string;
}

export const HandleReviews: FC<IHandleReviewProps> = ({ id }) => (
  <section className={classes.handleReviews} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-10 offset-md-1 text-center">
          <SectionHeading>Értékelések kezelése</SectionHeading>
          <SectionSubHeading>
            Az ügyfelek lojalitását növeli, ha reagálsz az értékelésükre! Ez havonta mindössze pár percet vesz igénybe,
            viszont élő kapcsolatot teremt közted és a vevőid között.
          </SectionSubHeading>
          <SectionSubHeading style={{ fontWeight: 600 }}>
            Minderre egy egyszerű és hatékony felület áll a rendelkezésedre
          </SectionSubHeading>
        </div>
      </div>
      <div className="row mt-4">
        <div className={clx('col-12 col-md-5 offset-md-2', classes.popularAdvantages)}>
          <PopularAdvantage>Régi ügyfelek újra aktiválása</PopularAdvantage>

          <PopularAdvantage>Pontos visszajelzés az ügyfelektől</PopularAdvantage>
        </div>
        <div className={clx('col-12 col-md-5', classes.popularAdvantages)}>
          <PopularAdvantage>Folyamatos törődés a megrendelőkkel</PopularAdvantage>

          <PopularAdvantage>Azonnali lehetőség a beavatkozásra</PopularAdvantage>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <img src={handleReviewBanner} alt="banner" />
        </div>
      </div>
    </div>
  </section>
);
