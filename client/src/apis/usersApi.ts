import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
    getSpecificUser: builder.query<any, any>({
      query: (data: any) => ({
        url: "users",
        method: "GET",
        params: data,
      }),
    }),
    addNewUser: builder.mutation({
      query: data => ({
        url: 'add-user',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: data
      })
    }),
    deleteAllUsers: builder.mutation({
      query: data => ({
        url: 'delete-all',
        method: 'DELETE',
        // Include the entire post object as the body of the request
        body: data
      })
    }),
    deleteUser: builder.mutation({
      query: data => ({
        url: 'delete-user',
        method: 'DELETE',
        // Include the entire post object as the body of the request
        body: data
      })
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useGetSpecificUserQuery, useAddNewUserMutation, useDeleteUserMutation, useDeleteAllUsersMutation } = usersApi;
