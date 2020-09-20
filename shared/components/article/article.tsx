import { Link, ThumbUp } from '@material-ui/icons';
import { InfoRounded, Public } from '@material-ui/icons';
import { FC } from 'react';
import classes from './article.module.scss';

interface ArticleProps {
  votes: number;
  date: Date;
  title: string;
  type: string;
  content: string;
  link: string;
}

export const Article: FC<ArticleProps> = ({ votes, date, title, type, content, link }) => {
  return (
    <div className={classes.article}>
      <div className={classes.details}>
        <div className={classes.title}>
          <span>{title}</span>
          <span className={classes.votes}>
            {' '}
            <ThumbUp className={classes.voteIcon} /> {votes}
          </span>
        </div>
        <div className={classes.type}>
          <span className={classes.typeBlock}>
            <InfoRounded fontSize="small" className={classes.icon} /> {type}
          </span>
          <span className={classes.date}>
            <Public fontSize="small" className={classes.icon} /> {date}
          </span>
        </div>
      </div>
      <div className={classes.content}>{content}</div>
      <div className={classes.link}>
        <a href={link}>
          <Link className={classes.icon} fontSize="small" /> {link}
        </a>
      </div>
    </div>
  );
};
