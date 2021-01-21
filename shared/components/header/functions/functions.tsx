import { Collapse, Hidden, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Link from 'next/link';
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslate } from '../../../translate.context';
import { FunctionsDropdown } from '../functions-dropdown/functions-dropdown';
import classes from './functions.module.scss';

interface IFunctionsProps {}

const Functions: FC<IFunctionsProps> = () => {
  const { t } = useTranslate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const [collapseOpen, setCollapseOpen] = useState(false);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Hidden mdDown>
        <span className={classes.link} onMouseEnter={handleClick}>
          {t('HEADER.FUNCTIONS')}
        </span>
        <Popover
          id={id}
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <FunctionsDropdown />
        </Popover>
      </Hidden>
      <Hidden lgUp>
        <ListItem button onClick={() => setCollapseOpen(!collapseOpen)}>
          <ListItemText primary={t('HEADER.FUNCTIONS')} primaryTypographyProps={{ className: classes.link }} />
          {collapseOpen ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
        </ListItem>
        <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/automatizalt-elegedettsegmeres">
              <ListItem button className={classes.nested}>
                <ListItemText
                  primary="Automatizált elégedettségmérés"
                  primaryTypographyProps={{ className: `${classes.link}` }}
                />
              </ListItem>
            </Link>
            <Link href="/ellenorzott-adatok">
              <ListItem button className={classes.nested}>
                <ListItemText primary="Ellenőrzött adatok" primaryTypographyProps={{ className: `${classes.link}` }} />
              </ListItem>
            </Link>
            <Link href="/vezetoi-riport">
              <ListItem button className={classes.nested}>
                <ListItemText primary="Vezetői riport" primaryTypographyProps={{ className: `${classes.link}` }} />
              </ListItem>
            </Link>
            <Link href="/b2b-rating">
              <ListItem button className={classes.nested}>
                <ListItemText primary="B2B Rating" primaryTypographyProps={{ className: `${classes.link}` }} />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </Hidden>
    </>
  );
};

export default Functions;
