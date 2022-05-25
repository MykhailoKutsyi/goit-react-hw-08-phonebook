import { createSlice } from '@reduxjs/toolkit';
// import contactsApi from './auth-operations';
// import { contactsApi } from './services';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    //     [contactsApi.logOut.fulfilled](state, _action) {
    //       state.user = { name: null, email: null };
    //       state.token = null;
    //       state.isLoggedIn = false;
    //     },
    //     [contactsApi.fetchCurrentUser.fulfilled](state, action) {
    //       state.user = action.payload;
    //       state.isLoggedIn = true;
    //     },
  },
});

export default authSlice.reducer;
