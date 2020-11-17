import { FC } from 'react';
import { useTranslate } from '../../translate.context';
import classes from './nps-text.module.scss';

export const NpsText: FC<{ nps: number }> = ({ nps }) => {
  const { t } = useTranslate();
  if (nps >= 0 && nps <= 6) {
    return <span className={`${classes.negative} ${classes.bold}`}>{t('NPS_TEXT.NEGATIVE')}</span>;
  } else if (nps >= 7 && nps <= 8) {
    return <span className={`${classes.passive} ${classes.bold}`}>{t('NPS_TEXT.PASSIVE')}</span>;
  } else if (nps >= 9 && nps <= 10) {
    return <span className={`${classes.positive} ${classes.bold}`}>{t('NPS_TEXT.POSITIVE')}</span>;
  } else {
    return <span className={`${classes.noNps} ${classes.bold}`}>{t('NPS_TEXT.NO_NPS')}</span>;
  }
};
