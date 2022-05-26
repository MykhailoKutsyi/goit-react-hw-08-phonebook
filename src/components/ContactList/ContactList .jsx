import { useSelector } from 'react-redux';
import { useState } from 'react';

import {
  getFilter,
  getFilteredContacts,
  getIsLoggedIn,
} from '../../redux/selectors';
import {
  // useGetCurrentUserMutation,
  useGetContactsQuery,
  useAddContactMutation,
  useLogoutMutation,
} from '../../redux/services';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Filter from '../Filter';
import ContactListItem from 'components/ContactListItem';
import s from './ContactList.module.css';

export default function ContactList() {
  const { data } = useGetContactsQuery();
  const filter = useSelector(getFilter);
  // console.log(filter);
  // const token = useSelector(getToken);
  // console.log('token', token);
  const contacts = getFilteredContacts(filter, data);

  //--------------------------------

  const [params, setParams] = useState({ name: '', number: '' });

  const [addContact] = useAddContactMutation();
  const [logout] = useLogoutMutation();
  // const [data2] = useGetCurrentUserMutation();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    newContact();
    // checkUser();
  }
  // const checkUser = () => {
  //   console.log(data2());
  //   const data3 = data2();
  //   console.log(data3);
  // };

  const newContact = () => {
    addContact(params);
    Notify.info(`Added ${params.name} - ok, maybe`);
    reset();
  };

  const reset = () => {
    setParams({ name: '', number: '' });
  };
  const isLoggedIn = useSelector(getIsLoggedIn);
  if (!isLoggedIn) {
    return null;
  }
  return (
    <>
      {isLoggedIn && (
        <>
          <h1>Contacts</h1>
          <button onClick={() => logout()}>Logout, bitch</button>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="name"
                name="name"
                value={params.name}
                onChange={handleChange}
                // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </label>
            <label>
              Number
              <input
                type="tel"
                name="number"
                value={params.number}
                onChange={handleChange}
                // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </label>
            <button type="submit" className={s.submitButton}>
              ADD CONTACT, bitch
            </button>
          </form>
          <Filter />
          <ul className={s.list}>
            {contacts &&
              contacts.map(({ id, name, number }) => (
                <ContactListItem key={id} id={id} name={name} number={number} />
              ))}
          </ul>
        </>
      )}
    </>
  );
}
