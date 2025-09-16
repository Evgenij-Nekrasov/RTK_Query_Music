import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { showApiError } from '@/common/utils';

export const baseApi = createApi({
  reducerPath: 'api',
  keepUnusedDataFor: 86400,
  tagTypes: ['Playlist', 'Tracks'],
  baseQuery: async (rgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        'API-KEY': import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: (headers) => {
        headers.set(
          'Authorization',
          `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        );
        return headers;
      },
    })(rgs, api, extraOptions);

    if (result.error) {
      showApiError(result.error);
    }

    return result;
  },
  endpoints: () => ({}),
});
