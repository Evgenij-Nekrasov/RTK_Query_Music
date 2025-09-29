import { io } from 'socket.io-client';

import { baseApi } from '@/app/api/baseApi';
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistCreatedEvent,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from './playlistsApi.types';
import type { Images } from '@/common/types';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => ({ url: `playlists`, params }),
      keepUnusedDataFor: 0,
      onCacheEntryAdded: async (
        _,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) => {
        await cacheDataLoaded;

        const socket = io(import.meta.env.VITE_SOCKET_URL, {
          path: '/api/1.0/ws',
          transports: ['websocket'],
        });

        socket.on('tracks.playlist-created', (msg: PlaylistCreatedEvent) => {
          const newPlaylist = msg.payload.data;
          updateCachedData((draft) => {
            draft.data.pop();
            draft.data.unshift(newPlaylist);
            draft.meta.totalCount = draft.meta.totalCount + 1;
            draft.meta.pagesCount = Math.ceil(
              draft.meta.pagesCount + 1 / draft.meta.pageSize
            );
          });
        });

        await cacheEntryRemoved;
      },

      providesTags: ['Playlist'],
    }),
    createPlaylists: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>(
      {
        query: (body) => ({
          url: `playlists`,
          method: 'post',
          body,
        }),
        invalidatesTags: ['Playlist'],
      }
    ),
    deletePlaylists: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `playlists/${playlistId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Playlist'],
    }),
    updatePlaylists: build.mutation<
      void,
      { playlistId: string; body: UpdatePlaylistArgs }
    >({
      query: ({ playlistId, body }) => ({
        url: `playlists/${playlistId}`,
        method: 'put',
        body: body,
      }),
      invalidatesTags: ['Playlist'],
    }),
    uploadPlaylystCover: build.mutation<
      Images,
      { playlistId: string; file: File }
    >({
      query: ({ playlistId, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          method: 'post',
          body: formData,
          url: `playlists/${playlistId}/images/main`,
        };
      },
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylystCover: build.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => ({
        method: 'delete',
        url: `playlists/${playlistId}/images/main`,
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistsMutation,
  useDeletePlaylistsMutation,
  useUpdatePlaylistsMutation,
  useUploadPlaylystCoverMutation,
  useDeletePlaylystCoverMutation,
} = playlistsApi;
