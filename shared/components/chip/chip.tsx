import { FC } from 'react';
import classes from './chip.module.scss';

interface ChipProps {
  text: string;
  marginRight?: string;
}

export const Chip: FC<ChipProps> = ({ text, marginRight = '1rem' }) => {
  return (
    <div className={classes.chip} style={{ marginRight }}>
      {text}
    </div>
  );
};
