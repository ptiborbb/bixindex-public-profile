import React, { FC } from 'react';
import ceoPicture from '../../../../public/images/leader-report/ceo-picture.png';
import marketingPicture from '../../../../public/images/leader-report/marketing-picture.png';
import retailerPicture from '../../../../public/images/leader-report/retailer-picture.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import classes from './user-types.module.css';

interface IUserTypesProps {
  id: string;
}

export const UserTypes: FC<IUserTypesProps> = ({ id }) => (
  <section className={classes.userTypes} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <SectionHeading>Felhasználó típusok</SectionHeading>
          <SectionSubHeading>
            A BIX Management rendszerében az alábbi felhasználó típusok különböztethetők meg
          </SectionSubHeading>
        </div>
      </div>
      <div className="row mt-96">
        <div className={['col-12 col-md-4 text-center', classes.userType].join(' ')}>
          <img src={marketingPicture} alt="marketinges" />
          <h5 className="mt-32">Marketinges</h5>
          <p className="mt-16">Kezeli a felületet</p>
          <p>Feltölti az ügyféllistát</p>
          <p>Válaszol az értékelésekre</p>
          <p>Kezeli a profilt</p>
          <p>Kezeli a beépülő modulokat</p>
        </div>
        <div className={['col-12 col-md-4 text-center mobile-margin-top-50', classes.userType].join(' ')}>
          <img src={ceoPicture} alt="ceo" />
          <h5 className="mt-32">Vezető</h5>
          <p className="mt-16">Minden amit a marketinges tud</p>
          <p>+ vezetői riportot kap</p>
        </div>
        <div className={['col-12 col-md-4 text-center mobile-margin-top-50', classes.userType].join(' ')}>
          <img src={retailerPicture} alt="beszerzo" />
          <h5 className="mt-32">Beszerző</h5>
          <p className="mt-16">Keres</p>
          <p>TOP listát kap</p>
          <p>
            Figyelmeztetést kap, ha egy <br />
            cégről rossz értékelés jön
          </p>
          <p>
            Extra döntéstámogató információkat <br />
            kap a cégről
          </p>
        </div>
      </div>
    </div>
  </section>
);
