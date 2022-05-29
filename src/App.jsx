import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';
import { PublicRoute, PrivateRoute, CustomRoute } from 'components/CustomRoute';

import { useGetCurrentUserMutation } from 'redux/services';
// import { getIsLoggedIn, getToken } from 'redux/selectors';

const Home = lazy(() => import('pages/Home'));
const SignUp = lazy(() => import('pages/SignUp'));
const LogIn = lazy(() => import('pages/LogIn'));
const Contacts = lazy(() => import('pages/Contacts'));

export default function App() {
  // const isLoggedIn = useSelector(getIsLoggedIn);
  // const token = useSelector(getToken);
  const [fetchCurrentUser, { isSuccess, isError }] =
    useGetCurrentUserMutation();
  // {
  // refetchOnMountOrArgChange: {
  //   skip: !isLoggedIn,
  // },
  // }

  // Закоментований код вирішує проблему запуску запиту current, коли не потрібно, але зручно використати isSuccess || isError, щоб не мигав контент.

  useEffect(() => {
    // if (token) {
    console.log('fetching current user');
    fetchCurrentUser();
    // }
  }, [fetchCurrentUser]);

  return (
    (isSuccess || isError) && (
      <Container>
        <AppBar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />

            <Route
              path="signUp"
              element={
                <PublicRoute restricted>
                  <SignUp />
                </PublicRoute>
              }
            />

            <Route
              path="logIn"
              element={
                <PublicRoute restricted>
                  <LogIn />
                </PublicRoute>
              }
            />

            <Route
              path="contacts"
              element={
                <PrivateRoute restricted>
                  <Contacts />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<CustomRoute restricted />} />
          </Routes>
        </Suspense>
      </Container>
    )
  );
}
