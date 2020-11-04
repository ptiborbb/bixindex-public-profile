import { Avatar, Typography } from '@material-ui/core';
import { Attachment, InfoRounded, Link, Public, ThumbUp } from '@material-ui/icons';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { useTranslate } from '../../translate.context';
import { BixModal } from '../bix-modal/bix-modal';
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
  const { t } = useTranslate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
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
            <InfoRounded fontSize="small" className={classes.icon} /> {t(`NEWS_TYPES.${type}`)}
          </span>
          <span className={classes.date}>
            <Public fontSize="small" className={classes.icon} /> {format(date, 'yyyy.MM.dd. HH:mm')}
          </span>
        </div>
      </div>
      <div className={classes.content}>{content}</div>
      <Typography className={classes.attachmentLabel}>Csatolmány</Typography>
      <div className={classes.attachmentWrapper} onClick={() => setIsImageModalOpen(true)}>
        <Avatar className={classes.attachment} variant="square" src="https://placekitten.com/800/1000">
          <Attachment fontSize="large" />
        </Avatar>
      </div>
      <BixModal open={isImageModalOpen} onClose={() => setIsImageModalOpen(false)}>
        <img className={classes.modalImage} src="https://placekitten.com/800/1000" />
      </BixModal>
      <div className={classes.link}>
        <a href={link}>
          <Link className={classes.icon} fontSize="small" /> {link}
        </a>
      </div>
    </div>
  );
};
