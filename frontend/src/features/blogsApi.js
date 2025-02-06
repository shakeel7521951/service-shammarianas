import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/blog`,
    credentials: "include",
  }),
  tagTypes: ["Blog"],

  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/all/get",
      providesTags: ["Blog"],
    }),

    addBlog: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Blog"],
    }),

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
