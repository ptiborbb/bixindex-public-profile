import { IPublicProfileService } from '../../../../services/public-profile.service';

export const getOnInfiniteLoad = (
  { page, rowsPerPage }: { page: number; rowsPerPage: number },
  publicProfileService: IPublicProfileService,
  searchText: string,
) => (): void => {
  if (searchText) {
    publicProfileService.searchProfilesByName(page + 1, rowsPerPage, searchText);
  }
};
