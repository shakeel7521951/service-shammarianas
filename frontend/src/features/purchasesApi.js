import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchasesApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/purchases",
    credentials: "include",
  }),
  tagTypes: ["Purchases"],

  endpoints: (builder) => ({
    getPurchases: builder.query({
      query: () => "/get",
      providesTags: ["Purchases"],
    }),
  }),
});

export const { useGetPurchasesQuery } = purchasesApi;
