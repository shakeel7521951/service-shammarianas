import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/comment`,
    credentials: "include",
  }),
  tagTypes: ["Comment"],

  endpoints: (builder) => ({
    getComment: builder.query({
      query: () => "/all/get",
      providesTags: ["Comment"],
    }),

    addComment: builder.mutation({
      query: (id) => ({
        url: `/add/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
} = commentApi;
