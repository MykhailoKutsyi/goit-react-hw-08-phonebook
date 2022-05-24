import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const axios = require('axios');

// const URL = 'https://connections-api.herokuapp.com/';

export async function register(content) {
  const url = `https://connections-api.herokuapp.com/users/signup`;

  try {
    const response = await axios.post(url, content);
    console.log('responseawd', response);
    return response;
  } catch (error) {
    console.log('error', error);
    return error.response;
  }
}

// export const useRegister = () => {
//   const url = `${URL}trending/movie/day?api_key=${API_KEY}`;
//   const response = axios.post(url);
//   return response;
// };
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
  }),
  tagTypes: ['contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `contacts`,
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
    register: builder.mutation({
      query: contactContent => ({
        url: `users/signup`,
        method: 'POST',
        body: contactContent,
      }),
      invalidatesTags: ['contacts'],
    }),
    login: builder.mutation({
      query: contactContent => ({
        url: `users/login`,
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
  useAddContactMutation,
  useDeleteContactMutation,
  useRegisterMutation,
  useLoginMutation,
} = contactsApi;

// Servers

// https://connections-api.herokuapp.com - API base URL

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const contactsApi = createApi({
//   reducerPath: 'contactsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://62657fd994374a2c5070ec6e.mockapi.io/',
//   }),
//   tagTypes: ['contacts'],
//   endpoints: builder => ({
//     getContacts: builder.query({
//       query: () => `contacts`,
//       providesTags: ['contacts'],
//     }),
//     addContact: builder.mutation({
//       query: contactContent => ({
//         url: `contacts`,
//         method: 'POST',
//         body: contactContent,
//       }),
//       invalidatesTags: ['contacts'],
//     }),

//     deleteContact: builder.mutation({
//       query: contactId => ({
//         url: `contacts/${contactId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['contacts'],
//     }),
//   }),
// });

// export const {
//   useGetContactsQuery,
//   useAddContactMutation,
//   useDeleteContactMutation,
// } = contactsApi;
