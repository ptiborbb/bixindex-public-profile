import { IProfileSummary } from '@codingsans/bixindex-common/lib/interfaces/profile-summary';
import { useEffect } from 'react';
import { ProfileSearchTypes } from '../../../enums/profile-search-types';
import { IPublicProfileService } from '../../../services/public-profile.service';
import { IProfileListState } from '../store/state';
import { searchProfiles } from './utils/search-profiles';

interface UseProfileListEffectsInputs {
  by: ProfileSearchTypes | null;
  searchText: string;
  publicProfileService: IPublicProfileService;
  profileList: IProfileListState;
  ssrProfiles: IProfileSummary[] | null;
}

export const useProfileListSearchEffects = ({
  by,
  profileList,
  publicProfileService,
  searchText,
  ssrProfiles,
}: UseProfileListEffectsInputs): void => {
  searchProfilesIfSSRFails({ profileList, searchText, publicProfileService, ssrProfiles, by });
  resetProfilesOnNavigation({ publicProfileService });
};

const searchProfilesIfSSRFails = ({
  by,
  searchText,
  publicProfileService,
  ssrProfiles,
  profileList: { rowsPerPage },
}: Pick<
  UseProfileListEffectsInputs,
  'searchText' | 'publicProfileService' | 'profileList' | 'ssrProfiles' | 'by'
>): void => {
  useEffect(() => {
    if (ssrProfiles === null) {
      searchProfiles({
        by,
        searchProfilesByName: () => publicProfileService.searchProfilesByName(1, rowsPerPage, searchText),
        searchProfilesByCategory: () => publicProfileService.searchProfilesByCategory(1, rowsPerPage, searchText),
      });
    }
  }, [publicProfileService, searchText, ssrProfiles, by]);
};

const resetProfilesOnNavigation = ({
  publicProfileService,
}: Pick<UseProfileListEffectsInputs, 'publicProfileService'>): void => {
  useEffect(
    () => () => {
      publicProfileService.resetProfiles();
    },
    [publicProfileService],
  );
};
