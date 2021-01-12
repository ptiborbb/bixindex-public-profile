import { Hidden, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React, { FC } from 'react';
import classes from './LinkItem.module.scss';
interface ILinkItemProps {
  title: string | JSX.Element;
  route: string;
  onNewTab?: boolean;
}

const LinkItem: FC<ILinkItemProps> = ({ title, route, onNewTab }) => {
  return (
    <>
      <Hidden mdDown>
        {onNewTab ? (
          <a href={route} target="_blank" rel="noreferrer">
            <span className={classes.link}>{title}</span>
          </a>
        ) : (
          <Link href={route}>
            <a>
              <div className={classes.link}>{title}</div>
            </a>
          </Link>
        )}
      </Hidden>
      <Hidden lgUp>
        <Link href={route}>
          <ListItem button>
            <ListItemText primary={title} primaryTypographyProps={{ className: classes.link }} />
          </ListItem>
        </Link>
      </Hidden>
    </>
  );
};

export default LinkItem;
