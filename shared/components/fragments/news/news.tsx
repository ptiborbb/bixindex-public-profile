import { FC } from 'react';
import { Article } from '../../article/article';
import classes from './news.module.scss';

interface NewsProps {
  articles: any[];
}

export const News: FC<NewsProps> = ({ articles }) => {
  return (
    <div className={classes.news}>
      {articles.map((award, i) => (
        <div key={i}>
          {i > 0 && <div className={classes.separator}></div>}
          <Article
            votes={award.votes}
            date={award.title}
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
