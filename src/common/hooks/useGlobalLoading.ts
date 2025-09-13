import { useSelector } from 'react-redux';

import type { RootState } from '@/app/model/store';
import { playlistsApi } from '@/features/playlists/api/playlistsApi';
import { tracksApi } from '@/features/tracks/api/tracksApi';

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Get all active requests from RTK Query API
    const queries = Object.values(state.api.queries);
    const mutations = Object.values(state.api.mutations);

    const hasActiveQueries = queries.some((query) => {
      if (query?.status !== 'pending') return;
      return (
        query.endpointName !==
        (playlistsApi.endpoints.fetchPlaylists.name &&
          tracksApi.endpoints.fetchTracks.name)
      );
    });

    const hasActiveMutations = mutations.some(
      (mutation) => mutation?.status === 'pending'
    );

    return hasActiveQueries || hasActiveMutations;
  });
};
