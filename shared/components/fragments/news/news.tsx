import { FC } from 'react';
import { Article } from '../../article/article';
import classes from './news.module.scss';

interface NewsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  articles: any[]; // TODO missing typings
}

export const News: FC<NewsProps> = ({ articles }) => {
  return (
    <div className={classes.news}>
      {articles.map((award, i) => (
        <div key={i}>
          {i > 0 && <div className={classes.separator}></div>}
          <Article
            votes={award.votes}
            date={new Date(award.date)}
            title={award.title}
            type={award.type}
            content={award.content}
            link={award.link}
          />
        </div>
      ))}
    </div>
  );
};
