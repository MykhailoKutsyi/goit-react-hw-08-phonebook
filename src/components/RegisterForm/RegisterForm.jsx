import { useState } from 'react';
import {
  // useAddContactMutation,
  // useGetContactsQuery,
  useRegisterMutation,
  // register,
} from '../../redux/services';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './RegisterForm.module.css';

export default function ContactForm() {
  const [params, setParams] = useState({ name: '', email: '', password: '' });

  // const [addContact] = useAddContactMutation();
  const [addRegister] = useRegisterMutation();
  // const [addRegister] = useRegister();
  // const { data: contacts } = useGetContactsQuery();
  // console.log('addRegister', addRegister);
  // console.log(useRegisterMutation());
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // contacts.some(contact => contact.name === params.name)
    //   ? Notify.failure(`Contact ${params.name} already exists`)
    //   : newRegistration();
    newRegistration();
  }
  //1awdawdawd@1awdawd.ua

  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhjZjNmOWY3NGNlYzAwMTU1ODE5NWMiLCJpYXQiOjE2NTM0MDQ2NjV9.JGSYXDcw0By8dxy2CnVSz7hRHg8XdJ6d5VcVOD5biNQ"
  // user: {name: "Катерина", email: "awdawd@awdawd.ua"}

  let token = '';
  async function newRegistration() {
    const response = await addRegister(params);
    // const response = await register(params);
    console.log('response', response);
    if (response?.data?.token) {
      console.log('status 201 - ok');
      Notify.info(`Registration success, bitch`);
      token = response.data.token;
      console.log('response', token);
      reset();
    } else if (response.error.status === 400) {
      Notify.warning(`Please check entered values, bitch`);
      console.log('status 400 - Bad Request');
    } else
      console.log('status not 201 not 400, but 500  - Server shuting down');
  }
  const reset = () => {
    setParams({ name: '', email: '', password: '' });
  };

  // try {
  //   const response = getTrendingMovies();
  //   return response.then(newData => {
  //     setMovies(
  //       newData.data.results.map(({ id, poster_path, title }) => ({
  //         id,
  //         poster_path,
  //         title,
  //       }))
  //     );
  //     setStatus('resolved');
  //   });
  // } catch (error) {
  //   setError(error);
  //   setStatus('rejected');
  // }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={params.name}
          onChange={handleChange}
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          // required
        />
      </label>
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
        Registration
      </button>
    </form>
  );
}
