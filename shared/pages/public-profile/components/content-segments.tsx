import { IProfileRatings } from '@codingsans/bixindex-common';
import { isEqual, omit } from 'lodash';
import React, { FC } from 'react';
import { Awards } from '../../../components/fragments/awards/awards';
import { News } from '../../../components/fragments/news/news';
import { Products } from '../../../components/fragments/products/products';
import { Reviews } from '../../../components/fragments/reviews/reviews';
import { ProfilePage } from '../../../interfaces/profile-page';
import { ContentSegmentTypes } from '../hooks/use-content-segment';
import { FilterOptions } from '../hooks/use-filter';

interface ContentSegmentProps {
  activeSegment: ContentSegmentTypes;
  profilePage: ProfilePage;
  ratings: IProfileRatings;
  alias: string; // not actually alias, either id or alias
  filter: {
    filter: FilterOptions;
    setFilter: (val: FilterOptions) => void;
  };
}

const ContentSegmentBase: FC<ContentSegmentProps> = ({
  activeSegment,
  profilePage,
  ratings,
  alias,
  filter: { filter, setFilter },
}) => {
  switch (activeSegment) {
    case ContentSegmentTypes.REVIEWS:
      return (
        <Reviews
          companyAlias={alias}
          companyFormID={profilePage.profile?.defaultFormID}
          ratings={ratings}
          stats={profilePage.stats}
          npsRates={profilePage.npsRates}
          filter={filter}
          productsAndServices={profilePage.productsAndServices}
          filterChanged={setFilter}
          lastRating={profilePage.lastRating}
        />
      );
    case ContentSegmentTypes.AWARDS:
      return <Awards awards={profilePage.awards} />;
    case ContentSegmentTypes.NEWS:
      return <News articles={profilePage.articles} />;
    case ContentSegmentTypes.PRODUCTS:
      return (
        <Products
          productsAndServices={profilePage.productsAndServices}
          companyFormID={profilePage.profile.defaultFormID}
        />
      );
    default:
      return (
        <Reviews
          companyAlias={alias}
          companyFormID={profilePage.profile?.defaultFormID}
          ratings={ratings}
          stats={profilePage.stats}
          npsRates={profilePage.npsRates}
          filter={filter}
          filterChanged={setFilter}
          productsAndServices={profilePage.productsAndServices}
          lastRating={profilePage.lastRating}
        />
      );
  }
};

export const ContentSegment = React.memo(ContentSegmentBase, (prevProps, newProps): boolean =>
  isEqual(omit(prevProps, ['filter.setFilter']), omit(newProps, ['filter.setFilter'])),
);
