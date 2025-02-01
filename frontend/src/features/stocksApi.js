import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stocksApi = createApi({
  reducerPath: "stocksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/stock",
  }),
  tagTypes: ["Stock"],

  endpoints: (builder) => ({
    // GET stocks
    getStocks: builder.query({
      query: () => "/all/get",
      providesTags: ["Stock"],
    }),

    // ADD stock (Handles formData)
    addStock: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Stock"],
    }),

    // UPDATE stock
    updateStock: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Stock"],
    }),

    // DELETE stock
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
