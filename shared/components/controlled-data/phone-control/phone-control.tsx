import React, { FC } from 'react';
import phoneControlImage from '../../../../public/images/controlled-data/phone-control.png';
import { PopularAdvantage } from '../../popular-advantage/popular-advantage';
import classes from './phone-control.module.scss';

interface IPhoneControlProps {
  id: string;
}

export const PhoneControl: FC<IPhoneControlProps> = ({ id }) => (
  <section className={classes.phoneControl} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8">
          <h2 style={{ fontSize: '2em' }}>
            Mivel az üzlet nem a rendszeren belül történik, akkor lesz hiteles az adat, ha telefonon leellenőrizzük!
          </h2>
          <p className="fw-400">
            A <u>BIX Call center</u> telefonon ellenőrzi az elégedettségi adatokat. Ezzel kiszűrjük:
          </p>
          <PopularAdvantage>A nem valós textszemélyeket</PopularAdvantage>
          <PopularAdvantage style={{ marginTop: '32px' }}>Az esetleges rágalmazást</PopularAdvantage>
          <PopularAdvantage style={{ marginTop: '32px' }}>Az érzelmileg túlfűtött reakciókat</PopularAdvantage>
          <p className="fw-400" style={{ marginTop: '50px' }}>
            A telefonos ellenőrzés során figyelembe vesszük a <u>cég összes értékelésének számát</u> és a{' '}
            <u>BIX átlagértékét.</u>
          </p>
          <div className={classes.popularAdvantages}>
            <h5>Népszerű előnyök</h5>
            <div>
              <PopularAdvantage>A valótlan információ nem jelenik meg</PopularAdvantage>
              <PopularAdvantage>Leadet generál</PopularAdvantage>
            </div>
            <div>
              <PopularAdvantage>Van lehetőség a panaszok kezelésére</PopularAdvantage>
              <PopularAdvantage>Erősíti az ügyfélkapcsolatokat</PopularAdvantage>
            </div>
          </div>
        </div>
        <div className={['col-12 col-md-4 mobile-margin-top-30', classes.phoneControlImage].join(' ')}>
          <img src={phoneControlImage} alt="review" />
        </div>
      </div>
    </div>
  </section>
);
