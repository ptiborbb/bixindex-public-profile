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
      '#B31919',
      '#D5191F',
      '#EC4224',
      '#F1681F',
      '#F68E19',
      '#FEAD1D',
      '#FDD605',
      '#E6E7E9',
      '#E6E7E9',
      '#85C741',
      '#45A73A',
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
            <div className={classes.box} style={{ backgroundColor: colors[i] }}>
              {rate}
            </div>
          </div>
        ))}
      </div>

      <div className={classes.npsByRate}>
        <div>
          <SentimentVeryDissatisfied /> Ellenzők:{' '}
          <b>
            {npsScore.worstSum} ({npsScore.percents.worst}%)
          </b>
        </div>
        <div>
          <SentimentSatisfied /> Passzívak:{' '}
          <b>
            {npsScore.neutralSum} ({npsScore.percents.neutral}%)
          </b>
        </div>
        <div>
          <SentimentVerySatisfied /> Ajánlók:{' '}
          <b>
            {npsScore.bestSum} ({npsScore.percents.best}%)
          </b>
        </div>
      </div>
    </div>
  );
};
