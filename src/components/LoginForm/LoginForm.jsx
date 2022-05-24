import { useState } from 'react';
import {
  // useAddContactMutation,
  // useGetContactsQuery,
  // useRegisterMutation,
  useLoginMutation,
} from '../../redux/services';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './LoginForm.module.css';

export default function ContactForm() {
  const [params, setParams] = useState({ email: '', password: '' });

  const [addLogin] = useLoginMutation();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // contacts.some(contact => contact.name === params.name)
    //   ? Notify.failure(`Contact ${params.name} already exists`)
    //   : newContact();
    newContact();
  }

  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjZjNmOWY3NGNlYzAwMTU1ODE5NWMiLCJpYXQiOjE2NTM0MDQ2NjV9.JGSYXDcw0By8dxy2CnVSz7hRHg8XdJ6d5VcVOD5biNQ"
  // user: {name: "Катерина", email: "awdawd@awdawd.ua"}

  const newContact = () => {
    addLogin(params);
    console.log(params);
    Notify.info(`Login ${params.email} - ok, maybe`);
    reset();
  };

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
          onChange={handleChange}
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <label>
        Password
        <input
          // type="tel"
          name="password"
          value={params.password}
          onChange={handleChange}
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={s.submitButton}>
        Add contact
      </button>
    </form>
  );
}
