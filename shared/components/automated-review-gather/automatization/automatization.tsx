import CheckIcon from '@material-ui/icons/Check';
import clx from 'classnames';
import React, { FC } from 'react';
import bixStartStep1 from '../../../../public/images/automated-gather-review/bix-start-step-1.png';
import bixStartStep2 from '../../../../public/images/automated-gather-review/bix-start-step-2.png';
import bixStartSteps from '../../../../public/images/automated-gather-review/bix-start-steps.png';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import { SectionSubHeading } from '../../heading/section-sub-heading/section-sub-heading';
import classes from './automatization.module.scss';

interface IAutomatizationProps {
  id: string;
}

export const Automatization: FC<IAutomatizationProps> = ({ id }) => (
  <section className={classes.automatization} id={id}>
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-10 offset-md-1 text-center" id="mutasdafolyamatot">
          <SectionHeading>Így automatizáljuk az elégedettségmérést</SectionHeading>
          <SectionSubHeading>
            Nézd meg hogyan tesszük számodra élménnyé az ügyfél elégedettség mérést!
          </SectionSubHeading>
          <div className={classes.automatizationStepOne}>
            <h3>#1 lépés: beüzemelés</h3>
            <SectionSubHeading>
              “A jól működő automatizációért egyszer kell megdolgozni, utána Ő dolgozik értünk.”
            </SectionSubHeading>
            <div className="row mt-40 mb-40">
              <div className="col-12 col-md-6">
                <div className={clx(classes.automatizationStepCard, classes.automatizationStepCardOne)}>
                  <h3>A TE feladatod</h3>
                  <div>
                    <h4>1.</h4>
                    <p>BIX profil feltöltése</p>
                  </div>
                  <div>
                    <h4>2.</h4>
                    <p>Kezdeti partnerlista feltöltése</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mobile-margin-top-30">
                <div className={clx(classes.automatizationStepCard)}>
                  <h3>A MI feladatunk</h3>
                  <div>
                    <h4>1.</h4>
                    <p>
                      <strong>Automatikus</strong> értékelés bekérés (maximum 2 emlékeztető levél)
                    </p>
                  </div>
                  <div>
                    <h4>2.</h4>
                    <p>
                      <strong>Automatikus</strong> vezetői riport
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-40">
              <div className="col-12 text-center">
                <h5>Miért érdemes automatizálni az elégedettségmérést?</h5>
              </div>
            </div>
            <div className="row mt-20 mb-40">
              <div className={clx('col-12 col-md-6', classes.popularAdvantages)}>
                <div>
                  <CheckIcon />
                  <span>Folyamatos törődést jelent a meglévő ügyfelekkel</span>
                </div>
                <div>
                  <CheckIcon />
                  <span>Azonnali beavatkozási lehetőség lesz a kezedben</span>
                </div>
              </div>
              <div className={clx('col-12 col-md-6', classes.popularAdvantages)}>
                <div style={{ justifyContent: 'flex-start' }}>
                  <CheckIcon />
                  <span>Tűpontos (és hiteles) ügyfélvisszajelzéseket kapsz</span>
                </div>
                <div style={{ justifyContent: 'flex-start' }}>
                  <CheckIcon />
                  <span>Újraaktiválhatod a régi ügyfeleidet</span>
                </div>
              </div>
            </div>
            <div className="row mt-40">
              <div className="col-12 text-center">
                <h3>BIX bevezetésének első lépései</h3>
                <img src={bixStartSteps} alt="bix-start-lépések" className="mt-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: '100px' }}>
        <div className={clx('col-12 col-md-6', classes.automatizationStepDetail)}>
          <h3>#2 lépés: Folyamatos értékelések</h3>
          <p>A folyamatos értékelések két pillérre épülnek</p>
          <h4>1. Új értékelések bekérése havonta</h4>
          <p>
            <span className="hashtag-color">#ésnemállunkmeg</span>: a BIX-hez folyamatosan készülnek új integrációk,
            melyek segítenek abban, hogy a partnerlista automatikusan bővüljön.
          </p>
          <p>
            <strong style={{ color: '#5E5E5E' }}>Tipp: </strong>Havonta frissítsd az ügyféllistádat havonta, hogy
            naprakész legyen a minta!
          </p>
          <p>
            Jelenleg készülő integrációink: <span className="hashtag-color">#szamlazz.hu </span>
            <span className="hashtag-color">#minicrm</span>
          </p>
        </div>
        <div className={clx('col-12 col-md-6 mobile-margin-top-30', classes.automatizonStepDetailImage)}>
          <img src={bixStartStep1} alt="bix-start-lépés-1" />
        </div>
      </div>
      <div className="row" style={{ marginTop: '60px' }}>
        <div className={clx('col-12 col-md-6 mobile-margin-top-30', classes.automatizonStepDetailImage)}>
          <img src={bixStartStep2} alt="bix-start-lépés-1" />
        </div>
        <div className={clx('col-12 col-md-6 mobile-margin-top-30', classes.automatizationStepDetail)}>
          <h4>2. A három hónapnál régebben értékelt ügyfelek &quot;újrakérdezése&quot;</h4>
          <p>
            Ez a funkció különösen értékes, hiszen frissen tartja az ügyfélállistádat, folyamatos kapcsolatot tart a
            megrendelőkkel, ami elmélyíti a márkahűséget és bizalmat épít.{' '}
          </p>
          <p>
            Miért szeretik az ügyfeleink? <strong style={{ color: '#5E5E5E' }}>Mert leadeket (re)generál!</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
);
