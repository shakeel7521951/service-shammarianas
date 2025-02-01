import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/blog",
  }),
  tagTypes: ["Student"],

  endpoints: (builder) => ({
    // GET Blogs
    getBlogs: builder.query({
      query: () => "/all/get",
      providesTags: ["blog"],
    }),

    // ADD Blog (Handles formData)
    addBlog: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["blog"],
    }),

    // UPDATE Blog
    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["blog"],
    }),

    // DELETE Blog
    delBlog: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDelBlogMutation,
} = blogsApi;
