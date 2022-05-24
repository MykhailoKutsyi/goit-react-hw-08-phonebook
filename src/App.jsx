import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar';
import Container from './components/Container';
import Loader from './components/Loader';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import LoginForm from 'components/LoginForm';
// import RegisterForm from 'components/RegisterForm';
const RegisterForm = lazy(() => import('components/RegisterForm'));
export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="register"
            element={
              <>
                <h1>Register</h1>
                <RegisterForm />
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <h1>Login</h1>
                <LoginForm />
              </>
            }
          />
          <Route
            path="contacts"
            element={
              <>
                <h1>Phonebook</h1>
                <ContactForm />
                <h1>Contacts</h1>
                <Filter />
                <ContactList />
              </>
            }
          />
        </Routes>
      </Suspense>
    </Container>
  );
}
