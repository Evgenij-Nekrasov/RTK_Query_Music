import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQueryWithReauth';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  keepUnusedDataFor: 86400,
  tagTypes: ['Playlist', 'Tracks', 'Auth'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
