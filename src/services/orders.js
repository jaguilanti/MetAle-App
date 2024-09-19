import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_FIREBASE } from '../firebase/database';

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }),
    tagTypes: ["order"],
    endpoints: (builder) => ({
        getOrdersByUser: builder.query({
            query: (localId) => `/orders/${localId}.json`,
            transformResponse: (response) => {
                if (!response) return [];
                const data = Object.entries(response).map(item => ({ id: item[0], ...item[1] }));
                return data;
            },
            providesTags: (result) => 
                result ? 
                [...result.map(({ id }) => ({ type: 'order', id })), { type: 'order', id: 'LIST' }] 
                : [{ type: 'order', id: 'LIST' }],
        }),
        getOrderByUser: builder.query({
            query: ({ localId, orderId }) => `/orders/${localId}/${orderId}.json`
        }),
        postOrder: builder.mutation({
            query: ({ localId, order }) => ({
                url: `/orders/${localId}.json`,
                method: "POST",
                body: order
            }),
            invalidatesTags: [{ type: "order", id: 'LIST' }]
        }),
        deleteOrder: builder.mutation({
            query: ({ localId, orderId }) => ({
                url: `/orders/${localId}/${orderId}.json`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, { orderId }) => [{ type: "order", id: orderId }]
        })
    })
});

export const { 
    usePostOrderMutation,
    useGetOrdersByUserQuery,
    useGetOrderByUserQuery,
    useDeleteOrderMutation
} = ordersApi;
