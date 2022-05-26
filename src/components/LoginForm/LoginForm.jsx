import { useState } from 'react';
import {
  // useAddContactMutation,
  // useGetContactsQuery,
  // useRegisterMutation,
  useLoginMutation,
  // Loginization,
} from '../../redux/services';
// import { getState } from '../../redux/selectors';

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './LoginForm.module.css';
// import { useSelector } from 'react-redux';

export default function ContactForm() {
  const [params, setParams] = useState({ email: '', password: '' });

  const [addLogin] = useLoginMutation();
  // const state = useSelector(getState);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    newContact();
  }

  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjZjNmOWY3NGNlYzAwMTU1ODE5NWMiLCJpYXQiOjE2NTM0MDQ2NjV9.JGSYXDcw0By8dxy2CnVSz7hRHg8XdJ6d5VcVOD5biNQ"
  // user: {name: "Катерина", email: "awdawd@awdawd.ua"}

  // const newContact = () => {
  //   addLogin(params);
  //   // Loginization(params);
  //   // console.log(params);
  //   Notify.info(`Login ${params.email} - ok, maybe`);
  //   reset();

  // };
  // let token = '';

  // async function newContact() {
  function newContact() {
    // const response = await addLogin(params);
    addLogin(params);
    // const response = await register(params);
    // console.log('response', response);
    // if (response?.data?.token) {
    // console.log('status 201 - ok');
    // Notify.info(`Login success, bitch`);
    // token = response.data.token;
    // console.log('response', token);
    // state.auth.token = token;
    // console.log(state);
    reset();
    //   } else if (response.error.status === 400) {
    //     Notify.warning(`Please check entered values, bitch`);
    //     console.log('status 400 - Bad Request');
    //   } else
    //     console.log('status not 201 not 400, but 500  - Server shuting down');
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
        Login
      </button>
    </form>
  );
}
