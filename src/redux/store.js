import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsApi } from './services';
// import logger from 'redux-logger';
import filter from './reducer';
import authReducer from './createSlice';
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    auth: persistReducer(authPersistConfig, authReducer),

    filter,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: [
    ...middleware,
    // logger,
    contactsApi.middleware,
  ],
  devTools: process.env.NODE_ENV === 'development',
});
// console.log(store);

setupListeners(store.dispatch);
export const persistor = persistStore(store);
