import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import ogProfileBg from '../../../../public/images/bix_profil_og.png';
import { useConfig } from '../../../config.context';
import { ProfilePage } from '../../../interfaces/profile-page';

export type OgMetaProperties = 'og:url' | 'og:type' | 'og:title' | 'og:image' | 'og:description';

export type IOgMetaData = [OgMetaProperties, string];

const useOgMetaData = (profilePage: ProfilePage | null): IOgMetaData[] => {
  const { publicProfileUrl } = useConfig();
  const { asPath, route } = useRouter();
  return useMemo(
    () =>
      profilePage && route === '/bix-profil/[companyAlias]/ertekeles/[companyFormID]'
        ? [
            ['og:url', publicProfileUrl ? `${publicProfileUrl}${asPath}` : ''],
            ['og:type', 'website'],
            ['og:title', `Jelölt vagyok a Legjobb Ügyfélélmény díjra!`],
            [
              'og:description',
              `Készíts értékelést a ${profilePage.profile.name}-vel való együttműködésről, és segítsd, hogy megnyerje a Legjobb Ügyfélélmény díjat! `,
            ],
            ['og:image', ogProfileBg],
          ]
        : [
            ['og:url', publicProfileUrl ? `${publicProfileUrl}${asPath}` : ''],
            ['og:type', 'website'],
            ['og:title', `${profilePage?.profile?.name}: Vélemények, értékelések, céginformációk`],
            [
              'og:description',
              `Ezen az oldalon ${profilePage?.ratings?.count} db értékelést olvashatsz a ${profilePage?.profile?.name}-ről! Érdekel mit mondanak a partnerei? Olvass bele az értékelésekbe!`,
            ],
            ['og:image', ogProfileBg],
          ],
    [profilePage, route],
  );
};

export const useOgMetaElements = (profilePage: ProfilePage | null): ReactNode => {
  const ogMetaData = useOgMetaData(profilePage);
  return useMemo(
    () =>
      ogMetaData ? ogMetaData?.map((data, i) => <meta key={i} property={data[0]} content={data[1]} />) : undefined,
    [ogMetaData],
  );
};