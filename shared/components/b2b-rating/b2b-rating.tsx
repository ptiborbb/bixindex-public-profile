import Head from 'next/head';
import React, { FC } from 'react';
import pageTitleImage from '../../../public/images/home/icon-stars.png';
import { CallToAction } from '../controlled-data/call-to-action/call-to-action';
import { PageFrame } from '../page-frame/page-frame';
import { PageHeader } from '../page-header/page-header';
import classes from './b2b-rating.module.scss';
import { BixCompanies } from './bix-companies/bix-companies';
import { BusinessRating } from './buisness-rating/buisness-rating';
import { Resources } from './resources/resources';
import { SeoPosition } from './seo-position/seo-position';
import { WidgetPromo } from './widget-promo/widget-promo';

export const B2BRating: FC = () => {
  const pageTitle = 'B2B Rating';
  const subtitle = (
    <span>
      A BIX az első professzionális platform, ami kiszolgálja őket! <br /> *a marketing365.com felmérése alapján.
    </span>
  );
  return (
    <div className={classes.container}>
      <Head>
        <title>{pageTitle} - BIX - Cégek, akikkel nyugodtan dolgozhatsz</title>
        <meta name="description" content="Tudd meg kinek és miért érték a BIX!" />
        <meta property="og:title" content="B2B Rating - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
        <meta property="og:description" content="Tudd meg kinek és miért érték a BIX!" />
      </Head>
      <PageFrame>
        <PageHeader
          id="b2bRatingHeader"
          pageTitle={pageTitle}
          pageTitleImage={pageTitleImage}
          mainTitle="“Megrendelés előtt az emberek 86%-a ügyfélvéleményeket keres az interneten!*”"
          subTitle={subtitle}
        ></PageHeader>
        <BusinessRating />
        <CallToAction
          title="Szeretném, ha a leendő ügyfeleimet a meglevő ügyfeleim véleménye győzné meg!"
          buttonText="Szeretném a BIX-et!"
          buttonLink="/elofizetes"
        />
        <Resources id="googleIntegration" />
        <CallToAction
          title="Ha már gyűjtöm az ügyfél véleményeket, szeretném ezt hatékonyan tenni!"
          buttonText="Szeretném a BIX-et!"
          buttonLink="/elofizetes"
        />
        <BixCompanies id="bixCompanies" />
        {/* <B2BRatingMiddleCTA /> */}
        <SeoPosition id="seoPosition" />
        <WidgetPromo id="widgetInfo" />
        {/* <B2BRatingCTA /> */}
      </PageFrame>
    </div>
  );
};
