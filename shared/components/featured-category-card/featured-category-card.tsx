import { Button, Card, CardContent, CardHeader, Collapse, IconButton, makeStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { useTranslate } from '../../translate.context';
import { EntryCard } from './entry-card';
import classes from './featured-category-card.module.scss';

interface FeaturedCategoryCardProps {
  category: string;
  count: number;
  mainHighlight: boolean;
  companies: {
    companyId: string;
    companyName: string;
    companyAlias: string;
    profileName: string;
    bixValue: number;
    ratingCount: number;
  }[];
}

export const FeaturedCategoryCard: FC<FeaturedCategoryCardProps> = ({ category, count, companies, mainHighlight }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(mainHighlight);
  const { t } = useTranslate();
  return (
    <Card elevation={2} className={classes.cardBody}>
      <CardHeader
        title={`${category} (${count})`}
        className={mainHighlight ? classes.cardHeaderMain : classes.cardHeaderNotMain}
        classes={styles}
        disableTypography
        action={
          !mainHighlight && (
            <IconButton style={{ boxSizing: 'border-box' }} onClick={() => setOpen((o) => !o)}>
              <ExpandMore className={mainHighlight ? classes.expandArrowMain : classes.expandArrowNotMain} />
            </IconButton>
          )
        }
      />
      <Collapse in={open} timeout="auto">
        <CardContent className={classes.cardContent}>
          {companies.map((company) => (
            <EntryCard {...company} key={company.companyId} />
          ))}
          <ButtonBox>
            <Link href={`/cegkereso?category=${category}`} passHref>
              <a>
                <Button variant="outlined" className={mainHighlight ? classes.mainButton : classes.notMainButton}>
                  {`${t('COMPANY_SEARCH.FEATURED.OPEN_ALL')}`}
                </Button>
              </a>
            </Link>
          </ButtonBox>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const ButtonBox: FC = ({ children }) => (
  <div style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}> {children} </div>
);

const useStyles = makeStyles({
  action: {
    marginTop: '0',
  },
  root: {
    padding: '8px 16px',
  },
});
