import React, { ReactNode, useMemo } from 'react';
import { LocalBusiness, WithContext } from 'schema-dts';
import { ProfilePage } from '../../../interfaces/profile-page';

export const useRatingStructuralData = (profilePage: ProfilePage | null): ReactNode => {
  const localBuisnessStructuredData: WithContext<LocalBusiness> | null = useMemo(
    () =>
      profilePage && {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': profilePage.profile.website,
        name: profilePage.profile.name,
        image: profilePage.profile.logo || 'https://via.placeholder.com/100',
        telephone: profilePage.profile.contacts[0].phone,
        ...(profilePage.ratings.count
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingCount: profilePage.ratings.count,
                reviewCount: profilePage.ratings.count,
                ratingValue: profilePage.stats.index.score,
                worstRating: 0,
                bestRating: 10,
              },
              review: {
                '@type': 'Review',
                author: { '@type': 'Person', name: profilePage.ratings.items[0].name },
                datePublished: profilePage.ratings.items[0].date,
                reviewBody: profilePage.ratings.items[0].summary,
                publisher: { '@type': 'Organization', name: 'Bixindex', sameAs: 'https://bixindex.hu/' },
              },
            }
          : {}),
        url: profilePage.profile.website,
        address: {
          '@type': 'PostalAddress',
          streetAddress: profilePage.profile.details.address,
        },
      },
    [profilePage],
  );

  return useMemo(
    () => (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBuisnessStructuredData),
        }}
      ></script>
    ),
    [localBuisnessStructuredData],
  );
};
