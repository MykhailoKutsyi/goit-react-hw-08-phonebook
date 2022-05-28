import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';
import { PublicRoute, PrivateRoute, CustomRoute } from 'components/CustomRoute';

import { useGetCurrentUserMutation } from 'redux/services';
import { getIsLoggedIn, getToken } from 'redux/selectors';

const Home = lazy(() => import('components/Home'));
const RegisterForm = lazy(() => import('components/RegisterForm'));
const LoginForm = lazy(() => import('components/LoginForm'));
const Contacts = lazy(() => import('components/Contacts'));

export default function App() {
  const [fetchCurrentUser] = useGetCurrentUserMutation();
  const token = useSelector(getToken);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && token !== null) {
      console.log('fetching current user');
      fetchCurrentUser();
    }
  }, [fetchCurrentUser, isLoggedIn, token]);

  // console.log(isSuccess);
  return (
    // (isSuccess || isError) && (
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
            path="register"
            element={
              <PublicRoute restricted>
                <RegisterForm />
              </PublicRoute>
            }
          />

          <Route
            path="login"
            element={
              <PublicRoute restricted>
                <LoginForm />
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
  );
  // );
}
