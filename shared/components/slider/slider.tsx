import { Slider, withStyles } from '@material-ui/core';

export const CustomSlider = withStyles({
  rail: {
    backgroundImage: 'linear-gradient(90deg, #D5191F 0%, #EBFF00 55.33%, #85C741 101.18%)',
    height: '4px',
    opacity: 'unset',
    borderRadius: '56px',
  },
  thumb: {
    backgroundColor: 'white',
    color: '#56AAA6',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
  },
  mark: {
    display: 'none',
  },
})(Slider);
