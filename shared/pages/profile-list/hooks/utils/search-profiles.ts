import { ProfileSearchTypes } from '../../../../enums/profile-search-types';

export const searchProfiles = ({
  by,
  searchProfilesByName,
  searchProfilesByCategory,
}: {
  by: ProfileSearchTypes | null;
  searchProfilesByName: () => unknown;
  searchProfilesByCategory: () => unknown;
}): unknown => {
  if (by === ProfileSearchTypes.CATEGORY) {
    return searchProfilesByCategory();
  }
  if (by === ProfileSearchTypes.NAME) {
    return searchProfilesByName();
  }
  return searchProfilesByName();
};
