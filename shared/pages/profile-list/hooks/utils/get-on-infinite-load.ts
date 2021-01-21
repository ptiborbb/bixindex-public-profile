import { ProfileSearchTypes } from '../../../../enums/profile-search-types';
import { IPublicProfileService } from '../../../../services/public-profile.service';

export const getOnInfiniteLoad = ({
  searchText,
  by,
  pageOptions: { page, rowsPerPage },
  publicProfileService,
}: {
  pageOptions: { page: number; rowsPerPage: number };
  publicProfileService: IPublicProfileService;
  searchText: string;
  by: ProfileSearchTypes | null;
}) => (): void => {
  if (searchText && by === ProfileSearchTypes.NAME) {
    publicProfileService.searchProfilesByName(page + 1, rowsPerPage, searchText);
  }
};
