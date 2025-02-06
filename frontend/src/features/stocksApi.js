import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const stocksApi = createApi({
  reducerPath: "stocksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/stock`,
    credentials: "include",
  }),
  tagTypes: ["Stock"],

  endpoints: (builder) => ({
    getStocks: builder.query({
      query: () => "/all/get",
      providesTags: ["Stock"],
    }),

    addStock: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Stock"],
    }),

    updateStock: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Stock"],
    }),

    delStock: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stock"],
    }),
  }),
});

export const {
  useGetStocksQuery,
  useAddStockMutation,
  useUpdateStockMutation,
  useDelStockMutation,
} = stocksApi;
