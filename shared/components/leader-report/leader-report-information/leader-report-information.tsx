import CheckIcon from '@material-ui/icons/Check';
import React, { FC } from 'react';
import reportImage from '../../../../public/images/leader-report/leader-report-information-1.png';
import headset from '../../../../public/images/leader-report/leader-report-information-2.png';
import leaderReportBanner from '../../../../public/images/leader-report/leader-report-information-3.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import classes from './leader-report-information.module.css';

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
        <div className={['col-12 col-md-6 text-center', classes.leaderReportInformationPiece].join(' ')}>
          <img src={reportImage} />
          <h5>Új elégedettségi adatok</h5>
          <p>Az elmúlt hónapban frissített, ügyféllistáról bekért vélemények</p>
        </div>
        <div
          className={['col-12 col-md-6 text-center mobile-margin-top-50', classes.leaderReportInformationPiece].join(
            ' ',
          )}
        >
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
        <div className={['col-12 col-md-6', classes.popularAdvantages].join(' ')}>
          <div>
            <CheckIcon />
            <span>Törődik az ügyfelekkel</span>
          </div>
          <div>
            <CheckIcon />
            <span>Leadet generál</span>
          </div>
        </div>
        <div className={['col-12 col-md-6', classes.popularAdvantages].join(' ')}>
          <div>
            <CheckIcon />
            <span>Korábbi ügyfeleket újra aktivál</span>
          </div>
          <div>
            <CheckIcon />
            <span>Lehetőséget biztosít a beavatkozásra</span>
          </div>
        </div>
      </div>
      <div className="row mt-144">
        <div className={['col-12 col-md-6', classes.leaderReportContent].join(' ')}>
          <h3>Mit tartalmaz a vezetői riport?</h3>
          <p>Megrendelői & beszállítói elégedettségi adatok</p>
          <div>
            <CheckIcon />
            Ár/Érték arány érzékelése
          </div>
          <div>
            <CheckIcon />
            Elvárás/Teljesítés érzékelése
          </div>
          <div>
            <CheckIcon />
            Kommunikáció/Ügyfélszolgálat érzékelése
          </div>
          <div>
            <CheckIcon />
            Szakmai felkészültség/Minőség érzékelése
          </div>
        </div>
        <div className={['col-12 col-md-6 mobile-margin-top-50', classes.leaderReportImageContainer].join(' ')}>
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
