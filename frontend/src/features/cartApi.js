import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const cartApi = createApi({
  reducerPath: "cartApi", // Fixed: Changed to "cartApi"
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/cart`,
    credentials: "include",
  }),
  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/all/get",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (id) => ({
        url: `/add/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/remove/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
