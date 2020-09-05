import { FC, useMemo } from 'react';
import classes from './social-icon.module.scss';
import facebook from '../../../public/social/Facebook.svg';
import google from '../../../public/social/Google.svg';
import linkedin from '../../../public/social/Linkedin.svg';

interface SocialIconProps {
  type: 'facebook' | 'google' | 'linkedin';
  href?: string;
  marginRight?: string;
}

export const SocialIcon: FC<SocialIconProps> = ({ type, href, marginRight = '1rem' }) => {
  const image = useMemo(() => {
    switch (type) {
      case 'facebook':
        return facebook;
      case 'google':
        return google;
      case 'linkedin':
        return linkedin;
    }
  }, [type]);

  return href ? (
    <a className={classes.socialIcon} style={{ marginRight }}>
      <img alt={type} src={image} />
    </a>
  ) : (
    <div className={classes.socialIcon} style={{ marginRight }}>
      <img alt={type} src={image} />
    </div>
  );
};
