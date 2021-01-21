import { useApp } from '../../../app.context';
import { ProfilePage } from '../../../interfaces/profile-page';
import { CompanyIdentity, useCompanyIdentity } from '../../../utils/use-company-identity';
import { usePublicProfileEffects } from './public-profile-effects';
import { ContentSegmentTypes, useContentSegment } from './use-content-segment';
import { FilterOptions, useFilter } from './use-filter';
import { useProfilePage } from './use-profile-page';

interface UsePublicProfileReturn {
  companyIdentity: CompanyIdentity;
  activeSegment: ContentSegmentTypes;
  loading: boolean;
  profilePage: ProfilePage | null;
  filter: {
    filter: FilterOptions;
    setFilter: (val: FilterOptions) => void;
  };
}

export const usePublicProfile = (ssrProfilePage: ProfilePage | null): UsePublicProfileReturn => {
  const { publicProfileService } = useApp();
  const companyIdentity = useCompanyIdentity();
  const { activeSegment } = useContentSegment(ContentSegmentTypes.REVIEWS);
  const { loading, profilePage } = useProfilePage(ssrProfilePage);
  const { filter, setFilter } = useFilter();
  usePublicProfileEffects({ ssrProfilePage, publicProfileService, filter, companyIdentity });

  return {
    activeSegment,
    companyIdentity,
    filter: {
      filter,
      setFilter,
    },
    loading,
    profilePage,
  };
};
