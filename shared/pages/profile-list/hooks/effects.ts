import { useEffect } from 'react';
import { IPublicProfileService } from '../../../services/public-profile.service';
import { IProfileListState } from '../store/state';

interface UseProfileListEffectsInputs {
  searchText: string;
  categoryText: string;
  onHomePage: boolean;
  publicProfileService: IPublicProfileService;
  profileList: IProfileListState;
}

export const useProfileListEffects = ({
  profileList,
  publicProfileService,
  searchText,
  categoryText,
  onHomePage,
}: UseProfileListEffectsInputs): void => {
  searchProfiles({ profileList, searchText, publicProfileService, categoryText });
  getFeaturedCategories({ publicProfileService, onHomePage });
  resetProfilesOnNavigation({ publicProfileService });
};

const searchProfiles = ({
  searchText,
  categoryText,
  publicProfileService,
  profileList: { rowsPerPage },
}: Pick<UseProfileListEffectsInputs, 'searchText' | 'publicProfileService' | 'profileList' | 'categoryText'>): void => {
  useEffect(() => {
    if (searchText && !categoryText) {
      publicProfileService.searchProfilesByName(1, rowsPerPage, searchText);
    }
    if (categoryText && !searchText) {
      publicProfileService.searchProfilesByCategory(1, rowsPerPage, categoryText);
    }
    if (categoryText && searchText) {
      publicProfileService.searchProfilesByName(1, rowsPerPage, searchText);
    }
  }, [publicProfileService, searchText, categoryText]);
};

const getFeaturedCategories = ({
  onHomePage,
  publicProfileService,
}: Pick<UseProfileListEffectsInputs, 'publicProfileService' | 'onHomePage'>): void => {
  useEffect(() => {
    if (onHomePage) {
      publicProfileService.getFeaturedCategories();
    }
  }, [publicProfileService, onHomePage]);
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
