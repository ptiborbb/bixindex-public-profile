import clx from 'classnames';
import React, { FC } from 'react';
import award from '../../../../public/images/leader-report/award.png';
import conversion from '../../../../public/images/leader-report/conversion.png';
import critics from '../../../../public/images/leader-report/critics.png';
import develop from '../../../../public/images/leader-report/develop.png';
import banner from '../../../../public/images/leader-report/leader-report-extension-banner.png';
import classes from './leader-report-extension.module.scss';

export const LeaderReportExtension: FC = () => (
  <section className={classes.leaderReportExtension}>
    <div className="container">
      <div className="row">
        <div className={clx('col-12 col-md-6 text-center', classes.leaderReportExtensionItem)}>
          <img src={award} alt="díj" />
          <h5 className="mt-32 fw-500">A legjobbra értékelt termék / szolgáltatás</h5>
          <p>Az a termék/ szolgáltatás amivel a legtöbb partner elégedett.</p>
        </div>
        <div className={clx('col-12 col-md-6 text-center mobile-margin-top-50', classes.leaderReportExtensionItem)}>
          <img src={develop} alt="díj" />
          <h5 className="mt-32 fw-500">Fejlesztendő terület az ügyfelek szerint</h5>
          <p>Az a termék/ szolgáltatás amivel a legtöbb partner elégedett.</p>
        </div>
      </div>
      <div className="row mt-72">
        <div className={clx('col-12 col-md-6 text-center', classes.leaderReportExtensionItem)}>
          <img src={critics} alt="díj" />
          <h5 className="mt-32 fw-500">Kritikus/kezelendő ügyfelek</h5>
          <p>
            Azon ügyfelek listája, akik panasszal éltek,
            <br /> vagy gyors kezelésre szorulnak
          </p>
        </div>
        <div className={clx('col-12 col-md-6 text-center mobile-margin-top-50', classes.leaderReportExtensionItem)}>
          <img src={conversion} alt="díj" />
          <h5 className="mt-32 fw-500">Korábbi ügyfelek újra szeretnének rendelni</h5>
          <p>
            Lista azokról, akik az alábbi kérdésre igennel válaszoltak:
            <br />
            <br />
            “Tervezed, hogy újra rendelsz / újra együtt működsz a céggel?”
          </p>
        </div>
      </div>
      <div className="row mt-144">
        <div className={clx('col-12 col-md-6', classes.leaderReportExtensionContent)}>
          <h3>Kérdezd meg amit csak szeretnél</h3>
          <p className="fw-400">Lehet, hogy vezetőként más kérdésed is lenne az ügyfeleidhez?</p>
          <p className="mt-32">
            A BIX EXP csomag lehetőséget biztosít arra, hogy a standard kérdések mellett egyedi kérdésekből is
            készítsünk neked kimutatást!
          </p>
        </div>
        <div className={clx('col-12 col-md-6 mobile-margin-top-50', classes.leaderReportImageContainer)}>
          <img src={banner} alt="image" />
        </div>
      </div>
    </div>
  </section>
);
