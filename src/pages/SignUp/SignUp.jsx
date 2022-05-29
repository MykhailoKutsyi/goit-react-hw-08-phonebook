import { useState } from 'react';
import { useSignUpMutation } from 'redux/services';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Loader from 'components/Loader';
import s from './SignUp.module.css';

export default function SignUp() {
  const [params, setParams] = useState({ name: '', email: '', password: '' });
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await signUp(params);
    if (response?.data?.token) {
      Notify.success(`Sign up success`);
      reset();
    } else {
      Notify.warning(`It looks like you entered the wrong info`);
      setParams({ ...params, password: '' });
    }
  }

  const reset = () => {
    setParams({ name: '', email: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={params.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={params.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={params.password}
          onChange={handleChange}
          pattern=".{7,}"
          title="At least 7 characters in length"
          required
        />
      </label>
      <button type="submit" className={s.submitButton} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign Up'}
        {isLoading && <Loader />}
      </button>
    </form>
  );
}
