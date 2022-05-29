import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetContactsQuery, useAddContactMutation } from 'redux/services';
import { getFilter, getFilteredContacts } from 'redux/selectors';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactsItem from 'pages/Contacts/ContactsItem';
import Filter from 'components/Filter';
import Loader from 'components/Loader';
import s from './Contacts.module.css';

export default function Contacts() {
  const [params, setParams] = useState({ name: '', number: '' });

  const { data, isLoading } = useGetContactsQuery();
  const [addContact, { isLoading: isAdding }] = useAddContactMutation();
  const filter = useSelector(getFilter);
  const contacts = getFilteredContacts(filter, data);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setParams({ ...params, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    contacts.some(contact => contact.name === params.name)
      ? Notify.failure(`Contact ${params.name} already exists`)
      : contacts.some(contact => contact.number === params.number)
      ? Notify.failure(`Contact with number: ${params.number} already exists`)
      : newContact();
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
      <h2>Create new contact</h2>
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
        <button type="submit" className={s.submitButton} disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add to contacts'}
          {isAdding && <Loader />}
        </button>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.length === 0 ? <h1>Contacts list is empty</h1> : <Filter />}
          <ul className={s.list}>
            {contacts?.length === 0 ? (
              <h4>No contacts were found matching</h4>
            ) : (
              contacts.map(({ id, name, number }) => (
                <ContactsItem key={id} id={id} name={name} number={number} />
              ))
            )}
          </ul>
        </>
      )}
    </>
  );
}
