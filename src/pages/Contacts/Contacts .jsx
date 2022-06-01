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

  async function newContact() {
    const { data } = await addContact(params);
    if (data?.id) {
      Notify.info(`Contact ${params.name} success added to phone book`);
      reset();
    } else {
      Notify.warning(`Wrong Credentials. Check entered values.`);
    }
  }

  const reset = () => {
    setParams({ name: '', number: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="title">Create new contact</h2>
        <label>
          Name
          <input
            type="name"
            name="name"
            value={params.name}
            onChange={handleChange}
            placeholder="Adrian"
            className={s.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
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
            placeholder="+380951001010"
            className={s.input}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. For example, +38-095-000-00-00 or 380951001010"
            required
          />
        </label>
        <button type="submit" className={s.submitButton} disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add to contacts'}
          {/* {isAdding && <Loader className="Loader" />} */}
        </button>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.length === 0 ? (
            <h1>Contacts list is empty</h1>
          ) : (
            <>
              <Filter />
              <ul className={s.list}>
                {contacts?.length === 0 ? (
                  <h4>No contacts were found matching</h4>
                ) : (
                  contacts.map(({ id, name, number }) => (
                    <ContactsItem
                      key={id}
                      id={id}
                      name={name}
                      number={number}
                    />
                  ))
                )}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}
