import React, { FC } from 'react';
import communication from '../../../../public/images/controlled-data/Communication.png';
import competence from '../../../../public/images/controlled-data/Competence.png';
import concern from '../../../../public/images/controlled-data/Concern.png';
import consistency from '../../../../public/images/controlled-data/Consistency.png';
import opacityXLogo from '../../../../public/images/controlled-data/opacity-x-logo.png';
import classes from './circlesoftrust.module.scss';

export const CirclesOfTrust: FC = () => (
  <section className={classes.circlesOfTrust} style={{ backgroundImage: `url(${opacityXLogo})` }}>
    <div className={classes.overlay}></div>
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h2 style={{ color: '#fff', fontSize: '32px', fontWeight: 'bold' }}>
            A review-k struktúrájának alapjául szolgáló 4 terület <br />
            (4C&apos;s of trust)
          </h2>
        </div>
      </div>
      <div className="row mt-5">
        <div className={['col-12 col-md-3', classes.container].join(' ')}>
          <img src={competence} alt="kompetencia" />
          <h4>Competence</h4>
          <p>(Hozzáértés - szakmaiság)</p>
        </div>
        <div className={['col-12 col-md-3 mobile-margin-top-50', classes.container].join(' ')}>
          <img src={concern} alt="kompetencia" />
          <h4>Care</h4>
          <p>(Törődés)</p>
        </div>
        <div className={['col-12 col-md-3 mobile-margin-top-50', classes.container].join(' ')}>
          <img src={consistency} alt="kompetencia" />
          <h4>Consistency</h4>
          <p>(Következetesség)</p>
        </div>
        <div className={['col-12 col-md-3 mobile-margin-top-50', classes.container].join(' ')}>
          <img src={communication} alt="kompetencia" />
          <h4>Communication</h4>
          <p>(Kommunikáció)</p>
        </div>
      </div>
    </div>
  </section>
);
