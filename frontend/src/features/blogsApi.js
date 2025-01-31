import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2000/api/blog" }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/all/get",
    }),
  }),
});

export const { useGetBlogsQuery } = blogsApi;
