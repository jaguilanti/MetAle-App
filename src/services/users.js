import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_FIREBASE } from '../firebase/database';

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }),
    tagTypes: ["userImage", "userLocation"],
    endpoints: (builder) => ({
        patchImageProfile: builder.mutation({
            query: ({ image, localId }) => ({
                url: `users/${localId}.json`,
                method: "PATCH",
                body: { image },
            }),
            invalidatesTags: ["userImage"],
        }),
        updateUserLocation: builder.mutation({ 
            query: ({ localId, userLocation }) => ({
                url: `users/${localId}/locations/${userLocation.id}.json`,
                method: "PATCH",
                body: userLocation,
            }),
            invalidatesTags: ["userLocation"],
        }),
        postUserLocation: builder.mutation({
            query: ({ localId, userLocation }) => {
                return {
                    url: `users/${localId}/locations/${userLocation.id || ''}.json`,
                    method: userLocation.id ? "PATCH" : "POST",
                    body: userLocation,
                };
            },
            invalidatesTags: ["userLocation"],
        }),
        getUser: builder.query({
            query: ({ localId }) => `users/${localId}.json`,
            transformResponse: (response) => {
                if (!response) return { image: "", locations: [] };
                if (!response.locations) response.locations = [];
                if (!response.image) response.image = "";

                const data = Object.entries(response.locations).map(item => ({ id: item[0], ...item[1] }));
                return {
                    ...response,
                    locations: data,
                };
            },
            providesTags: ["userImage", "userLocation"],
        }),
    }),
});

export const {
    usePatchImageProfileMutation,
    usePostUserLocationMutation,
    useUpdateUserLocationMutation, 
    useGetUserQuery,
} = usersApi;
