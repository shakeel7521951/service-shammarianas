import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2000/api/blog",
    credentials: "include",
  }),
  tagTypes: ["Blog"],

  endpoints: (builder) => ({
    // GET Blogs
    getBlogs: builder.query({
      query: () => "/all/get",
      providesTags: ["Blog"],
    }),

    // ADD Blog (Handles formData)
    addBlog: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Blog"],
    }),

    // UPDATE Blog
    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Blog"],
    }),

    // DELETE Blog
    delBlog: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDelBlogMutation,
} = blogsApi;
