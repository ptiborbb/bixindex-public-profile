import clx from 'classnames';
import React, { FC } from 'react';
import googleRatingImage from '../../../../public/images/b2b-rating/googleinteg.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import classes from './resources.module.scss';

interface IResourcesProps {
  id: string;
}

export const Resources: FC<IResourcesProps> = ({ id }) => (
  <section className={classes.resources}>
    <div className="container">
      <div className="row">
        <div className="col-10 offset-1 text-center">
          <SectionHeading>
            Gyűjthetsz máshol is értékeléseket de valódi erőforrás csak a BIX segítségével lesz belőle!
          </SectionHeading>
          <SectionSubHeading style={{ marginBottom: '96px' }}>
            Nem mindegy, milyen eszközzel kezeljük referenciáinkat, amely ugyanolyan fontos üzleti erőforrás ma, mint a
            pénz vagy a munkaerő. A piacon számos jó megoldás létezik, közülük is kiemelkedik a BIX, mely
            komplexitásában és egyszerűségében a leghatékonyabb erőforrásképző eszköz.
          </SectionSubHeading>
          {/* <ResourceTable /> */}
        </div>
      </div>
      <div id={id} className={clx('row mt-176', classes.googleData)}>
        <div className={clx('col-12 col-md-8 mb-32', classes.googleDataText)}>
          <h3>A Google szerint minősített adat!</h3>
          <p>A Google világában egyetlen szempont létezik. Azt akarja adni az embereknek, amire kíváncsiak.</p>
          <p>
            A Google az ügyfél véleményeket tartalmazó BIX profilokat minősített információként kezeli és több helyen is
            kiemeli csillagokkal, továbbá SEO szempontból is elsőbbséget élvez.
          </p>
          <p>
            Ez a szolgáltatás a{' '}
            <strong>
              <u>BIX PRO csomagtól</u>
            </strong>{' '}
            automatikus!
          </p>
        </div>
        <div className="col-12 col-md-10 mobile-margin-top-30">
          <img src={googleRatingImage} alt="image" />
        </div>
      </div>
    </div>
  </section>
);
