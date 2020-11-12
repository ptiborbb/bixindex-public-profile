import Head from 'next/head';
import { FC } from 'react';
import pageTitleImage from '../../../public/images/home/icon-gears.png';
import { PageFrame } from '../page-frame/page-frame';
import { PageHeader } from '../page-header/page-header';
import { AutomatedReviewGatherCTA } from './automated-review-gather-cta/automated-review-gather-cta';
import classes from './automated-review-gather.module.scss';
import { Automatization } from './automatization/automatization';
import { HandleReviews } from './handle-reviews/handle-reviews';
import { PartnerList } from './partner-list/partner-list';

export const AutomatedReviewGather: FC = () => {
  const pageTitle = 'Automatizált elégedettségmérés';
  return (
    <>
      <div className={classes.container}>
        <Head>
          <title>{pageTitle} - BIX - Cégek, akikkel nyugodtan dolgozhatsz</title>
          <meta name="description" content="Tudd meg kinek és miért érték a BIX!" />
          <meta
            property="og:title"
            content="Automatizált elégedettségmérés - BIX - Cégek, akikkel nyugodtan dolgozhatsz"
          />
          <meta property="og:description" content="Tudd meg kinek és miért érték a BIX!" />
        </Head>
        <PageFrame>
          <div>
            <PageHeader
              id="automatedReviewHeader"
              pageTitle={pageTitle}
              pageTitleImage={pageTitleImage}
              mainTitle="Tudd minden pillanatban, mit gondolnak rólad az ügyfeleid - extra erőfeszítés nélkül"
              subTitle="A kisvállalkozások ritkán, a nagyobb cégek rendszeresen mérik az ügyfeleik elégedettségét. A BIX-et használó okos vállalatok folyamatosan."
            />
            <PartnerList id="partnerList" />
            <Automatization id="automatization" />
            <HandleReviews id="handleReviews" />
            <AutomatedReviewGatherCTA />
          </div>
        </PageFrame>
      </div>
    </>
  );
};
