import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (input) => ({
        url: 'api/auth/signup',
        method: 'POST',
        body: input
      })
    }),
    getUser: builder.mutation({
      query: (credentials) => ({
        url: 'api/auth/signin',
        method: 'POST',
        body: credentials
      })
    }),
    getUserById: builder.query({
      query: (_id) => `api/clients/${_id}`
    })
  })
})

export const selectUser = (state) => state.userApi

export const { useAddUserMutation, useGetUserMutation, useGetUserByIdQuery } =
  userApi
