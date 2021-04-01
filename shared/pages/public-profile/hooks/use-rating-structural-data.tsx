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
        ...(profilePage.ratingCount
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingCount: profilePage.ratingCount,
                reviewCount: profilePage.ratingCount,
                ratingValue: profilePage.stats.index.score,
                worstRating: 0,
                bestRating: 10,
              },
              review: {
                '@type': 'Review',
                author: { '@type': 'Person', name: profilePage.lastRating.name },
                datePublished: profilePage.lastRating.date,
                reviewBody: profilePage.lastRating.summary,
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
