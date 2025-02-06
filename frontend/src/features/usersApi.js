import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("Backend Url is .......",BACKEND_URL);
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/user`,
    credentials: "include",
  }),
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/sign-up",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Users"],
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/sign-in",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
      invalidatesTags: ["Users"],
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useSignInMutation,
  useGetUserQuery,
  useSignOutMutation,
  useSignUpMutation,
} = usersApi;
