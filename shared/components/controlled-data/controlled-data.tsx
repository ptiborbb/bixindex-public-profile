import Head from 'next/head';
import React, { FC } from 'react';
import pageTitleImage from '../../../public/images/home/icon-glass.png';
import { SectionSubHeading } from '../heading/section-sub-heading/section-sub-heading';
import { PageFrame } from '../page-frame/page-frame';
import { PageHeader } from '../page-header/page-header';
import { Benchmark } from './benchmark/benchmark';
import { CallToAction } from './call-to-action/call-to-action';
import { CirclesOfTrust } from './circlesoftrust/circlesoftrust';
import classes from './controlled-data.module.scss';
import { PhoneControl } from './phone-control/phone-control';
import { ReviewDescription } from './review-description/review-description';
import { WeKnowExactly } from './we-know-exactly/we-know-exactly';

export const ControlledData: FC = () => {
  const pageTitle = 'Ellenőrzött Adatok';
  return (
    <div className={classes.container}>
      <Head>
        <title>{pageTitle} - BIX - Cégek, akikkel nyugodtan dolgozhatsz</title>
        <meta name="description" content="Tudd meg kinek és miért érték a BIX!" />
        <meta property="og:title" content="Ellenőrzött Adatok - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
        <meta property="og:description" content="Tudd meg kinek és miért érték a BIX!" />
      </Head>
      <PageFrame>
        <PageHeader
          id="dataControlHeader"
          pageTitle={pageTitle}
          pageTitleImage={pageTitleImage}
          mainTitle="Tudjuk mit kell kérdezni. Tudjuk, hogyan kell kérdezni."
          subTitle="Neked annyi a dolgod, hogy használd a kimutatást!"
          style={{ height: '75vh', minHeight: '75vh', maxHeight: '75vh' }}
        >
          <SectionSubHeading>
            Az értékelő űrlapok egységesek, mivel a <strong>BIX célja kettős.</strong>
          </SectionSubHeading>
          <div className="container mt-40">
            <div className="row">
              <div className="col-12 col-md-6 text-center">
                <h3
                  style={{
                    marginBottom: '0',
                    fontSize: '2.5em',
                    fontWeight: 600,
                  }}
                >
                  1.
                </h3>
                <p className="mb-0">Vezetői információt állítunk elő</p>
              </div>
              <div className="col-12 col-md-6 text-center">
                <h3
                  style={{
                    marginBottom: '0',
                    fontSize: '2.5em',
                    fontWeight: 600,
                  }}
                >
                  2.
                </h3>
                <p className="mb-0">B2B rating rendszert működtetünk</p>
              </div>
            </div>
          </div>
        </PageHeader>
        <CirclesOfTrust />
        <ReviewDescription id="reviewDescription" />
        <WeKnowExactly />
        <PhoneControl id="phoneControl" />
        <CallToAction
          title="Minden felhívott ügyfél azt érzi, hogy a cég, akiről értékelést adott PROFI és TÖRŐDIK vele!"
          buttonText="Szeretném, ha a vevőim ezt éreznék"
          buttonLink="/elofizetes"
        />
        <Benchmark id="benchmark" />
        {/* <ControlledDataCTA /> */}
      </PageFrame>
    </div>
  );
};
