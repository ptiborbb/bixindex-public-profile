import React, { FC } from 'react';
import BIXSystemImage from '../../../../public/images/leader-report/bix-calendar.png';
import classes from './bix-system.module.css';

export const BixSystem: FC = () => (
  <section className={classes.bixSystem}>
    <div className={classes.overlay}></div>
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-12">
          <h3>
            A BIX rendszere minden hónap 10-én automatikus vezetői riportot küld az elmúlt hónap elégedettségi
            adataival!
          </h3>
        </div>
        <div className="col-md-4 col-12">
          <img src={BIXSystemImage} alt="partnerlista" />
        </div>
      </div>
    </div>
  </section>
);
