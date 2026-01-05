// src/core/api/apiSlice.ts
import type { RootState } from "@/core/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // ✅ token is string
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFeaturedPlaylists: builder.query<any, void>({
      query: () =>
        "/browse/featured-playlists?country=US&locale=en_US&limit=10",
    }),
    searchTracks: builder.query<any, string>({
      query: (q) => `/search?q=${encodeURIComponent(q)}&type=track`,
    }),
  }),
});

export const { useGetFeaturedPlaylistsQuery, useSearchTracksQuery } = apiSlice;
