import Head from 'next/head';
import React, { FC } from 'react';
import { CirclesOfTrust } from './circleoftrust/circleoftrust';

export const ControlledData: FC = () => {
  const pageTitle = 'Ellenőrzött Adatok';
  return (
    <div>
      <Head>
        <title>{pageTitle} - BIX - Cégek, akikkel nyugodtan dolgozhatsz</title>
        <meta name="description" content="Tudd meg kinek és miért érték a BIX!" />
        <meta property="og:title" content="Ellenőrzött Adatok - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
        <meta property="og:description" content="Tudd meg kinek és miért érték a BIX!" />
      </Head>
      <div>
        {/* <PageHeader
          id="dataControlHeader"
          pageTitle={pageTitle}
          pageTitleImage={pageTitleImage}
          mainTitle="Tudjuk mit kell kérdezni. Tudjuk, hogyan kell kérdezni."
          subTitle="Neked annyi a dolgod, hogy használd a kimutatást!"
          style={{ height: '75vh', minHeight: '75vh', maxHeight: '75vh' }}
        > */}
        <h4>
          Az értékelő űrlapok egységesek, mivel a <strong>BIX célja kettős.</strong>
        </h4>
        <div className="container mt-40">
          <div className="row">
            <div className="col-12 col-md-6 text-center">
              <h3>1.</h3>
              <p style={{ marginBottom: '0' }}>Vezetői információt állítunk elő</p>
            </div>
            <div className="col-12 col-md-6 text-center">
              <h3>2.</h3>
              <p style={{ marginBottom: '0' }}>B2B rating rendszert működtetünk</p>
            </div>
          </div>
        </div>
        {/* </PageHeader> */}
        <CirclesOfTrust />
        {/*
        <ReviewDescription id="reviewDescription" />
        <WeKnowExactly />
        <PhoneControl id="phoneControl" />
        <CallToAction
          title="Minden felhívott ügyfél azt érzi, hogy a cég, akiről értékelést adott PROFI és TÖRŐDIK vele!"
          buttonText="Szeretném, ha a vevőim ezt éreznék"
          buttonLink="/elofizetes"
        />
        <Benchmark id="benchmark" />
        <ControlledDataCTA /> */}
      </div>
    </div>
  );
};
