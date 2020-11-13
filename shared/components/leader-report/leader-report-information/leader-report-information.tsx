import clx from 'classnames';
import React, { FC } from 'react';
import reportImage from '../../../../public/images/leader-report/leader-report-information-1.png';
import headset from '../../../../public/images/leader-report/leader-report-information-2.png';
import leaderReportBanner from '../../../../public/images/leader-report/leader-report-information-3.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { PopularAdvantage } from '../../popular-advantage/popular-advantage';
import classes from './leader-report-information.module.scss';

interface ILeaderReportInformationProps {
  id: string;
}

export const LeaderReportInformation: FC<ILeaderReportInformationProps> = ({ id }) => (
  <section className={classes.leaderReportInformation} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <SectionHeading>A vezetői riport információforrása</SectionHeading>
        </div>
      </div>
      <div className="row mt-60">
        <div className={clx('col-12 col-md-6 text-center', classes.leaderReportInformationPiece)}>
          <img src={reportImage} />
          <h5>Új elégedettségi adatok</h5>
          <p>Az elmúlt hónapban frissített, ügyféllistáról bekért vélemények</p>
        </div>
        <div className={clx('col-12 col-md-6 text-center mobile-margin-top-50', classes.leaderReportInformationPiece)}>
          <img src={headset} />
          <h5>Korábbi ügyfelek újrakérdezése</h5>
          <p>A BIX 3-4 havonta újra kérdezi azokat az ügyfeleket, akikkel rendszeres az együttműködés</p>
        </div>
      </div>
      <div className="row mt-40 mobile-margin-top-60">
        <div className="col-12 text-center">
          <h5 style={{ textTransform: 'uppercase', fontWeight: 500 }}>Népszerű előnyök</h5>
        </div>
      </div>
      <div className="row">
        <div className={clx('col-12 col-md-6', classes.popularAdvantages)}>
          <PopularAdvantage>
            <span>Törődik az ügyfelekkel</span>
          </PopularAdvantage>
          <PopularAdvantage>
            <span>Leadet generál</span>
          </PopularAdvantage>
        </div>
        <div className={clx('col-12 col-md-6', classes.popularAdvantages)}>
          <PopularAdvantage>
            <span>Korábbi ügyfeleket újra aktivál</span>
          </PopularAdvantage>
          <PopularAdvantage>
            <span>Lehetőséget biztosít a beavatkozásra</span>
          </PopularAdvantage>
        </div>
      </div>
      <div className="row mt-144">
        <div className={clx('col-12 col-md-6', classes.leaderReportContent)}>
          <h3>Mit tartalmaz a vezetői riport?</h3>
          <p>Megrendelői & beszállítói elégedettségi adatok</p>
          <PopularAdvantage>Ár/Érték arány érzékelése</PopularAdvantage>
          <PopularAdvantage>Elvárás/Teljesítés érzékelése</PopularAdvantage>
          <PopularAdvantage>Kommunikáció/Ügyfélszolgálat érzékelése</PopularAdvantage>
          <PopularAdvantage>Szakmai felkészültség/Minőség érzékelése</PopularAdvantage>
        </div>
        <div className={clx('col-12 col-md-6 mobile-margin-top-50', classes.leaderReportImageContainer)}>
          <img src={leaderReportBanner} alt="image" />
        </div>
      </div>
      <div className="row mt-80">
        <div className="col-12 text-center">
          <p className="fs-32">
            “A cég sikere legalább annyira múlik a beszállítói kapcsolatokon, mint a megrendelői kapcsolatokon”
          </p>
        </div>
      </div>
    </div>
  </section>
);
