import { useMemo } from 'react';
import { useApp } from '../../../app.context';
import { ProfilePage } from '../../../interfaces/profile-page';

interface UseProfilePageReturn {
  profilePage: ProfilePage;
  loading: boolean;
}

export const useProfilePage = (ssrProfilePage: ProfilePage | null): UseProfilePageReturn => {
  const {
    state: {
      publicProfile: { loading, profilePage: _profilePage },
    },
  } = useApp();

  const profilePage = useMemo(() => _profilePage ?? ssrProfilePage, [_profilePage, ssrProfilePage]);

  return {
    profilePage,
    loading,
  };
};
