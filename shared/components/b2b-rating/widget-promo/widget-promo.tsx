import clx from 'classnames';
import React, { FC } from 'react';
import emailSign from '../../../../public/images/b2b-rating/email-sign.png';
import opinionGallery from '../../../../public/images/b2b-rating/opinion-gallery.png';
import widgetImage from '../../../../public/images/b2b-rating/widget.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import classes from './widget-promo.module.scss';

interface WidgetPromoProps {
  id: string;
}

export const WidgetPromo: FC<WidgetPromoProps> = ({ id }) => (
  <section className={classes.widgetPromo} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-10 offset-1 text-center">
          <SectionHeading>Widget, E-mail aláírás, Beépülő vélemény Galéria</SectionHeading>
          <SectionSubHeading>
            A BIX B2B Rating a Google megjelenésen túl számos eszközt biztosít arra, hogy ügyfeleid és leendő ügyfeleid
            értesüljenek kiemelkedő elégedettségi mutatódról!
          </SectionSubHeading>
        </div>
      </div>
      <div className={clx('row mt-136', classes.widgetPromoFeature)}>
        <div className={clx('col-12 col-md-6', classes.widgetPromoFeatureText)}>
          <h3>Widget</h3>
          <p>
            A BIX widgetet egyszerűen beépítheted saját weboldaladba. Segítségével az oldaladon megjelennek az ügyfél
            véleményeid, és a BIX értéked!
          </p>
        </div>
        <div className="col-12 col-md-6 mobile-margin-top-30">
          <img src={widgetImage} alt="image" />
        </div>
      </div>
      <div className={clx('row mt-136', classes.widgetPromoFeature)}>
        <div className="col-12 col-md-6">
          <img src={emailSign} alt="image" />
        </div>
        <div className={clx('col-12 col-md-6 mobile-margin-top-30', classes.widgetPromoFeatureText)}>
          <h3>E-mail aláírás</h3>
          <p>
            Tedd be minden céges e-mail aláírásába a BIX értéked linkjét. Tudja mindenki, mennyire elégedettek veled a
            partnereid!
          </p>
        </div>
      </div>
      <div className={clx('row mt-136', classes.widgetPromoFeature)}>
        <div className={clx('col-12 col-md-6', classes.widgetPromoFeatureText)}>
          <h3>Vélemény Galéria</h3>
          <p>
            <span className="hashtag-color">#március15től</span> elérhető kiegészítő - építsd be az oldaladba a BIX
            vélemény galériát és nem kell többé hiteltelen, erőltetett véleményekkel győzködnöd az ügyfeleidet!
          </p>
        </div>
        <div className="col-12 col-md-6 mobile-margin-top-30">
          <img src={opinionGallery} alt="image" />
        </div>
      </div>
    </div>
  </section>
);
