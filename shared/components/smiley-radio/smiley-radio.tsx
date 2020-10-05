import { Radio, RadioProps, SvgIconTypeMap } from '@material-ui/core';
import React, { FC } from 'react';
import classes from './smiley-radio.module.scss';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

interface SmileyRadioProps extends RadioProps {
  smiley: any;
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
