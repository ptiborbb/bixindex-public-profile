import React, { FC } from 'react';
import client from '../../../../public/images/controlled-data/client.png';
import focus from '../../../../public/images/controlled-data/focus.png';
import industry from '../../../../public/images/controlled-data/industy.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import classes from './benchmark.module.css';

interface IBenchmarkProps {
  id: string;
}

export const Benchmark: FC<IBenchmarkProps> = ({ id }) => (
  <section className={classes.benchmark} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <SectionHeading>Benchmark. Összefüggések. Összehasonlítások.</SectionHeading>
          <SectionSubHeading>
            A BIX együttműködik a Bisnode-dal, így az általunk előállított SOFT információk és a Bisnode-ból érkező HARD
            factek összevetésével számos következtetést, egyéb adatot szolgáltatunk, mely segíti a cég fejlődését.
          </SectionSubHeading>
          <h3>Ilyen adatok:</h3>
        </div>
      </div>
      <div className="row mb-40">
        <div className={['col-12 col-md-4', classes.benchmarkItem].join(' ')}>
          <div>
            <img src={industry} />
          </div>
          <div>
            <h5>Iparági Benchmark</h5>
            <p>
              A versenytársakhoz képest milyenek az értékelések.
              <br />
              <br />
              <strong>TIPP:</strong> Kommunikálhatsz arról, hogy az ügyfélszolgálatod 10%-kal megelőzi a piacot.
            </p>
            {/* <PurpleLink to="/elofizetes">Ez érdekel</PurpleLink> */}
          </div>
        </div>
        <div className={['col-12 col-md-4 mobile-margin-top-50', classes.benchmarkItem].join(' ')}>
          <div>
            <img src={focus} />
          </div>
          <div>
            <h5>Service Focus</h5>
            <p>
              Melyik a cég legnépszerűbb terméke és melyik a legkevésbé az
              <br />
              <br />
              <br />
              <strong>TIPP:</strong> Arra érdemes fókuszálni, ami népszerű
            </p>
            {/* <PurpleLink to="/elofizetes">Jó lenne tudni</PurpleLink> */}
          </div>
        </div>
        <div className={['col-12 col-md-4 mobile-margin-top-50', classes.benchmarkItem].join(' ')}>
          <div>
            <img src={client} />
          </div>
          <div>
            <h5>Client focus</h5>
            <p>
              Kik a cég legjobb ügyfelei, azaz kik azok, akik a legtöbbször veszik igénybe a cég szolgáltatásait
              <br />
              <br />
              <strong>TIPP:</strong> Arra érdemes fókuszálni, ami népszerű
            </p>
            {/* <PurpleLink to="/elofizetes">Ez érdekel</PurpleLink> */}
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: '70px' }}>
        <div className="col-12 text-center">
          <p className={classes.leadParagraph}>
            <span className="hashtag-color">#ésnemállunkmeg:</span> ahogy egyre több értékelés van a rendszerben, újabb
            és újabb információkat állítunk elő
          </p>
        </div>
      </div>
    </div>
  </section>
);
