import React, { FC } from 'react';
import customer from '../../../../public/images/controlled-data/customer.png';
import event from '../../../../public/images/controlled-data/event.png';
import manufacturer from '../../../../public/images/controlled-data/manufacturer.png';
import retailor from '../../../../public/images/controlled-data/reatiler2.png';
import retailer from '../../../../public/images/controlled-data/retailer.png';
import review from '../../../../public/images/controlled-data/review.png';
import services from '../../../../public/images/controlled-data/services.png';
import wholesaler from '../../../../public/images/controlled-data/wholesaler.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import { PopularAdvantage } from '../../popular-advantage/popular-advantage';
import classes from './review-description.module.scss';

interface IReviewDescriptionProps {
  id: string;
}

export const ReviewDescription: FC<IReviewDescriptionProps> = ({ id }) => (
  <section className={classes.reviewDescription} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <SectionHeading>Űrlapok - ágazatonként</SectionHeading>
          <SectionSubHeading>
            Azért, hogy pontosabb képet adjunk, ágazatonként más-más kérdéseket teszünk fel.
          </SectionSubHeading>
          <SectionSubHeading style={{ marginTop: '50px' }}>
            Jelen pillanatban három kategóriában vannak kérdéssoraink:
          </SectionSubHeading>
        </div>
      </div>
      <div className="row mt-40">
        <div className={['col mobile-margin-top-50', classes.reviewDescriptionCardContainer].join(' ')}>
          <div className={classes.reviewDescriptionCard}>
            <img src={services} alt="Szolgáltató" />
            <h4>Szolgáltató</h4>
          </div>
        </div>
        <div className={['col', classes.reviewDescriptionCardContainer].join(' ')}>
          <div className={classes.reviewDescriptionCard}>
            <img src={manufacturer} alt="gyártó" />
            <h4>Gyártó</h4>
          </div>
        </div>
        <div className={['col mobile-margin-top-50', classes.reviewDescriptionCardContainer].join(' ')}>
          <div className={classes.reviewDescriptionCard}>
            <img src={wholesaler} alt="Nagykereskedelem" />
            <h4>Nagykereskedelem</h4>
          </div>
        </div>
        <div className={['col mobile-margin-top-50', classes.reviewDescriptionCardContainer].join(' ')}>
          <div className={classes.reviewDescriptionCard}>
            <img src={retailor} alt="Kiskereskedelem" />
            <h4>Kiskereskedelem</h4>
          </div>
        </div>
        <div className={['col mobile-margin-top-50', classes.reviewDescriptionCardContainer].join(' ')}>
          <div className={classes.reviewDescriptionCard}>
            <img src={event} alt="rendezvényszervező" />
            <h4>Rendezvényszervező</h4>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: '80px' }}>
        <div className="col-12 text-center">
          <p className={classes.leadParagraph}>
            <span className="hashtag-color">#ésnemállunkmeg:</span> folyamatosan bővítjük a kategóriákat, hogy egyre
            pontosabb és pontosabb képet adjunk.
          </p>
          <SectionSubHeading style={{ marginTop: '50px' }}>
            Külön mérjük a megrendelői és beszállítói elégedettséget is.
          </SectionSubHeading>
        </div>
      </div>
      <div className="row mt-40">
        <div className={['col-12 col-md-4 offset-md-2', classes.reviewDescriptionCardContainer].join(' ')}>
          <div className={classes.reviewDescriptionCard}>
            <img src={customer} alt="gyártó" />
            <h4>Megrendelő</h4>
          </div>
        </div>
        <div className={['col-12 col-md-4 mobile-margin-top-50', classes.reviewDescriptionCardContainer].join(' ')}>
          <div className={classes.reviewDescriptionCard}>
            <img src={retailer} alt="gyártó" />
            <h4>Beszállító</h4>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: '120px' }}>
        <div className="col-12 col-md-6">
          <SectionHeading style={{ fontSize: '2em' }}>Pontok helyett szöveges válaszok</SectionHeading>
          <p>
            A BIX kezdeti fejlesztéseinél felismertük, hogy pontozással nem tudunk elég pontos képet adni sem a
            Vezetőknek sem a Piacnak.
          </p>
          <p>
            Éppen ezért minden felmérésnél szöveges válaszok közül választhatnak az értékelők. Ezzel sokkal hitelesebb
            és pontosabb képet adunk.
          </p>
          <div className={classes.popularAdvantages}>
            <h5>Népszerű előnyök</h5>
            <div className="row">
              <div className="col-6">
                <PopularAdvantage>Régi ügyfelek újra aktiválása</PopularAdvantage>
                <PopularAdvantage>Folyamatos törődés a megrendelőkkel</PopularAdvantage>
              </div>
              <div className="col-6">
                <PopularAdvantage>Pontos visszajelzés az ügyfelektől</PopularAdvantage>
                <PopularAdvantage>Azonnali lehetőség a beavatkozásra</PopularAdvantage>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <img src={review} alt="review" />
        </div>
      </div>
    </div>
  </section>
);
