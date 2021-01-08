import { Grid } from '@material-ui/core';
import { FC, useMemo } from 'react';
import { FeaturedCategoryCard } from '../../components/featured-category-card/featured-category-card';
import { FeaturedCategoryWithCompanies } from './mock-fetch';

// TODO: change import after common has been merged
interface FeaturedCategoryGridProps {
  categories: FeaturedCategoryWithCompanies[];
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

const GridHolder: FC = ({ children }) => <div style={{ padding: '32px 0' }}> {children} </div>;
const Gutter: FC = () => <div style={{ padding: '1.3rem 0' }}></div>;
