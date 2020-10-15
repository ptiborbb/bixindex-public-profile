import { Radio, RadioProps } from '@material-ui/core';
import React, { FC } from 'react';
import classes from './smiley-radio.module.scss';

interface SmileyRadioProps extends RadioProps {
  smiley: unknown;
}

export const SmileyRadio: FC<SmileyRadioProps> = (props: SmileyRadioProps) => {
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={classes.checked}>{props.smiley}</span>}
      icon={<span className={classes.unchecked}>{props.smiley}</span>}
      {...props}
    />
  );
};
