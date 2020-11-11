import { Link } from '@material-ui/icons';
import { FC } from 'react';
import { convertLinkToAbsolute } from '../../utils/link-to-absolute';
import classes from './award.module.scss';

interface AwardProps {
  image: string;
  date: Date;
  title: string;
  description: string;
  link: string;
}

export const Award: FC<AwardProps> = ({ image, date, title, description, link }) => {
  return (
    <div className={classes.award}>
      <div className={classes.image} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={classes.body}>
        <div className={classes.type}>
          Díj<span className={classes.date}>{date}</span>
        </div>
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
        {link && (
          <div className={classes.link}>
            <a href={convertLinkToAbsolute(link)}>
              <Link className={classes.icon} fontSize="small" /> {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
