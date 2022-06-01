import { useState } from 'react';
import { useLogInMutation } from 'redux/services';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function LogIn() {
  const [params, setParams] = useState({ email: '', password: '' });

  const [logIn, { isLoading }] = useLogInMutation();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await logIn(params);
    if (response?.data?.token) {
      reset();
    } else {
      Notify.warning(`Wrong Credentials. Invalid username or password`);
      setParams({ ...params, password: '' });
    }
  }

  const reset = () => {
    setParams({ email: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={params.email}
          placeholder="email@address.com"
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
          title="At least 7 characters in length. Wasn't your password \'password123\'? 🤫"
          required
        />
      </label>
      <div className="mb-2">
        <button variant="success" type="submit" size="lg" disabled={isLoading}>
          {isLoading ? 'Log ining...' : 'Log In'}
        </button>
      </div>
    </form>
  );
}
