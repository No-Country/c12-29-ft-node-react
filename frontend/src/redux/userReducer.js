import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001/'}),
    endpoints:(builder) => ({
        addUser: builder.mutation({
            query: (payload) => ({
                url:'api/auth/signup',
                method:'POST',
                body:payload
            })
        })
    })
});

export const { useAddUserMutation } = userApi;
