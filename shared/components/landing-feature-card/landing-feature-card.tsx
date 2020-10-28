import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Link from 'next/link';
import { FC } from 'react';
import classes from './landing-feature-card.module.scss';

interface LandingFeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  cta: string;
}

export const LandingFeatureCard: FC<LandingFeatureCardProps> = ({ icon, title, desc, cta }) => {
  return (
    <Card className={classes.h100}>
      <CardContent className={classes.cardContainer}>
        <div className={classes.imgContainer}>
          <img src={icon} />
        </div>
        <h5 className={classes.title}>{title}</h5>
        <p className={classes.desc}>{desc}</p>
        <Link href="/cegkereso">
          <span className={classes.cta}>
            {cta} <Icon>double_arrow</Icon>
          </span>
        </Link>
      </CardContent>
    </Card>
  );
};
