import { IHighlightedCategoryWithCompany } from '@codingsans/bixindex-common/lib/interfaces/highlighted-category';
import { Grid } from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import { FeaturedCategoryCard } from '../../../components/featured-category-card/featured-category-card';
import { GridHolder, Gutter } from './elements';

interface FeaturedCategoryGridProps {
  categories: (IHighlightedCategoryWithCompany & { originalCategory: string })[];
}

export const FeaturedCategoryGrid: FC<FeaturedCategoryGridProps> = ({ categories }) => {
  // TODO: should be made to a presentational component
  const { mainHighlight, notMainHighlight } = useMemo(
    () => ({
      mainHighlight: categories.filter((c) => c.mainHighlight),
      notMainHighlight: categories.filter((c) => !c.mainHighlight),
    }),
    [categories],
  );
  return (
    <GridHolder>
      <Grid container spacing={3} justify="center">
        {mainHighlight &&
          mainHighlight.map((category) => (
            <Grid item xs={12} md={4} key={Math.random()}>
              <FeaturedCategoryCard {...category} />
            </Grid>
          ))}
      </Grid>
      <Gutter />
      <Grid container spacing={3} justify="center">
        {notMainHighlight &&
          notMainHighlight.map((category) => (
            <Grid item xs={12} md={4} key={Math.random()}>
              <FeaturedCategoryCard {...category} />
            </Grid>
          ))}
      </Grid>
    </GridHolder>
  );
};
