import { baseApi } from '@/app/api/baseApi.ts';
import type { FetchTracksResponse } from '@/features/tracks/api/tracksApi.types.ts';

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<
      FetchTracksResponse,
      void,
      string | undefined
    >({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam(lastPage) {
          return lastPage.meta.nextCursor || undefined;
        },
      },
      query: ({ pageParam }) => ({
        url: 'playlists/tracks',
        params: { cursor: pageParam, paginationType: 'cursor', pageSize: 5 },
      }),
      providesTags: ['Tracks'],
    }),
  }),
});
export const { useFetchTracksInfiniteQuery } = tracksApi;
