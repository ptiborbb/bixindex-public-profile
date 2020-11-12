import Head from 'next/head';
import React, { FC } from 'react';
import pageTitleImage from '../../assets/images/home/icon-report.png';
import { PageHeader } from '../page-header/page-header';
import { BixSystem } from './bix-system/bix-system';
import { LeaderReportExtension } from './leader-report-extension/leader-report-extension';
import { LeaderReportInformation } from './leader-report-information/leader-report-information';
import { UserTypes } from './user-types/user-types';

export const LeaderReport: FC = () => {
  const pageTitle = 'Vezetői Riport';
  return (
    <div>
      <Head>
        <title>{pageTitle} - BIX - Cégek, akikkel nyugodtan dolgozhatsz</title>
        <meta name="description" content="Tudd meg kinek és miért érték a BIX!" />
        <meta property="og:title" content="Vezetői Riport - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
        <meta property="og:description" content="Tudd meg kinek és miért érték a BIX!" />
      </Head>
      <div>
        <PageHeader
          id="leaderReportHeader"
          pageTitle={pageTitle}
          pageTitleImage={pageTitleImage}
          mainTitle='"Amire figyelsz az nő - így van ez az ügyfelek elégedettségével is"'
          subTitle="A BIX Vezetői Riport ebben segít!"
        />
        <BixSystem />
        <LeaderReportInformation id="leaderReportInformation" />
        <LeaderReportExtension />
        {/* <CallToAction
          title="Szeretném minden hónapban tudni, mennyire elégedettek az ügyfeleim!"
          buttonText="Megrendelem a BIX-et"
          buttonLink="/elofizetes"
        /> */}
        <UserTypes id="userTypes" />
        {/* <LeaderReportCTA /> */}
      </div>
    </div>
  );
};

export default LeaderReport;
