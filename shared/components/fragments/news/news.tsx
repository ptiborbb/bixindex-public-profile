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
      {articles.map((article, i) => (
        <div key={i}>
          {i > 0 && <div className={classes.separator}></div>}
          <Article
            votes={article.votes}
            date={new Date(article.date)}
            title={article.title}
            type={article.type}
            content={article.content}
            link={article.link}
            image={article.image}
          />
        </div>
      ))}
    </div>
  );
};
