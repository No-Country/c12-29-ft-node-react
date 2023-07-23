import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://c12-29-ft-node-react.onrender.com' /* 'http://localhost:3001/'  */}),
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
    }),
    getLawyers: builder.query({
      query: () => 'api/lawyers'
    }),
    updateLawyerImage: builder.mutation({
      query: ({lawyerId, formData}) => ({
        url: `api/lawyers/image/${lawyerId}`,
        method: 'PUT',
        body: formData,
      })
    }),
    updateLawyerData: builder.mutation({
      query: ({lawyerId, lawyerData}) => ({
        url: `api/lawyers/${lawyerId}`,
        method: 'PUT',
        body: lawyerData,
      })
    })
  })
})
/* fetch(`http://localhost:3001/api/lawyers/${lawyerId}`,{method:'GET'})
      .then( res => res.json())
      .then( data => console.log( data))
      .catch(err => console.log( err.message)) */
export const selectUser = (state) => state.userApi

export const { 
  useAddUserMutation, 
  useGetUserMutation, 
  useGetUserByIdQuery, 
  useGetLawyersQuery, 
  useUpdateLawyerImageMutation,
  useUpdateLawyerDataMutation
} = userApi
