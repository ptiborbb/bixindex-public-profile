import { useEffect, useRef } from 'react';
import { IDOrAlias } from '../../../enums/id-or-alias';
import { EReviewFilterType } from '../../../enums/review-filter-type';
import { ProfilePage } from '../../../interfaces/profile-page';
import { IPublicProfileService } from '../../../services/public-profile.service';
import { FilterOptions } from './use-filter';

interface PublicProfileEffectsInput {
  ssrProfilePage: ProfilePage | null;
  publicProfileService: IPublicProfileService;
  filter: FilterOptions;
  companyIdentity: {
    alias: string;
    by: IDOrAlias;
  };
}

export const usePublicProfileEffects = ({
  ssrProfilePage,
  publicProfileService,
  companyIdentity,
  filter,
}: PublicProfileEffectsInput): void => {
  syncSSRProfileWithState({ companyIdentity, publicProfileService, ssrProfilePage });
  updateRatingsOnFilterChange({ companyIdentity, filter, publicProfileService });
};

const syncSSRProfileWithState = ({
  companyIdentity: { alias, by },
  publicProfileService,
  ssrProfilePage,
}: Pick<PublicProfileEffectsInput, 'ssrProfilePage' | 'publicProfileService' | 'companyIdentity'>): void => {
  useEffect(() => {
    if (ssrProfilePage) {
      publicProfileService.setPublicProfile(ssrProfilePage);
    } else {
      publicProfileService.getPublicProfileByIDOrAlias(alias, by);
    }
  }, [publicProfileService]);
};

const updateRatingsOnFilterChange = ({
  companyIdentity: { alias, by },
  filter,
  publicProfileService,
}: Pick<PublicProfileEffectsInput, 'filter' | 'publicProfileService' | 'companyIdentity'>): void => {
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      publicProfileService.getRatingsByProfile(
        alias,
        by,
        20,
        (filter.pageNumber - 1) * 20,
        filter.stars,
        filter.productOrServiceID ? filter.productOrServiceID : undefined,
        filter.date,
        filter.name,
        filter.isNPS === EReviewFilterType.NPS ? true : filter.isNPS === EReviewFilterType.BIX ? false : undefined,
      );
    }
  }, [publicProfileService, filter]);
};
