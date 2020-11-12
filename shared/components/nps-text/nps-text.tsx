import { FC } from 'react';
import { useTranslate } from '../../translate.context';
import classes from './nps-text.module.scss';

export const NpsText: FC<{ nps: number }> = ({ nps }) => {
  const { t } = useTranslate();
  if (nps >= 0 && nps <= 6) {
    return <span className={`${classes.negative} ${classes.bold}`}>Ellenző</span>;
  } else if (nps >= 7 && nps <= 8) {
    return <span className={`${classes.passive} ${classes.bold}`}>Passzív</span>;
  } else if (nps >= 9 && nps <= 10) {
    return <span className={`${classes.positive} ${classes.bold}`}>Ajánló</span>;
  } else {
    return <span className={`${classes.noNps} ${classes.bold}`}>Nem Adott</span>;
  }
};
