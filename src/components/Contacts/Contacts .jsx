import { useSelector } from 'react-redux';
import { useState } from 'react';

import {
  getFilter,
  getFilteredContacts,
  getIsLoggedIn,
} from '../../redux/selectors';
import { useGetContactsQuery, useAddContactMutation } from 'redux/services';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Filter from '../Filter';
import ContactsItem from 'components/ContactsItem';
import s from './Contacts.module.css';

export default function Contacts() {
  const isLoggedIn = useSelector(getIsLoggedIn);

  const { data, isLoading } = useGetContactsQuery({
    refetchOnMountOrArgChange: isLoggedIn,
  });
  console.log(data);
  console.log(isLoading);

  const filter = useSelector(getFilter);
  const contacts = getFilteredContacts(filter, data);

  //--------------------------------

  const [params, setParams] = useState({ name: '', number: '' });

  const [addContact] = useAddContactMutation();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    newContact();
  }

  const newContact = () => {
    addContact(params);
    Notify.info(`Added ${params.name} - ok, maybe`);
    reset();
  };

  const reset = () => {
    setParams({ name: '', number: '' });
  };
  return (
    <>
      <h1>Contacts</h1>
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
            <ContactsItem key={id} id={id} name={name} number={number} />
          ))}
      </ul>
    </>
  );
}
