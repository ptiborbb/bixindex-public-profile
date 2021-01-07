import { useEffect } from 'react';
import { IPublicProfileService } from '../../../services/public-profile.service';
import { IProfileListState } from '../store/state';

interface UseProfileListEffectsInputs {
  searchText: string;
  publicProfileService: IPublicProfileService;
  profileList: IProfileListState;
}

export const useProfileListEffects = ({
  profileList,
  publicProfileService,
  searchText,
}: UseProfileListEffectsInputs): void => {
  searchProfiles({ profileList, searchText, publicProfileService });
  resetProfiles({ publicProfileService });
};

const searchProfiles = ({
  searchText,
  publicProfileService,
  profileList: { rowsPerPage },
}: Pick<UseProfileListEffectsInputs, 'searchText' | 'publicProfileService' | 'profileList'>): void => {
  useEffect(() => {
    if (searchText) {
      publicProfileService.searchProfilesByName(1, rowsPerPage, searchText);
    }
  }, [publicProfileService, searchText]);
};

const resetProfiles = ({ publicProfileService }: Pick<UseProfileListEffectsInputs, 'publicProfileService'>): void => {
  useEffect(
    () => () => {
      publicProfileService.resetProfiles();
    },
    [publicProfileService],
  );
};
