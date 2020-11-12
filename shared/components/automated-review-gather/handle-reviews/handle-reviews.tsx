import CheckIcon from '@material-ui/icons/Check';
import React, { FC } from 'react';
import handleReviewBanner from '../../../../public/images/automated-gather-review/handle-review-banner.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
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
      <div className="row mt-40">
        <div className={['col-12 col-md-6', classes.popularAdvantages].join(' ')}>
          <div>
            <CheckIcon />
            <span>Régi ügyfelek újra aktiválása</span>
          </div>
          <div>
            <CheckIcon />
            <span>Pontos visszajelzés az ügyfelektől</span>
          </div>
        </div>
        <div className={['col-12 col-md-6', classes.popularAdvantages].join(' ')}>
          <div style={{ justifyContent: 'center' }}>
            <CheckIcon />
            <span>Folyamatos törődés a megrendelőkkel</span>
          </div>
          <div style={{ justifyContent: 'center' }}>
            <CheckIcon />
            <span>Azonnali lehetőség a beavatkozásra</span>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: '100px' }}>
        <div className="col-12">
          <img src={handleReviewBanner} alt="banner" />
        </div>
      </div>
    </div>
  </section>
);
