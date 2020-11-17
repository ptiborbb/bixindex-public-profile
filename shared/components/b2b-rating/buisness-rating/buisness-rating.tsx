import React, { FC } from 'react';
import businessRatingImage from '../../../../public/images/b2b-rating/business-rating.png';
import { PopularAdvantage } from '../../popular-advantage/popular-advantage';
import classes from './buisness-rating.module.scss';

export const BusinessRating: FC = () => (
  <section className={classes.businessRating}>
    <div className="container mb-5 mobile-margin-top-50">
      <div className="row">
        <div className="col-12 col-md-6">
          <h3>Business rating</h3>
          <p>
            A BIX az ügyfél elégedettségi adatokból egyedülálló módon előállít egy publikus indexet, amely a
            nyilvánosság számára elérhető döntéselőkészítő információ! A BIX profilján keresztül olvashatók az
            ügyfélvélemények, és kimutatások.
          </p>
          <div className="mt-24">
            <h5>Népszerű előnyök</h5>
            <PopularAdvantage style={{ marginTop: '24px' }}>Régi ügyfelek újra aktiválása</PopularAdvantage>
            <PopularAdvantage style={{ marginTop: '24px' }}>Pontos visszajelzés az ügyfelektől</PopularAdvantage>
            <PopularAdvantage style={{ marginTop: '24px' }}>Folyamatos törődés a megrendelőkkel</PopularAdvantage>
            <PopularAdvantage style={{ marginTop: '24px' }}>Azonnali lehetőség a beavatkozásra</PopularAdvantage>
          </div>
        </div>
        <div className="col-12 col-md-6 mobile-margin-top-30">
          <img src={businessRatingImage} alt="image" />
        </div>
      </div>
    </div>
  </section>
);
