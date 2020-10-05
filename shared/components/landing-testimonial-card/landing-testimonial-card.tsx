import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FC } from 'react';
import classes from './landing-testimonial-card.module.scss';

interface LandingTestimonialCardProps {
  avatar: string;
  name: string;
  title: string;
  desc: string;
  hashtag: string;
}

export const LandingTestimonialCard: FC<LandingTestimonialCardProps> = ({ avatar, name, title, desc, hashtag }) => {
  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.cardContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.avatar} style={{ backgroundImage: `url(${avatar})` }}></div>
          <div className={classes.titleContainer}>
            <h5 className={classes.name}>{name}</h5>
            <h6 className={classes.title}>{title}</h6>
          </div>
        </div>
        <p className={classes.desc}>{desc}</p>
        <p className={classes.hashtag}>{hashtag}</p>
      </CardContent>
    </Card>
  );
};
