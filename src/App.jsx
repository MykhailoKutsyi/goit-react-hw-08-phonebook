import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';
import { PublicRoute, PrivateRoute, CustomRoute } from 'components/CustomRoute';

import { useGetCurrentUserMutation } from 'redux/services';

const Home = lazy(() => import('components/Home'));
const RegisterForm = lazy(() => import('components/RegisterForm'));
const LoginForm = lazy(() => import('components/LoginForm'));
const Contacts = lazy(() => import('components/Contacts'));

export default function App() {
  const [data, { isSuccess, isError }] = useGetCurrentUserMutation();
  useEffect(() => {
    console.log('first useEffect');
    data();
  }, [data]);
  console.log(isSuccess);
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
            ></Route>
            <Route
              path="register"
              element={
                <PublicRoute restricted>
                  <RegisterForm />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="login"
              element={
                <PublicRoute restricted>
                  <LoginForm />
                </PublicRoute>
              }
            ></Route>

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
