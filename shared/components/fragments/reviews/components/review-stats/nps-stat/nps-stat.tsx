import { calculateNPS } from '@codingsans/bixindex-common';
import {
  Info,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  ShowChart,
} from '@material-ui/icons';
import { FC, useMemo } from 'react';
import classes from './nps-stat.module.scss';

export interface NpsStatProps {
  npsRates: [number, number, number, number, number, number, number, number, number, number, number];
}

export const NpsStat: FC<NpsStatProps> = ({ npsRates }) => {
  const npsScore = useMemo(() => calculateNPS(npsRates as any), []);
  const colors = useMemo(
    () => [
      { background: '#B31919', text: '#ffffff' },
      { background: '#D5191F', text: '#ffffff' },
      { background: '#EC4224', text: '#ffffff' },
      { background: '#F1681F', text: '#ffffff' },
      { background: '#F68E19', text: '#ffffff' },
      { background: '#FEAD1D', text: '#ffffff' },
      { background: '#FDD605', text: '#ffffff' },
      { background: '#E6E7E9', text: '#8e8e8e' },
      { background: '#E6E7E9', text: '#8e8e8e' },
      { background: '#85C741', text: '#ffffff' },
      { background: '#45A73A', text: '#ffffff' },
    ],
    [],
  );
  return (
    <div className={classes.npsStat}>
      <div className={classes.npsHeader}>
        <ShowChart /> NPS
      </div>

      <div className={classes.npsBoxes}>
        <div className={classes.npsBox}>
          <div className={classes.boxValue}>{npsScore.nps}</div>
          <div className={classes.boxLabel}>NPS ÉRTÉK</div>
        </div>
        <div className={classes.npsBox}>
          <div className={classes.boxValue}>{npsScore.allSum}</div>
          <div className={classes.boxLabel}>összes válasz</div>
        </div>
      </div>

      <div className={classes.npsInfo}>
        <Info /> <b>NPS</b>=Ajánlók ({npsScore.bestSum}) - Ellenzők ({npsScore.worstSum})
      </div>

      <div className={classes.npsLine}>
        {npsRates.map((rate, i) => (
          <div key={i} className={classes.npsItem}>
            <div>{i}</div>
            <div className={classes.box} style={{ backgroundColor: colors[i].background, color: colors[i].text }}>
              {rate}
            </div>
          </div>
        ))}
      </div>

      <div className={`${classes.npsByRate} row`}>
        <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-start mt-3 mt-lg-0 ">
          <SentimentVeryDissatisfied /> Ellenzők:{' '}
          <b>
            {npsScore.worstSum} ({npsScore.percents.worst}%)
          </b>
        </div>
        <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-start mt-3 mt-lg-0 ">
          <SentimentSatisfied /> Passzívak:{' '}
          <b>
            {npsScore.neutralSum} ({npsScore.percents.neutral}%)
          </b>
        </div>
        <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-start mt-3 mt-lg-0 ">
          <SentimentVerySatisfied /> Ajánlók:{' '}
          <b>
            {npsScore.bestSum} ({npsScore.percents.best}%)
          </b>
        </div>
      </div>
    </div>
  );
};
