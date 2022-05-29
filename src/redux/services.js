import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const axios = require('axios');

// const URL = 'https://connections-api.herokuapp.com/';

// export async function register(content) {
//   const url = `https://connections-api.herokuapp.com/users/signup`;

//   try {
//     const response = await axios.post(url, content);
//     console.log('responseawd', response);
//     return response;
//   } catch (error) {
//     console.log('error', error);
//     return error.response;
//   }
// }

// export const useRegister = () => {
//   const url = `${URL}trending/movie/day?api_key=${API_KEY}`;
//   const response = axios.post(url);
//   return response;
// };

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['contacts', 'auth'],
  endpoints: builder => ({
    getCurrentUser: builder.mutation({
      query: () => ({
        url: `/users/current`,
      }),
      providesTags: ['auth'],
    }),
    signUp: builder.mutation({
      query: contactContent => ({
        url: `users/signup`,
        method: 'POST',
        body: contactContent,
      }),
      invalidatesTags: ['auth'],
    }),
    logIn: builder.mutation({
      query: contactContent => ({
        url: `users/login`,
        method: 'POST',
        body: contactContent,
      }),
      invalidatesTags: ['auth'],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: `users/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
    }),
    getContacts: builder.query({
      query: () => `contacts`,
      keepUnusedDataFor: 3,
      providesTags: ['contacts'],
    }),
    addContact: builder.mutation({
      query: contactContent => ({
        url: `contacts`,
        method: 'POST',
        body: contactContent,
      }),
      invalidatesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetCurrentUserMutation,
  useAddContactMutation,
  useDeleteContactMutation,
  useSignUpMutation,
  useLogInMutation,
  useLogOutMutation,
} = contactsApi;
