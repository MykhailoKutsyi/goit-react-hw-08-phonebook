import { createSlice } from '@reduxjs/toolkit';
// import contactsApi from './auth-operations';
import { contactsApi } from './services';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(
      contactsApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      contactsApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      contactsApi.endpoints.logout.matchFulfilled,
      (state, _) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      }
    );
    builder.addMatcher(
      contactsApi.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
      }
    );
  },
});

export default authSlice.reducer;
