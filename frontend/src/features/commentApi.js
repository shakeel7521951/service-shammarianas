import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/comment",
    credentials: "include",
  }),
  tagTypes: ["Comment"],

  endpoints: (builder) => ({
    getComment: builder.query({
      query: () => "/all/get",
      providesTags: ["Comment"],
    }),

    addComment: builder.mutation({
      query: ({ id, ...commentData }) => ({
        url: `/add/${id}`,
        method: "POST",
        body: commentData,
        headers: {
          "Content-Type": "application/json",
        },
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
